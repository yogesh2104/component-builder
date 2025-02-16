import { z } from "zod";
import Together from "together-ai";
import { getSystemPrompt } from "@/lib/prompt";
import { TOGETHERAIMODEL } from "@/lib/constant";

export async function POST(request: Request) {
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

    const together = new Together({ apiKey: process.env.TOGETHER_API_KEY});
    const systemPromt = getSystemPrompt()

    const res = await together.chat.completions.create({
        model:TOGETHERAIMODEL,
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
        stream: true,
        temperature: 0.2,
        max_tokens: 9000,
    });

    const stream = new ReadableStream({
        async pull(controller){
         for await (const chunk of res){
             const text = chunk.choices[0].delta.content
             if(text){
                 controller.enqueue(text)
             }
         }
         controller.close()
        } 
     })


     return new Response(stream,{ headers:{ "Content-Type":"text/event-stream"}})
}

export const runtime = "edge";
export const maxDuration = 45;
