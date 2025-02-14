import { getSystemPrompt } from "@/lib/prompt"
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { GeminiComponentBuilderAI } from "@/lib/google-gemini"


const openaiSdk = new OpenAI({
    apiKey:process.env.openAIKey,
})

export async function POST(request:NextRequest) {
    const requestJson = await request.json()
    const requestJsonValidation = z.object({
        messages:z.array(
            z.object({
                role:z.enum(["user","assistant"]),
                content:z.string()
            })
        )
    })
    .safeParse(requestJson)

    if(requestJsonValidation.error){
        return new Response(requestJsonValidation.error.message, { status: 422 })
    }

    const { messages } = requestJsonValidation.data

    const systemPromt = getSystemPrompt()

    const messageStream = await openaiSdk.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[
            {
                role:"system",
                content:systemPromt
            },
            ...messages.map((message)=>({
                ...message,
                content:message.role==="user" ? message.content + "\nPlease ONLY return code, NO backticks or language names." : message.content
            }))
        ],
        temperature:0.2,
        stream:true
    })

    const stream = new ReadableStream({
       async pull(controller){
        for await (const chunk of messageStream){
            const text = chunk.choices[0].delta.content
            if(text){
                controller.enqueue(text)
            }
        }
        controller.close()
       } 
    })
    

    return new Response(stream,{
        headers:{ "Content-Type":"text/event-stream"},
    })

    // const aiResponse = await GeminiComponentBuilderAI.sendMessage(messages);
    // const aiResult = JSON.parse(await aiResponse.response.text()).response;

    
}

export const runtime = "edge";