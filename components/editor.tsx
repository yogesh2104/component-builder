"use client";
import dynamic from "next/dynamic";
const SyntaxHighlighter = dynamic(() => import("@/components/syntax-highlighter"),{ ssr: false });
const CodeViewer = dynamic(() => import("@/components/code-viewer"),{ ssr: false });

export default function Editor({
  activeTab,
  onTabChange,
  code,
  loading
}: {
    activeTab: string;
    onTabChange: (v: "code" | "preview") => void;
    code:string,
    loading:boolean
}) {

  return (
    <>
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-300">
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
    </div>

    
    <div className="flex grow flex-col overflow-y-auto bg-white">
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
