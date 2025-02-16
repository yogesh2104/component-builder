"use server"

import { db } from "@/db"
import { TOGETHERAIMODEL } from "@/lib/constant"

export async function shareApp({
    generateCode,
    prompt
}:{
    generateCode:string,
    prompt:string
}) {
    
    let createApp = await db.componentBuild.create({
        data:{
            code:generateCode,
            prompt:prompt,
            model:TOGETHERAIMODEL
        }
    })

    return createApp.id
    
}