"use client";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Loader2, Share } from "lucide-react";
import { useState } from "react";
import { shareApp } from "@/app/action";
import { toast } from "sonner";
import { siteInfo } from "@/lib/site";
const SyntaxHighlighter = dynamic(() => import("@/components/syntax-highlighter"),{ ssr: false });
const CodeViewer = dynamic(() => import("@/components/code-viewer"),{ ssr: false });

export default function Editor({
  activeTab,
  onTabChange,
  code,
  loading,
  message
}: {
    activeTab: string;
    onTabChange: (v: "code" | "preview") => void;
    code:string;
    loading:boolean;
    message:{role: string; content: string}[]
}) {

    const [isPublish,setIsPublish] = useState(false)


    const handlePublish=async ()=>{
        setIsPublish(true)

        const userMessage = message.filter((mess)=> mess.role =="user" )
        const prompt = userMessage[userMessage.length - 1].content


        const appId = await shareApp({
            generateCode:code,
            prompt:prompt
        })

        setIsPublish(false)
        toast.success(`This component has publish & copied to you clipboard. ${siteInfo.domain}/publish/${appId}`)
        navigator.clipboard.writeText(`${siteInfo.domain}/publish/${appId}`)
    }

  return (
    <>
    <div className="flex h-16 shrink-0 items-center justify-between border-gray-300">
        <div className="rounded-sm border border-gray-300 p-1">
            <button
                onClick={() => onTabChange("code")}
                data-active={activeTab === "code" ? true : undefined}
                className="inline-flex h-7 w-16 items-center justify-center rounded-sm text-xs font-medium data-[active]:bg-blue-500 data-[active]:text-white"
            >
                Code
            </button>
            
            <button
                onClick={() => onTabChange("preview")}
                data-active={activeTab === "preview" ? true : undefined}
                className="inline-flex h-7 w-16 items-center justify-center rounded-sm text-xs font-medium data-[active]:bg-blue-500 data-[active]:text-white"
            >
                Preview
            </button>
        </div>

        <Button variant={"secondary"} onClick={handlePublish}>
            {isPublish? <>Publishing <Loader2 className="size-4 animate-spin" /></> : <>Publish<Share className="size-4" /></> } 
        </Button>
    </div>

    
    <div className="flex grow flex-col overflow-y-auto bg-white rounded-xl">
        {activeTab === "code" ? (
        <div >
            <SyntaxHighlighter code={code} language={"typescript"} />
            
        </div> ) : (
        <>
        <div className="h-[80vh] w-full">
            {loading ? 
            <div className="h-full w-full flex justify-center items-center font-bold text-black animate-pulse">
                AI is Thinking.
            </div>
            :
            <CodeViewer code={code}/>}
        </div>
        </>
        )}
    </div>
    
    </>
  );
}
