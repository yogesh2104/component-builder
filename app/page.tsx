"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ShoppingCart, User, Mail, LayoutDashboard, MoreHorizontal, Sparkles, ArrowRight, X, Brain, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Editor from "@/components/editor"
import { toast } from "sonner"

export default function Page() {
  const [status, setStatus] = useState<"initial" | "creating" | "created" | "updating" | "updated">("initial")
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [userPrompt, setUserPrompt] = useState("")
  const [requestModification, setRequestModification] = useState("")
  const [generatedCode, setGeneratedCode] = useState(``)
  const [message, setMessage] = useState<{ role: string; content: string }[]>([])


  const suggestedPrompt = [
    {
      icon: <ShoppingCart className="w-4 h-4" />,
      label: "Product Card",
      prompt: "Create beautiful product card with modern look and surprise me.",
    },
    {
      icon: <User className="w-4 h-4" />,
      label: "User Profile",
      prompt: "Create beautiful user profile with modern look and surprise me.",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Contact Form",
      prompt: "Create beautiful contact form with modern look and surprise me.",
    },
    {
      icon: <Brain className="w-4 h-4" />,
      label: "Quiz App",
      prompt: "Make me a quiz app about Indian history. Make sure to give the user an explanation on each question whether they got it right or wrong and keep a score going",
    },
    {
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: "Pomodoro Timer",
      prompt: "Make a beautiful pomodoro timer where I can adjust the lengths of the focus time and the break and it will beep when done.",
    },
  ]

  const loading = status === "creating" || status === "updating"

  const handleGenerate = useCallback(async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    if(status === "creating") return
    
    setStatus("creating")
    setGeneratedCode("")
    
    try {
      const response = await fetch("/api/generate",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          messages:[{ role:"user", content:userPrompt }],
        })
      })

      if(!response.ok){
        const errorText = await response.text();
        throw new Error(`Error: ${response.statusText}, ${errorText}`)
      }

      if(!response.body){
        throw new Error("No Response Found.")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let done  = false

      while(!done){
        const { value, done: readerDone } = await reader.read()

        done = readerDone

        if(value){
          const chunk = decoder.decode(value, { stream:true })
          setGeneratedCode((pre)=> pre + chunk )
        }
      }

      setMessage([ { role: "user", content: userPrompt } ])
      setStatus("created")
      setActiveTab("preview")
    } catch (error) {
      console.log("error",error)
      toast.error("An Error occurred while creating the UI.")
      setStatus("initial")
      setUserPrompt("")
    }
  },[status,userPrompt])

  const handleModify = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if(status==="updating") return

    setStatus("updating")
    setActiveTab("code")
    setGeneratedCode("")

    let codeMessage = {role:"assistant", content: generatedCode }
    let modificationMessage= { role:"user", content: requestModification }

    setRequestModification("")
    try {
      const resposne = await fetch("/api/generate",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          messages:[...message, codeMessage, modificationMessage]
        })
      })

      if(!resposne.ok){
        const errorText = await resposne.text()
        throw new Error(`Error ${resposne.statusText},${errorText}`)
      }

      if(!resposne.body){
        throw new Error("No Response Body")
      }

      const reader = resposne.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let done = false

      while(!done){
        const { value , done: readerDone } = await reader.read()
        done = readerDone


        if(value){
          const chunk = decoder.decode(value, { stream: true })
          setGeneratedCode((pre)=>pre+chunk)
        }

        setMessage((preMess)=>[...preMess.slice(-3), codeMessage, modificationMessage])
        setStatus("updated")
        setActiveTab("preview")
      }
      
    } catch (error) {
      console.log("Error while updating", error)
      toast.error("Error while updating app.")
      setStatus("initial")
      setRequestModification("")
      setUserPrompt("")
    }
  
  },[status, generatedCode,requestModification, message])


  const [isMounted , setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted) return null

  const handleToast=()=>{
    toast.success("saadasdasd")
  }
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br p-4 md:p-8">
        <AnimatePresence>
          {status === "initial" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                    What component will you build next with{" "}
                    <span className="text-red-500 inline-flex items-center bg-white p-2 text-2xl -rotate-3 rounded-md shadow-sm">
                      Frontend AI <Sparkles className="w-6 h-6 ml-1" />
                    </span>
                    ?
                  </CardTitle>
                  <CardDescription className="text-center text-lg mt-2">
                    Generate beautiful UI components with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerate}>
                    <div className="relative mt-6 mb-4">
                      <Input
                        placeholder="Make a Contact Form"
                        value={userPrompt}
                        required
                        disabled={loading}
                        className="pr-36 h-12 text-lg rounded-full border-neutral-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onChange={(e) => setUserPrompt(e.target.value)}
                      />
                      <Button
                        className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 rounded-full h-10 px-6"
                        type="submit"
                        disabled={loading}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex flex-wrap justify-center gap-3 mt-6">
                    {suggestedPrompt.map((item, index) => (
                      <motion.button
                        key={item.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-black hover:border-neutral-300 hover:bg-neutral-50 hover:text-black transition-colors hover:shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUserPrompt(item?.prompt)}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-black hover:border-neutral-300 hover:bg-neutral-50 hover:text-black transition-colors hover:shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="text-sm font-medium">More</span>
                    </motion.button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {status !== "initial" && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[70vw]"
              >

                <div className="">
                  <form onSubmit={handleModify} className="mt-8">
                    <div className="relative">
                      <Input
                        required
                        name="modification"
                        value={requestModification}
                        onChange={(e) => setRequestModification(e.target.value)}
                        className="w-full pr-24 h-12 rounded-full"
                        placeholder="Request modifications..."
                      />
                      <Button
                        type="submit"
                        variant={"destructive"}
                        className="absolute right-1 top-1.5 rounded-full"
                        disabled={status === "updating"}
                      >
                        {status === "updating" ? (
                          <div className="flex items-center">
                            <span className="mr-2">Updating</span>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        ) : (
                          <>
                            <span className="mr-2">Modify</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
                <Editor 
                  code={generatedCode}  
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  loading={loading}
                  message={message}
                />
              </motion.div>
              
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
