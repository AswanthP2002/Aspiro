import { useEffect, useRef } from "react"
import socket from "../../../socket"
import React, { useState } from "react";
import defaultProfile from '/default-img-instagram.png'
import { Notify } from "notiflix";

export default function ChatPage() {
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
            <p>this is chat section</p>
        </div>
    )
}
