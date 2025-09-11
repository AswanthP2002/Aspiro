import { useEffect, useRef } from "react"
import socket from "../../../socket"
import React, { useState } from "react";
import defaultProfile from '/default-img-instagram.png'
import { Notify } from "notiflix";

export default function ChatApp() {
    const [message, setMessage] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const send = (event : any) => {
        event.preventDefault()
        Notify.success('send', {timeout:1000})
        if(inputRef?.current){
            inputRef.current.value = ""
        }
        
    }
    return (
        <div>
            <section className="w-[400px]">
                <div className="flex bg-blue-400 text-white rounded !p-2 gap-2 items-center">
                    <img src={defaultProfile} className="w-10" alt="" />
                    <div>
                        <p className="text-sm font-semibold">Name</p>
                    </div>
                </div>
                <div className="chat-body h-[400px]">

                </div>
                <div className="flex gap-3">
                    <input ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} type="text" placeholder="write something" className="border !px-2 !border-gray-500 rounded flex-1" />
                    <button onClick={(event) => send(event)} className="text-sm !px-4 bg-blue-500 text-white rounded !py-1">Send <i className="fa-solid fa-paper-plane"> </i></button>
                </div>
            </section>
        </div>
    )
}
