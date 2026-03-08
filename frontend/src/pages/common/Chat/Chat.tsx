import { useContext, useEffect, useRef } from "react"
// import socket from "../../../socket"
import React, { useState } from "react";
import defaultProfile from '/default-img-instagram.png'
import { Notify } from "notiflix";
import { BiCheck, BiCheckDouble, BiSearch, BiSend } from "react-icons/bi";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { MdChatBubble, MdVideoCall } from "react-icons/md";
import { BsCameraVideo, BsEmojiSmile, BsThreeDotsVertical, BsWechat } from "react-icons/bs";
import { HiPaperClip } from "react-icons/hi2";
import { Chat, Conversation, Message } from "../../../types/entityTypes";
import { useLocation } from "react-router-dom";
import { getSocket } from "../../../socket";
import { getChats, getConversations, initializeConversation } from "../../../services/userServices";
import { useSelector } from "react-redux";
// import { SocketContext } from "../../../context/SocketContext";

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

interface FetchConversationsResponsePayload {
    success: boolean
    message: string
    result: Conversation[]
}

interface InitializeConversationResponsePayload {
    success: boolean
    message: string
    result: Conversation
}

interface LoadChatsResponsePayload {
    success: boolean,
    message: string,
    result: Chat[]
}

export default function ChatPage() {
    const messageEndRef = useRef<HTMLDivElement | null>(null)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null >(null)
    const [messages, seetMessages] = useState<Chat[]>([])
    const [chatText, setChatText] = useState('')
    const [chatingPerson, setChatingPerson] = useState<any>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    // const {socket} = useContext(SocketContext)

    // const sendChat = async () => {
    //     socket?.emit('message-send', chatText)
    //     setChatText('')
    // }

    const location = useLocation()
    //accessing specific user deteails when the chat is opened through a user profile
    const {_id, name, email} = location.state || {}

    const inputRef = useRef<HTMLInputElement | null>(null)

    const send = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if(!chatText.trim() || !selectedConversation || !chatingPerson) return

        const socket = getSocket()
        if(!socket) return Notify.failure('Socket not connected');

        const messageData: Chat = {
            conversationId: selectedConversation._id,
            senderId: logedUser._id,
            receiverId: chatingPerson._id,
            text: chatText,
            createdAt: new Date().toString(),

        }

        socket.emit('SEND_PRIVATE_MESSAGE', messageData)
        // seetMessages((prv: Chat[]) => [...prv, messageData])
        Notify.success('send', {timeout:1000})
        if(inputRef?.current){
            inputRef.current.value = ""
        }
        setChatText('')
        
    }


    const logedUser = useSelector((state: any) => {
        return state.userAuth.user
    })

    const markAsRead = () => {
        const socket = getSocket()
        if(socket && selectedConversation?._id) {
            socket.emit('MARK_MESSAGE_AS_READ', {conversationId: selectedConversation._id, userId: logedUser._id})
        }
    }

    useEffect(() => {
        const socket = getSocket()
        socket.on('USER_STATUS_CHANGED', ({userId, status}) => {
            setOnlineUsers(prev => 
            status === 'online' ? [...new Set([...prev, userId])] : prev.filter(id => id !== userId)
        );
        })
    }, [])


    useEffect(() => {

        const socket = getSocket()
        if(!socket || !selectedConversation?._id) return

        console.log('joining room: ', selectedConversation._id)
        socket.emit('JOIN_ROOM', {targetId: selectedConversation._id})

        socket.off('RECEIVE_PRIVATE_MESSAGE')
        
        socket.on('RECEIVE_PRIVATE_MESSAGE', (newMessage: any) => {
            console.log('new message received via socket', newMessage)
            if(newMessage.conversationId === selectedConversation._id){
                seetMessages((prv: Chat[]) => {
                    const exists = prv.find(m => m._id === newMessage._id || (m.text === newMessage.text && m.createdAt === newMessage.createdAt))
                    if(exists) return prv;
                    return [...prv, newMessage]
                })
            }
        })

        socket.on('MESSAGES_READ_UPDATE', ({readerId}) => {
            if(readerId === logedUser._id){
                seetMessages((prv: Chat[]) => {
                    return prv.map((m) => ({...m, isRead: true}))
                })
            }
        })


        return () => {
            socket.off('RECEIVE_PRIVATE_MESSAGE')
        }
    }, [selectedConversation?._id])

    useEffect(() => {
        async function fetchConversationOnStart(){
            try {
                const result: FetchConversationsResponsePayload = await getConversations()
                if(result.success){
                    Notify.success(result.message)
                    setConversations(result.result)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            }
        }

        if(logedUser._id){
            fetchConversationOnStart()
        }
    }, [logedUser._id])

    useEffect(() => {
        const loadChatHistory = async () => {
            if(selectedConversation?._id){
                try {
                    const result: LoadChatsResponsePayload = await getChats(selectedConversation._id)
                    if(result.success){
                        seetMessages(result.result)
                        Notify.success(result.message)
                    }
                    
                } catch (error) {
                    Notify.failure(error instanceof Error ? error.message : 'Something broke')
                }
            }
        }

        loadChatHistory()
    }, [selectedConversation?._id])

    useEffect(() => {
        //condition for checking how the component opened : directly or from a users profile
        if(_id && name && email){
            //check first if the id is present anywhere in the conversation
            // const userFoundInConversation = conversations.find((conv: Conversation) => {
            //     if(conv.userInfo?._id === _id){
            //         return conv
            //     }
            // })
            const startChat = async () => {
                try {
                    const result: InitializeConversationResponsePayload = await initializeConversation(_id)
                    setSelectedConversation(result.result)
                    console.log('conversation ready', result.result)
                    Notify.success('Conversation started')
                } catch (error: unknown) {
                    Notify.failure(error instanceof Error ? error.message : 'something went wrong')
                }
            }
            startChat()
        }
    }, [_id])

    useEffect(() => {
        if(selectedConversation){
            const recipient = selectedConversation.participants?.find((p: any) => p.userId._id !== logedUser._id)
            if(recipient){
                setChatingPerson(recipient.userId)
            }
        }
    }, [selectedConversation, logedUser._id])

    useEffect(() => {
        if(selectedConversation?._id) {
            markAsRead()
        }
    }, [selectedConversation?._id, messages.length])
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
                            conversations.map((chat: any, index: number) => {
                                const otherParticipant = chat.participants.find((p: any) => p.userId._id !== logedUser._id)
                                const partner = otherParticipant.userId
                                return <div 
                                    key={chat._id}
                                    onClick={() => setSelectedConversation(chat)}
                                    className={`flex gap-2 hover:bg-blue-100 p-2 rounded-md cursor-pointer transition-colors ${
            selectedConversation?._id === chat._id ? "bg-blue-50 border-l-4 border-blue-500" : ""
          }`}>
                                    <div className="relative flex-shrink-0">
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                            {
                                                partner?.profilePicture?.cloudinarySecureUrl 
                                                    ? (
                                                        <img className="w-full h-full rounded-md object-cover" src={partner?.profilePicture?.cloudinarySecureUrl} alt="" />
                                                    ) : (
                                                        <p>{chat?.receiver?.name[0]}</p>
                                                    )   
                                            }
                                            
                                        </div>
                                        {   
                                            
                                           onlineUsers.includes(partner._id) && (<div className="absolute p-1 left-7 bottom-0 rounded-full bg-green-400"></div>)
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 truncate">{partner?.name || 'Unknown user'}</p>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{chat?.lastMessage?.text || 'No messages yet'}</p>
                                    </div>
                                </div>
})
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
                                {
                                    chatingPerson?.profilePicture?.cloudinarySecureUrl && (
                                        <img style={{objectFit: 'cover'}} className="w-full h-full rounded-full" src={chatingPerson?.profilePicture?.cloudinarySecureUrl} alt="" />
                                    )
                                }
                                {
                                    !chatingPerson?.profilePicture?.cloudinarySecureUrl && (
                                        <p>{chatingPerson?.name[0]}</p>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-sm font-light text-gray-700">{chatingPerson?.name}</p>
                                <p className="text-xs font-light text-gray-500 mt-1"></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <button className="text-gray-600"><IoCallOutline /></button>
                            <button className="text-gray-600"><BsCameraVideo /></button>
                            <button className="text-gray-600"><BsThreeDotsVertical /></button>
                        </div>
                    </div>
                    
                        <div className="flex-1">
                            <div className="messages p-3 flex flex-col gap-3 overflow-y-auto h-[500px]">
  {messages.length > 0 ? (
    messages.map((message: any, index: number) => {
      // Check if the sender is YOU
      const isMe = message.senderId === logedUser._id;

      return (
        <div key={message._id || index} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[70%] relative py-2 px-3 rounded-lg shadow-sm ${
              isMe
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-none"
                : "bg-gray-200 text-gray-800 rounded-tl-none"
            }`}
          >
            <p className="text-sm font-light leading-tight">{message.text}</p>
            
            <div className={`text-[10px] mt-1 flex ${isMe ? "justify-end text-blue-100" : "justify-start text-gray-500"}`}>
               {/* Format the date - you can use a library like date-fns later */}
               {new Date(message.createdAt || message.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {isMe && (
  <span className="ml-2 text-[10px]">
    {message.isRead ? (
      <BiCheckDouble size={11} />// Or a double-check icon
    ) : (
      <BiCheck size={11} /> // Or a single-check icon
    )}
  </span>
)}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <p className="text-center text-xs text-gray-500">No messages yet. Say hi!</p>
    </div>
  )}
  {/* A dummy div to help with auto-scrolling later */}
  <div ref={messageEndRef} />
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
                            <button onClick={(e) => send(e)} className="bg-gradient-to-br flex items-center gap-2 from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full w-10 h-10">
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
