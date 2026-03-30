import { useEffect, useRef } from "react"
import React, { useState } from "react";
import { Notify } from "notiflix";
import { BiCheck, BiCheckDouble, BiChevronDown, BiSearch, BiSend, BiTrash } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { BsCameraVideo, BsEmojiSmile, BsThreeDotsVertical, BsTrash2, BsWechat } from "react-icons/bs";
import { HiPaperClip } from "react-icons/hi2";
import { Chat, Conversation, User, UserType } from "../../../types/entityTypes";
import { useLocation } from "react-router-dom";
import { getSocket } from "../../../socket";
import { getConversations, getChats, deleteChat, deleteChatForMe } from "../../../services/chatServices";
import { initializeConversation } from "../../../services/userServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
// import { SocketContext } from "../../../context/SocketContext";

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
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null >(null)
    const [messages, seetMessages] = useState<Chat[]>([])
    const [chatText, setChatText] = useState('')
    const [chatingPerson, setChatingPerson] = useState<UserType | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    const location = useLocation()

    const searchConvo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      // toast.info(`search : ${value}`)
      setSearch(value)
      
    }

    const debouncedSearch = (fn: Function, delay: number) => {
      let timer: NodeJS.Timeout
      return function(...args: any){
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn(...args)
        }, delay);
      }
    }

    const dSearch = debouncedSearch(searchConvo, 500)
    //accessing specific user deteails when the chat is opened through a user profile
    const {_id, name, email} = location.state || {}

    const inputRef = useRef<HTMLInputElement | null>(null)

    const send = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if(!chatText.trim() || !selectedConversation || !chatingPerson) return

        const socket = getSocket()
        if(!socket) return toast.error('Socket not connected');

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
        if(socket){
          socket.on('USER_STATUS_CHANGED', ({userId, status}) => {
            setOnlineUsers(prev => 
            status === 'online' ? [...new Set([...prev, userId])] : prev.filter(id => id !== userId)
        );
        })
        }
        
    }, [])


    useEffect(() => {

        const socket = getSocket()
        if(!socket || !selectedConversation?._id) return

        console.log('joining room: ', selectedConversation._id)
        socket.emit('JOIN_ROOM', {targetId: selectedConversation._id})

        socket.off('RECEIVE_PRIVATE_MESSAGE')
        
        socket.on('RECEIVE_PRIVATE_MESSAGE', (newMessage: any) => {
            console.log('new message received via socket', newMessage)
            toast.info('Received a private message')
            toast.success(`new message text -- ${newMessage.text}`)
            if(newMessage.conversationId === selectedConversation._id){
                seetMessages((prv: Chat[]) => {
                    const exists = prv.find(m => m._id === newMessage._id || (m.text === newMessage.text && m.createdAt === newMessage.createdAt))
                    if(exists) return prv;
                    return [...prv, newMessage]
                })
                //updating conversation preview
                
                setConversations((conversations: Conversation[]) => {
                  return conversations.map((conversation: Conversation) => {
                    if(newMessage.conversationId === conversation._id){
                      return {
                        ...conversation,
                        lastMessage: {
                          ...conversation.lastMessage,
                          text: newMessage.text
                        }
                      }
                    }else{
                      return conversation
                    }
                  })
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

    //  useeffect for fetching conversations
    useEffect(() => {
        async function fetchConversationOnStart(){
          setLoading(true)
            try {
                const result: FetchConversationsResponsePayload = await getConversations(search, page, limit)
                if(result.success){
                  console.log('-- checking result from the backend as conversations', result)
                    toast.success(result.message)
                    setConversations(result.result)
                }
            } catch (error: unknown) {
                Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
            } finally {
              setLoading(false)
            }
        }

        if(logedUser._id){
            fetchConversationOnStart()
        }
    }, [logedUser._id, search, page])


    //fetching chats based on selected conversaations
    useEffect(() => {
        const loadChatHistory = async () => {
            if(selectedConversation?._id){
                try {
                    const result: LoadChatsResponsePayload = await getChats(selectedConversation._id)
                    if(result.success){
                      console.log('-- printing fetched chats--', result)
                        seetMessages(result.result)
                        toast.success(result.message)
                    }
                    
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Something broke')
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


    //specifying who am i chating with
    //identifying chating person from the participantss
    //seting identified person as chatting person
    useEffect(() => {
        if(selectedConversation){
            const recipient = selectedConversation.participants?.find((p: UserType) => p._id !== logedUser._id)
            if(recipient){
                setChatingPerson(recipient)
            }
        }
    }, [selectedConversation, logedUser._id])

    useEffect(() => {
        if(selectedConversation?._id) {
            markAsRead()
        }
    }, [selectedConversation?._id, messages.length])

    function getConversationDate(date: string){
        const convDate = new Date(date)
        const now = new Date()

        const startOfToday = new Date(now.setHours(0, 0, 0, 0))
        const startOfConvDay = new Date(convDate.setHours(0, 0, 0, 0))

        const difInMs = startOfToday - startOfConvDay
        const difInDays = difInMs / (1000 * 60 * 60 * 24)

        if(difInDays === 0) return moment(date).format("hh:mm a")
        if(difInDays === 1) return 'yesterday'
        if(difInDays > 1){
          const getDay = convDate.getDay() + 1
          switch(getDay){
            case 1:
              return 'Monday'
            case 2:
              return 'Tuesday'
            case 3:
              return 'Wednesday'
            case 4:
              return 'Thursday'
            case 5:
              return 'Friday'
            case 6:
              return 'Saturday'
            case 7:
              return 'Sunday'
            default:
              return moment(convDate).format("DD:MM:YYYY")
          }
        }
    }

    const unsendMessage = async (chatId: string) => {
      if(!chatId) return
    const isConfirmed = await Swal.fire({
      icon: 'question',
      title: 'Unsend Message',
      text: 'Do you want to unsend / delete this message for both persons?',
      showConfirmButton: true,
      confirmButtonText: 'Unsend',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const container = Swal.getContainer()
        if(container){
          container.style.zIndex = '99999'
        }
      }
    })

    if(!isConfirmed) return

    try {
      await deleteChat(chatId)
      seetMessages((chats: Chat[]) => {
        return chats.filter((chat: Chat) => chatId !== chat._id)
      })
      toast.success('Chat unsended')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Can not unsend chat')
    }
    // toast.warn('Message unsend')
  }

  const deleteForMe = async (chatId: string) => {
    if(!chatId) return
    const isConfirmed = await Swal.fire({
      icon: 'question',
      title: 'Delete Message',
      text: 'Do you want to delete this message only for you?',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const container = Swal.getContainer()
        if(container){
          container.style.zIndex = '99999'
        }
      }
    })

    if(!isConfirmed) return
    try {
      const result = await deleteChatForMe(chatId)
      if(result?.success){
        toast.success('Chat deleted for me')
        seetMessages((chat: Chat[]) => {
          return chat.filter((chat: Chat) => chat._id !== chatId)
        })
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Can not delete chat now')
    }
    // toast.warn('Message deleted for you')
  }

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
  <div className="w-full grid grid-cols-12 h-[calc(100vh-120px)] min-h-[600px]">
    
    {/* LEFT SIDEBAR: Chat List */}
    <div className="col-span-4 border-r border-gray-100 flex flex-col bg-gray-50/30">
      <div className="p-4 bg-white border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Messages</h2>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 transition-focus-within ring-2 ring-transparent focus-within:ring-blue-100 focus-within:bg-white border border-transparent focus-within:border-blue-200">
          <BiSearch className="text-gray-400" size={18} />
          <input onKeyUp={(e) => dSearch(e)} className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400" type="text" placeholder="Search conversations..." />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {loading && (
          <div className=""><p className="text-xs text-slate-700 text-center">Loading chats...</p></div>
        )}
        {conversations.length > 0 ? (
          conversations.map((conv: Conversation) => {
            const partner = conv?.participants.find((p: UserType) => p._id !== logedUser._id)
            const isSelected = selectedConversation?._id === conv._id;
            const isOnline = onlineUsers.includes(partner?._id as string);

            return (
              <div 
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}
                className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "hover:bg-white hover:shadow-sm text-gray-700"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 ${isSelected ? 'border-blue-400' : 'border-white'}`}>
                    {partner?.profilePicture?.cloudinarySecureUrl ? (
                      <img className="w-full h-full object-cover" src={partner.profilePicture.cloudinarySecureUrl} alt="" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {partner?.name}
                      </div>
                    )}
                  </div>
                  {isOnline && <div className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className={`text-sm font-semibold truncate ${isSelected ? "text-white" : "text-gray-900"}`}>{partner?.name || 'User'}</p>
                    <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-gray-400"}`}>{getConversationDate(conv.updatedAt as string)}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${isSelected ? "text-blue-50" : "text-gray-500"}`}>
                    {conv?.lastMessage?.text || 'Start a conversation'}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <BsWechat size={40} />
            <p className="text-xs mt-2">No conversations</p>
          </div>
        )}
      </div>
    </div>

    {/* RIGHT SIDE: Chat Window */}
    <div className="col-span-8 flex flex-col bg-white">
      {selectedConversation ? (
        <>
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 overflow-hidden ring-2 ring-blue-100">
                {chatingPerson?.profilePicture?.cloudinarySecureUrl ? (
                  <img className="w-full h-full object-cover" src={chatingPerson.profilePicture.cloudinarySecureUrl} alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">{chatingPerson && chatingPerson.name ? chatingPerson?.name[0] : <FaUser />}</div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 leading-none">{chatingPerson?.name}</p>
                <p className="text-[11px] text-green-500 font-medium mt-1">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <button className="hover:text-blue-600 transition-colors"><IoCallOutline size={20} /></button>
              <button className="hover:text-blue-600 transition-colors"><BsCameraVideo size={20} /></button>
              <button className="hover:text-gray-600 transition-colors"><BsThreeDotsVertical size={20} /></button>
            </div>
          </div>
          
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8fafc] custom-scrollbar">
            {messages.map((message: any, index: number) => {
              const isMe = message.senderId === logedUser._id;
              return (
                <MessageBubble key={message._id || index} message={message} onUnsend={() => unsendMessage(message._id)} onDeleteForMe={() => deleteForMe(message._id)} />
                // <div key={message._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                //   <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                //     isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                //   } relative group`}>
                //     <p className="leading-relaxed">{message.text}</p>
                //     <div className={`text-[10px] mt-1.5 flex items-center gap-1 ${isMe ? "text-blue-100 justify-end" : "text-gray-400"}`}>
                //       {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                //       {isMe && (message.isRead ? <BiCheckDouble size={14} /> : <BiCheck size={14} />)}
                //     </div>
                //     <button className="hidden group-hover:block absolute top-1 right-1">
                //       <BiChevronDown size={18} />
                //     </button>
                //     <div className={`absolute bg-white text-black border border-slate-200 rounded-md shadow-lg w-40 ${isMe ? 'right-0' : 'left-0'}`}>
                //       <button className="w-full flex text-xs text-center gap-2 hover:bg-gray-200 px-4 py-2"><BiTrash /> Delete for me</button>
                //       <button className="w-full flex text-xs text-center gap-2 hover:bg-gray-200 px-4 py-2"><BsTrash2 />Unsend</button>
                //     </div>
                //   </div>
                // </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 pl-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition-all">
              <button className="text-gray-400 hover:text-blue-600"><HiPaperClip size={20} /></button>
              <input 
                onChange={(e) => setChatText(e.target.value)} 
                value={chatText} 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400" 
                placeholder="Type your message..." 
              />
              <button className="text-gray-400 hover:text-yellow-500"><BsEmojiSmile size={20} /></button>
              <button 
                onClick={(e) => send(e)} 
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center active:scale-95"
              >
                <BiSend size={20} />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Enhanced Welcome Screen */
        <div className="flex-1 flex flex-col justify-center items-center bg-gray-50/50 p-10 text-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 animate-bounce duration-[3000ms]">
            <BsWechat size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Aspiro Messenger</h2>
          <p className="text-gray-500 max-w-sm text-sm">
            Select a conversation to start meaningful connections or find your next career opportunity.
          </p>
        </div>
      )}
    </div>
  </div>
</div>
    )
}


function MessageBubble({message, onUnsend, onDeleteForMe}: {message: any, onUnsend: () => void, onDeleteForMe: () => void}){
  const [isChatMenuOpened, setIsChatMenuOpened] = useState(false)

  const toggleChatMenuOpen = () => setIsChatMenuOpened(prv => !prv)

  const logedUser = useSelector((state: any) => {
    return state.userAuth.user
  })
  const isMe = message.senderId === logedUser._id

  const isTimeOver = (sendAt: string) => {
    const messageSendAt = new Date(sendAt).getTime()
    const now = new Date().getTime()

    const difInMs = now - messageSendAt
    const minute = Math.floor(difInMs / (1000 * 60))
    return minute > 10

  }


  return(
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                    isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  } relative group`}>
                    <p className="leading-relaxed">{message.text}</p>
                    <div className={`text-[10px] mt-1.5 flex items-center gap-1 ${isMe ? "text-blue-100 justify-end" : "text-gray-400"}`}>
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && (message.isRead ? <BiCheckDouble size={14} /> : <BiCheck size={14} />)}
                    </div>
                    <button onClick={toggleChatMenuOpen} className="hidden group-hover:block absolute top-1 right-1">
                      <BiChevronDown size={18} />
                    </button>
                    {isChatMenuOpened && (
                      <div className={`absolute !z-9999 bg-white text-black border border-slate-200 rounded-md shadow-lg w-40 ${isMe ? 'right-0' : 'left-0'}`}>
                        <button onClick={() => {onDeleteForMe(); setIsChatMenuOpened(false)}} className="w-full flex text-xs text-center gap-2 hover:bg-gray-200 px-4 py-2"><BiTrash /> Delete for me</button>
                        {(isMe && !isTimeOver(message.createdAt)) && (
                          <button onClick={() => {onUnsend(); setIsChatMenuOpened(false)}} className="w-full flex text-xs text-center gap-2 hover:bg-gray-200 px-4 py-2"><BsTrash2 />Unsend</button>
                        )}
                    </div>
                    )}
                  </div>
                </div>
  )
}
