import { useContext, useEffect, useRef } from "react"
import socket from "../../../socket"
import React, { useState } from "react";
import defaultProfile from '/default-img-instagram.png'
import { Notify } from "notiflix";
import { BiSearch, BiSend } from "react-icons/bi";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { MdChatBubble, MdVideoCall } from "react-icons/md";
import { BsCameraVideo, BsEmojiSmile, BsThreeDotsVertical, BsWechat } from "react-icons/bs";
import { HiPaperClip } from "react-icons/hi2";
import { Conversation, Message } from "../../../types/entityTypes";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../../context/SocketContext";

const chats = [
    {
        _id:1,
        receiver:{
            _id: 1,
            name:'Sharmi Rajendran',
            isActive:true,
            lastSeen:'5h ago'
        },
        messages:[
            {
                text:'Thanks',
                user:'receiver',
                time:'10:18 AM'
            },
            {
                text:'Probably within the next 3 days, i will notify you once it is ready',
                user:'sender',
                time:'10:01 AM'
            },
            {
                text:'ok, When can i expect that?',
                user:'receiver',
                time:'10:00 AM'
            },
            {
                text:'Hey, there its almost positive',
                user:'sender',
                time:'9:45 AM'
            }
        ]
    },
    {
        _id:2,
        receiver:{
            _id: 1,
            name:'Domnic Scobozlai',
            isActive:true,
            lastSeen:'5h ago'
        },
        messages:[
            {
                text:'That will be Horrible!',
                user:'receiver',
                time:'10:18 AM'
            },
            {
                text:'Probably within the next 3 days, i will notify you once it is ready',
                user:'sender',
                time:'10:01 AM'
            },
            {
                text:'ok, When can i expect that?',
                user:'receiver',
                time:'10:00 AM'
            },
            {
                text:'Hey, there its almost positive',
                user:'sender',
                time:'9:45 AM'
            }
        ]
    },
    {
        _id:1,
        receiver:{
            _id: 1,
            name:'Chloey Kelly',
            isActive:false,
            lastSeen:'5h ago'
        },
        messages:[
            {
                text:'I had a meeting that day',
                user:'receiver',
                time:'10:18 AM'
            },
            {
                text:'Probably within the next 3 days, i will notify you once it is ready',
                user:'sender',
                time:'10:01 AM'
            },
            {
                text:'ok, When can i expect that?',
                user:'receiver',
                time:'10:00 AM'
            },
            {
                text:'Hey, there its almost positive',
                user:'sender',
                time:'9:45 AM'
            }
        ]
    }
]

export default function ChatPage() {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<{_id: string, name: string, email: string, isActive?: boolean, lastSeen?: string} | null >(null)
    const [messages, seetMessages] = useState<Message[]>([])
    const [chatText, setChatText] = useState('')

    const {socket} = useContext(SocketContext)

    const sendChat = async () => {
        socket?.emit('message-send', chatText)
        setChatText('')
    }

    const location = useLocation()
    //accessing specific user deteails when the chat is opened through a user profile
    const {_id, name, email} = location.state || {}

    const inputRef = useRef<HTMLInputElement | null>(null)

    const send = (event : any) => {
        event.preventDefault()
        Notify.success('send', {timeout:1000})
        if(inputRef?.current){
            inputRef.current.value = ""
        }
        
    }

    useEffect(() => {
        //condition for checking how the component opened : directly or from a users profile
        if(_id && name && email){
            //check first if the id is present anywhere in the conversation
            const userFoundInConversation = conversations.find((conv: Conversation) => {
                if(conv.userInfo?._id === _id){
                    return conv
                }
            })

            if(userFoundInConversation){
                //conversation already exist, add this into the selected conversation
                setSelectedConversation({
                    _id: userFoundInConversation.userInfo?._id as string,
                    name: userFoundInConversation.userInfo?.name as string,
                    email: userFoundInConversation.userInfo?.email as string
                })
            }else{
                //conversation does not exist, then set the id, name, email which we got from the location to the selected conversation
                setSelectedConversation({
                    _id: _id as string,
                    name: name as string,
                    email: email as string
                })
            }
        }
    }, [])
    return (
        <div className="bg-white border border-gray-200 rounded-md">
            <div className="w-full grid grid-cols-12 min-h-screen">
                <div className="col-span-4 border-r border-gray-300">
                    <div className="p-3 border-b border-gray-300">
                        <p className="text-sm font-light">Messages</p>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 mt-2">
                            <BiSearch color="gray" size={13} />
                            <input className="!text-xs w-full text-gray-600" type="text" placeholder="Search names" />
                        </div>
                    </div>
                    <div className="chat-list p-2 grid grid-cols-1 gap-3 overflow-y-auto">
                        {   conversations.length > 0 &&
                            chats.map((chat: any, index: number) => (
                                <div key={index} className="flex gap-2 hover:bg-blue-200 overflow-x-auto p-1 rounded-md cursor-pointer">
                                    <div className="relative">
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                            <p>{chat.receiver.name[0]}</p>
                                        </div>
                                        {
                                            chat.receiver.isActive && (<div className="absolute p-1 left-7 bottom-0 rounded-full bg-green-400"></div>)
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm font-light">{chat.receiver.name}</p>
                                        <p className="text-xs text-gray-600 font-light mt-1">{chat.messages[0].text}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            conversations.length === 0 && (
                                <div className="flex items-center justify-center w-full h-full">
                                    <p className="text-xs text-center text-gray-500">No chat History</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="col-span-8 flex flex-col">
                    {
                    selectedConversation &&
                    <>
                    <div className="border-b border-gray-300 p-3 flex items-center justify-between">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                                <p>{selectedConversation.name[0]}</p>
                            </div>
                            <div>
                                <p className="text-sm font-light text-gray-700">{selectedConversation.name}</p>
                                <p className="text-xs font-light text-gray-500 mt-1">{selectedConversation.isActive ? <span className="text-green-400">Active now</span>: selectedConversation.lastSeen}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <button className="text-gray-600"><IoCallOutline /></button>
                            <button className="text-gray-600"><BsCameraVideo /></button>
                            <button className="text-gray-600"><BsThreeDotsVertical /></button>
                        </div>
                    </div>
                    
                        <div className="flex-1">
                            <div className="messages p-3 grid grid-cols-1 gap-3 overflow-y-auto">
                        {
                            messages.length > 0 &&
                            chats[0].messages.map((message: {text: string, user: string, time: string}, index: number) => (
                                message.user === 'sender'
                                    ? <>
                                        <div className="flex justify-end">
                                            <div className="bg-blue-100 max-w-[300px] relative py-2 ps-2 pe-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                                <button className="absolute right-2"><BsThreeDotsVertical size={15} /></button>
                                                <p className="text-sm font-light leading-tight">{message.text}</p>
                                                <p className="text-xs mt-2 text-gray-300">{message.time}</p>
                                            </div>
                                        </div>
                                      </>
                                    : <>
                                        <div className="flex justify-start">
                                            <div className="bg-blue-100 max-w-[300px] p-2 rounded-md">
                                                <p className="text-sm font-light leading-tight">{message.text}</p>
                                                <p className="text-xs mt-2 text-gray-400">{message.time}</p>
                                            </div>
                                        </div>
                                      </>
                            ))
                        }
                        {
                            messages.length === 0 && (
                                <div className="h-full w-full flex justify-center items-center">
                                    <p className="text-center text-xs text-gray-500">Start conversation</p>
                                </div>
                            )
                        }
                    </div>
                        </div>
                    <div className="actions p-3 border-t border-gray-300 flex gap-5 justify-between">
                        <div className="flex items-center flex-1 gap-3">
                            <button><HiPaperClip /></button>
                            <div className="bg-gray-100 w-full rounded-full p-2 flex items-center">
                                <input onChange={(e) => setChatText(e.target.value)} value={chatText} type="text" className="!text-xs px-2 text-gray-600" placeholder="Type a message.." />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button><BsEmojiSmile /></button>
                            <button disabled={!socket ? true : false} onClick={sendChat} className="bg-gradient-to-br flex items-center gap-2 from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full w-10 h-10">
                                <BiSend size={20} />
                            </button>
                        </div>
                    </div>
                    </>
                    }
                    {
                        !selectedConversation && (
                            <div className="flex-1 flex flex-col justify-center items-center ">
                                <BsWechat size={50} color="gray"/>
                                <p className="text-xl mb-2 text-gray-500">Chat with others</p>
                                <p className="text-center text-xs text-gray-500">
                                    Start meaningful conversations, get instant guidance, and stay connected
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
