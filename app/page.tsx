// "use client"

// import { useEffect, useRef, useState } from "react"
// import {motion} from "motion/react"
// import { ShoppingCart, User, Mail, Cloud, LayoutDashboard, MoreHorizontal, Sparkles } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import CodeViewer from "@/components/code-viewer"
// import { cn } from "@/lib/utils"

// export default function Page() {

//   const [status, setStatus] = useState<"initial" | "creating" | "created" | "updating" | "updated">("updated");
//   const [userPrompt,setuserPrompt] = useState("")
//   const [requestModification, setRequestModification] = useState("") // after generated ui by ai user want some modification then store prompt into this state
//   const [generatedCode,setGeneratedCode] = useState(`
//     import React from 'react'
//     export default function HelloWorld() {
//       return (
//         <div className="flex items-center justify-center min-h-screen bg-white text-center">
//           <h1 className="text-4xl font-bold text-gray-800">Hello World</h1>
//         </div>
//       )
//     }
//     `)
//   const [useShadcnui, setUserShadcnui] = useState(false)
//   const [basicAppSetup, setBasicAppSetup] = useState({
//     shadcnui:true
//   }) //basically I have use Shadcnui component so need to track setup

//   const [message,setMessage] = useState<{ role:string , content:string }[]>([])


//   const menuItems = [
//     { icon: <ShoppingCart className="w-4 h-4" />, label: "Product Card",prompt:"Create beautiful product card with mordern look and surprise me." },
//     { icon: <User className="w-4 h-4" />, label: "User Profile",prompt:"Create beautiful user profile with mordern look and surprise me."  },
//     { icon: <Mail className="w-4 h-4" />, label: "Contact Form",prompt:"Create beautiful contact form with mordern look and surprise me." },
//     { icon: <Cloud className="w-4 h-4" />, label: "Weather Widget", prompt:"Create beautiful Weather Widget with mordern look and surprise me." },
//     { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard",prompt:"Create beautiful Dashboard page with mordern look and surprise me." }
//   ]

//   return (
//     <div className={cn(status !== "initial" ? "flex justify-center items-center ":"flex justify-center items-center")}>
      
//       {status=="initial" ? 
//       <div className={"min-h-screen flex flex-col items-end justify-center px-4 py-12"}>
        
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-3xl mx-auto mb-8"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
//             What component will you build next with{" "}
//             <span
//               className="text-red-500 inline-flex items-center bg-white p-2 text-2xl -rotate-3 rounded-md -ml-2" >
//               Frontend AI <Sparkles className="w-8 h-8 ml-1" />
//             </span>
//             ?
//           </h1>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="w-full max-w-xl mx-auto mb-12"
//         >
//           <div className="relative">
//             <Input
//               placeholder="Make a Contact Form"
//               value={userPrompt}
//               className="pr-36 h-12 text-lg rounded-full border-neutral-300 focus-visible:outline-0 focus:ring-0"
//               onChange={(e)=>setuserPrompt(e.target.value)}
//             />
//             <Button className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 rounded-full h-10 px-6">
//               <Sparkles className="w-4 h-4 mr-2" />
//               Generate
//             </Button>
//           </div>
//           <div className="flex items-center mt-10 gap-2 justify-start">
//             <Checkbox id="shadcnui" checked={useShadcnui} onCheckedChange={(checked)=>setUserShadcnui(!!checked)} />
//             <label
//               htmlFor="shadcnui"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               Use Shadncn For basic component?
//             </label>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className=" max-w-2xl flex flex-wrap justify-center gap-4"
//         >
//           {menuItems.map((item, index) => (
//             <motion.button
//               key={item.label}
//               className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 hover:text-black transition-colors hover:shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: 0.1 * index }}
//               onClick={()=>setuserPrompt(item?.prompt)}
//             >
//               {item.icon}
//               <span className="text-sm font-medium">{item.label}</span>
//             </motion.button>
//           ))}
//           <motion.button
//               className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 hover:text-black transition-colors hover:shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }} 
//             >
//               <MoreHorizontal className="w-4 h-4" />
//               <span className="text-sm font-medium">More</span>
//             </motion.button>
//         </motion.div>

//       </div>:

//       <div className="mt-5 flex gap-4 text-center max-w-3xl mx-auto mb-8">
//         <form className="w-full">
//           <fieldset className="group">
//             <div className="relative">
//               <div className="relative flex rounded-md bg-white shadow-sm group-disabled:bg-gray-50">
//                 <div className="relative flex flex-grow items-stretch">
//                   <input
//                     required
//                     name="modification"
//                     // value={modification}
//                     // onChange={(e) => setModification(e.target.value)}
//                     className="w-full rounded-md bg-transparent px-6 py-2 text-md disabled:cursor-not-allowed text-black outline-none"
//                     placeholder="Make changes to your app here"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   // disabled={loading}
//                   className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-3xl px-3 py-2 text-sm font-semibold text-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand disabled:text-gray-900"
//                 >
//                   {/* {loading ? (
//                     <LoadingDots color="black" style="large" />
//                   ) : (
//                     <ArrowLongRightIcon className="-ml-0.5 size-6" />
//                   )} */}
//                   submit
//                 </button>
//               </div>
//             </div>
//           </fieldset>
//         </form>
        
//       </div>
//       }

//       <div className="h-dvh">
//         <div className="flex h-full">
//           <div className={`w-[50vw] hidden h-full overflow-hidden py-5 transition-[width] lg:block`}  >
//             <div className="ml-4 flex h-full flex-col rounded-l-xl shadow-lg shadow-gray-400/40">
//               <div className="flex h-full flex-col rounded-l-xl shadow shadow-gray-800/50">
//                   <CodeViewer code={generatedCode} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ShoppingCart, User, Mail, Cloud, LayoutDashboard, MoreHorizontal, Sparkles, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Editor from "@/components/editor"

export default function Page() {
  const [status, setStatus] = useState<"initial" | "creating" | "created" | "updating" | "updated">("initial")
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [userPrompt, setUserPrompt] = useState("")
  const [requestModification, setRequestModification] = useState("")
  const [generatedCode, setGeneratedCode] = useState(`
    import React from 'react'
    export default function HelloWorld() {
      return (
        <div className="flex items-center justify-center min-h-screen bg-white text-center">
          <h1 className="text-4xl font-bold text-gray-800">Hello World</h1>
        </div>
      )
    }
  `)
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
      icon: <Cloud className="w-4 h-4" />,
      label: "Weather Widget",
      prompt: "Create beautiful Weather Widget with modern look and surprise me.",
    },
    {
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: "Dashboard",
      prompt: "Create beautiful Dashboard page with modern look and surprise me.",
    },
  ]

  const handleGenerate = () => {
    setStatus("creating")
    // Simulating API call
    setTimeout(() => {
      setStatus("created")
    }, 2000)
  }

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("updating")
    // Simulating API call
    setTimeout(() => {
      setStatus("updated")
      setRequestModification("")
    }, 2000)
  }

  return (
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
                <div className="relative mt-6 mb-4">
                  <Input
                    placeholder="Make a Contact Form"
                    value={userPrompt}
                    className="pr-36 h-12 text-lg rounded-full border-neutral-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                  <Button
                    className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 rounded-full h-10 px-6"
                    onClick={handleGenerate}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
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
                loading={status}
              />
            </motion.div>
            
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
