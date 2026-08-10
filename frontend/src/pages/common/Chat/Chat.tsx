import { useEffect, useRef } from "react"
import React, { useState } from "react";
import { BiBlock, BiCheck, BiCheckDouble, BiChevronDown, BiDownload, BiSearch, BiSend, BiTrash } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { BsCameraVideo, BsEmojiSmile, BsThreeDotsVertical, BsWechat } from "react-icons/bs";
import { HiPaperClip } from "react-icons/hi2";
import { Chat, Conversation, UserType } from "../../../types/entityTypes";
import { useLocation } from "react-router-dom";
import { getSocket } from "../../../socket";
import { getConversations, getChats, deleteChat, deleteChatForMe, sendChatWithAttachments } from "../../../services/chatServices";
import { initializeConversation } from "../../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { openedUnreadChat } from "../../../redux/chatSlice";
import BouncingLoader from "../../../components/common/Bouncing.loader";
import EmojiPicker from 'emoji-picker-react'
import { FiX } from "react-icons/fi";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
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
    const attachmentRef = useRef<HTMLInputElement | null>(null)
    // const messageBoxRef = useRef<HTMLInputElement | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [loading, setLoading] = useState(false)
    console.log(setSearch, setPage, setLimit, setLoading)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null >(null)
    const [messages, seetMessages] = useState<Chat[]>([])
    const [chatText, setChatText] = useState('')
    const [chatingPerson, setChatingPerson] = useState<UserType | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [typingUsers, setTypingUsers] = useState<string[]>([])
    const location = useLocation()
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
    const {_id, name, email, profilePicture} = location.state || {} 
    const [files, setFiles] = useState<File | null>(null)

    const openFileSelection = () => {
      if(attachmentRef){
        attachmentRef.current?.click()
      }
    }

    const removeFile = () => {
      setFiles(null)
    }
    const handleFileChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if(!event.target.files) return

      setFiles(event.target.files[0])
    }

    const handleEmojiPick = (emojiData: any) => {
      setChatText((prv) => `${prv} ${emojiData.emoji}`)
    }

    const logedUser = useSelector((state: {userAuth: {user:{_id: string, email: string, name: string, profilePicture: string}}}) => {
      return state.userAuth.user
    })

    const searchConvo = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value
      setSearch(text)
    }

    const debouncedSearch = <T extends(...args: never[]) => void>(fn: T, delay: number) => {
      let timer: ReturnType<typeof setTimeout>
      return function(...args: Parameters<T>){
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn(...args)
        }, delay)
      }
    }

    const moveConversationToTop = (
      conversations: Conversation[],
      conversationId: string,
      updatedConversation: Conversation
    ) => {
      const filtered = conversations.filter((conversation) => conversation._id !== conversationId)
      return [updatedConversation, ...filtered]
    }

    const dSearch = debouncedSearch(searchConvo, 500)

    const dispatch = useDispatch()

    const tempSocket = getSocket()
    
    const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if(files){
        const formData = new FormData()

        formData.append('conversationId', selectedConversation?._id as string)
        formData.append('receiverId', chatingPerson?._id as string)
        formData.append('senderId', logedUser._id as string)
        
        if(chatText.trim()){
          formData.append('text', chatText)
        }

        formData.append('attachment', files)

        try {
          await sendChatWithAttachments(formData)
          
        } catch (error: unknown) {
          const err = error as AxiosError<{message: string}>
          const msg = err.response?.data.message || err.message || 'Something went wrong'
          toast.error(msg)
        } finally {
          setFiles(null)
        }
      }
      if(!chatText || chatText.trim() === "") return
      const socket = getSocket()
      if(!socket) return
      socket.emit('SEND_PRIVATE_MESSAGE', {
        message: {
        conversationId: selectedConversation?._id,
        senderId: logedUser._id,
        receiverId: chatingPerson?._id,
        text: chatText
      },
      sender: {
        _id: logedUser._id,
        name: logedUser.name,
        email: logedUser.email,
        profilePicture:{cloudinarySecureUrl: logedUser.profilePicture}
      } as UserType
      })
      setChatText('')
      setShowEmojiPicker(false)
    }

    const selectAChatingPerson = async (conv: Conversation) => {
      if(!conv) return
      setSelectedConversation(conv)
      const chattingperson = conv.participants?.find((user) => user._id !== logedUser._id)
      if(chattingperson){
        setChatingPerson(chattingperson)
        try {
          const chatsResult: LoadChatsResponsePayload = await getChats(conv?._id as string)
          seetMessages(chatsResult.result)
        } catch (error: unknown) {
          console.log('Error occured while loading chats', error)
          const err = error as AxiosError<{message: string}>
          const finalMessage = err.response?.data.message || err.message || 'Something went wrong'
          toast.error(finalMessage)
        }
      }
    }

    const userTyping = () => {
      // toast.info('Im typing now')
      if(tempSocket){
        tempSocket.emit('USER_TYPING', {userId: logedUser._id})
      }
    }

    const userStopedTyping = () => {
      // toast.info('I stoped typing')
      if(tempSocket){
        tempSocket.emit('USER_SOTOP_TYPING', {userId: logedUser._id})
      }
    }


    useEffect(() => {
      async function fetchConversations(){
        try {
          const conversationsResult: FetchConversationsResponsePayload = await getConversations(search, page, limit)

          if(!conversationsResult.success){
            return
          }

          const fetchedConversations = conversationsResult.result

          setConversations(fetchedConversations)

          if(!_id) return

          const chattingPerson = {_id, name, email, profilePicture: {cloudinarySecureUrl: profilePicture}}
          const isExisitngConversation = fetchedConversations.find((conv: Conversation) => conv.userInfo?._id === _id)

          if(isExisitngConversation){
            setSelectedConversation(isExisitngConversation)
            setChatingPerson(chattingPerson)
            return
          }

          const newConv: InitializeConversationResponsePayload = await initializeConversation(_id)
          
          if(!newConv.success){
            return
          }

          console.log('Checking initialized conversation result', newConv.result)

          setConversations((prv) => {
            return [newConv.result, ...prv]
          })

          setSelectedConversation(newConv.result)
          setChatingPerson(chattingPerson)
        } catch (error: unknown) {
          console.log('-- Error occured while fetching conversations --', error)
          const err = error as AxiosError<{message: string}>
          const finalErrMessage = err.response?.data.message || err.message || 'Error occured while fetching conversations'
          toast.error(finalErrMessage)
        }
      }

      fetchConversations()
    }, [search, page, limit, _id, name, email, profilePicture])

    useEffect(() => {
      // const socket = getSocket()
      if(!tempSocket || !selectedConversation?._id){
        return
      }

      const handleReceivePrivateMessage = (message: Chat) => {
        setConversations((conversations) => {
  const existingConversation = conversations.find(
    (conversation) => conversation._id === message.conversationId
  );

  if (!existingConversation) {
    return conversations;
  }

  const updatedConversation: Conversation = {
    ...existingConversation,
    lastMessage: {
      text: message.text,
      senderId: message.senderId,
      sendAt: message.createdAt
    },
    updatedAt: message.createdAt
  };

  return moveConversationToTop(
    conversations,
    message.conversationId as string,
    updatedConversation
  );
});
        // setConversations((conversations) => {
        //   return conversations.map((conversation) => {
        //     if(conversation._id === message.conversationId) {
        //       return {
        //         ...conversation,
        //         lastMessage: {
        //           text: message.text,
        //           senderId: message.senderId,
        //           sendAt: message.createdAt
        //         }
        //       }
        //     }

        //     return conversation
        //   })
        // })

        setSelectedConversation((conversation) => {
          if(!conversation) return null

          return {
            ...conversation,
            lastMessage: {
              text: message.text,
              senderId: message.senderId,
              sendAt: message.createdAt
            }
          }
        })

        seetMessages((prv) => [...prv, message])
      }

      const handleMessageReadUpdate = (
        data: {conversationId: string, readerId: string}
      ) => {
        seetMessages((messages) => {
          return messages.map((msg) => {
            if(msg.conversationId === data.conversationId && 
              msg.receiverId === data.readerId
            ) {
              return {
                ...msg,
                isRead: true
              }
            }

            return msg
          })
        })
      }

      tempSocket.emit('JOIN_ROOM', {
        targetId: selectedConversation._id
      })

      tempSocket.on(
        'RECEIVE_PRIVATE_MESSAGE',
        handleReceivePrivateMessage
      )

      tempSocket.on(
        'MESSAGE_READ_UPDATE',
        handleMessageReadUpdate
      )

      return () => {
        tempSocket.off(
          'RECEIVE_PRIVATE_MESSAGE',
          handleReceivePrivateMessage
        )

        tempSocket.off(
          'MESSAGE_READ_UPDATE',
          handleMessageReadUpdate
        )
      }

    }, [selectedConversation?._id, tempSocket]) //previously _id only

    
    useEffect(() => {
      if(!tempSocket || !selectedConversation){
        return
      }

      tempSocket.emit('MARK_MESSAGE_AS_READ', {conversationId: selectedConversation._id, userId: logedUser._id})
      //if that selected conversation hav any unread messages i should set the unread count 0 and global newUnread count minus one
      if(selectedConversation.unreadMessage && selectedConversation.unreadMessage > 0){
        setConversations((conversations: Conversation[]) => {
          return conversations.map((conv) => {
            if(conv._id === selectedConversation._id){
              return {
                ...conv,
                unreadMessage: 0
              }
            }else{
              return conv
            }
          })
        })
        
        dispatch(openedUnreadChat({conversationId:selectedConversation._id as string}))
      }

      return () => tempSocket.off('MARK_MESSAGE_AS_READ')

    }, [selectedConversation?._id, dispatch, logedUser._id, selectedConversation, tempSocket])

    //a temporary useeffect for live updating unread message count for each chat
    useEffect(() => {
      if (!tempSocket) {
        return;
      }

      tempSocket.on('NEW_MESSAGE_RECEIVED', (data: { message: Chat; sender: UserType }) => {
        console.log('-- checking upcoming data message --', data.message);
        setConversations((conversations: Conversation[]) => {
          const isConversationAlreadyExist = conversations.find(
            (conv) => conv._id === data.message.conversationId
          );
          if (isConversationAlreadyExist) {
            const updateConversation = {
              ...isConversationAlreadyExist,
              lastMessage: {
                text: data.message.text,
                senderId: data.message.senderId,
                sendAt: data.message.createdAt
              },
              updatedAt: new Date().toISOString()
            }

            return moveConversationToTop(
              conversations,
              data.message.conversationId as string,
              updateConversation
            )
            // return conversations.map((conv) => {
            //   if (conv._id === data.message.conversationId) {
            //     return {
            //       ...conv,
            //       unreadMessage: conv.unreadMessage ? conv.unreadMessage + 1 : 0,
            //       lastMessage: {
            //         text: data.message.text,
            //         senderId: data.message.senderId,
            //         sendAt: data.message.createdAt,
            //       },
            //       updatedAt: new Date().toISOString(),
            //     };
            //   } else {
            //     return conv;
            //   }
            // });
          } else {
            return [
              {
                _id: data.message.conversationId,
                unreadMessage: 1,
                lastMessage: {
                  text: data.message.text,
                  senderId: data.message.senderId,
                  sendAt: data.message.createdAt,
                },
                // createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                participants: [
                  { _id: logedUser._id, email: logedUser.email, name: logedUser.name },
                  {
                    _id: data.sender._id,
                    name: data.sender.name,
                    email: data.sender.email,
                    profilePicture: data.sender.profilePicture,
                  },
                ],
              },
              ...conversations,
            ];
          }
        });
        
      });

      return () => tempSocket.off('NEW_MESSAGE_RECEIVED');
    }, [tempSocket, logedUser._id, logedUser.email, logedUser.name]);

    useEffect(() => {
      if(messageEndRef.current){
        messageEndRef.current.scrollTo({
          top: messageEndRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, [conversations])

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
      await deleteChat(chatId, selectedConversation?._id as string, chatingPerson?._id as string)
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

  const timeLineForMessages = (date: string | Date) => {
    const now = new Date()
    const messageDate = new Date(date)

    const dayDiff = now.getDate() - messageDate.getDate()

    if(dayDiff === 0){
      return `${moment(messageDate).format('hh:mm a')}`
    }else if(dayDiff === 1) {
      return `Yesterday`
    }else if(dayDiff === 2){
      const dayOfTheWeek = messageDate.getDay()
      switch(dayOfTheWeek){
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
      }
    }else{
      return `${moment(messageDate).format('dd/mm/yyyy')}`
    }
  }

  const deleteChatHistory = async (conversationId: string) => {
    if(!conversationId) return

    const confirmation = await Swal.fire({
      icon: 'question',
      title: 'Delete Conversation?',
      text: 'All chats will be deleted for you',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    if(!confirmation.isConfirmed){
      return
    }

    
  }

  useEffect(() => {
    console.log('This component mounted -status checking useeffect')
      if(!tempSocket) return

      tempSocket.on('USER_STATUS_CHANGED', (data: {userId:string, status: string}) => {
        console.log(`User ${data.userId} status changed - ${data.status}`, data)
        if(data.status === 'online' && !onlineUsers.includes(data.userId)){
          setOnlineUsers((prv) => {
            return [...prv, data.userId]
          })
        }else if(data.status === 'offline'){
          setOnlineUsers((prv) => prv.filter((uid) => uid !== data.userId))
        }
      })

      tempSocket.on('OTHER_PERSON_TYPING', (data: {userId: string}) => {
        console.log(`${data.userId} started typing...`)
        if(!onlineUsers.includes(data.userId)){
          setTypingUsers((prv) => {
            return [...prv, data.userId]
          })
        }
      })

      tempSocket.on('OTHER_PERSON_STOP_TYPING', (data: {userId: string}) => {
        console.log(`${data.userId} stop typing!`)
        setTypingUsers((prv) => prv.filter((uid) => uid !== data.userId))
      })

      tempSocket.on('CHAT_DELETE_FOR_ALL', (data: {chatId: string, userId: string, conversationId: string}) => {
        // toast.info('Other user deleted a chat')
        seetMessages((prv) => {
          return prv.filter((chat) => chat._id !== data.chatId)
        })
      })

      return () => {
        tempSocket.off('USER_STATUS_CHANGED')
        tempSocket.off('OTHER_PERSON_TYPING')
        tempSocket.off('OTHER_PERSON_STOP_TYPING')
        tempSocket.off('CHAT_DELETED_FOR_ALL')
      }

  }, [tempSocket, onlineUsers])

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
  <div className="w-full grid grid-cols-12 h-[calc(100vh-120px)] min-h-[600px]">
    
    {/* LEFT SIDEBAR: Chat List */}
    <div className="col-span-4 border-r border-gray-100 flex flex-col bg-gray-50/30">
      <div className="p-4 bg-white border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Messages</h2>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 transition-focus-within ring-2 ring-transparent focus-within:ring-blue-100 focus-within:bg-white border border-transparent focus-within:border-blue-200">
          <BiSearch className="text-gray-400" size={18} />
          <input onChange={(e) => dSearch(e)} className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400" type="text" placeholder="Search conversations..." />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {loading && (
          <div className=""><p className="text-xs text-slate-700 text-center">Loading chats...</p></div>
        )}
        {conversations.length > 0 ? (
          conversations.map((conv: Conversation) => {
            const partner = conv?.participants?.find((p: UserType) => p._id !== logedUser._id)
            const isSelected = selectedConversation?._id === conv._id;
            const isOnline = onlineUsers.includes(partner?._id as string);
            const isTyping = typingUsers.includes(partner?._id as string);

            return (
              <div 
                key={conv._id}
                onClick={() => selectAChatingPerson(conv)}
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
                        {partner && partner.name && partner?.name[0]}
                      </div>
                    )}
                  </div>
                  {isOnline && <div className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white"></div>}
                </div>
                
                <div className="flex-1 min-w-0 relative">
                  <div className="flex justify-between items-baseline">
                    <p className={`text-sm font-semibold truncate ${isSelected ? "text-white" : "text-gray-900"}`}>{partner?.name || 'User'}</p>
                    <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-gray-400"}`}>{timeLineForMessages(conv.updatedAt as string)}</span>
                  </div>
                  {isTyping
                    ? <p className="text-blue-600 text-xs font-medium transition-all duration-300">typing...</p>
                    : <p className={`text-xs truncate w-[70%] mt-0.5 ${isSelected ? "text-blue-50" : "text-gray-500"}`}>
                    {conv?.lastMessage?.text || 'Start a conversation'}
                  </p>
                  }
                  {/* <p>Checking unread count {conv.unreadMessage} typeof {typeof conv.unreadMessage}</p> */}
                  <div className="flex gap-2 absolute right-0 bottom-0">
                    {(conv?.unreadMessage > 0) && (
                    <div className={`text-[.7rem] flex items-center justify-center font-semibold ${selectedConversation?._id === conv._id ? "bg-white text-blue-500" : "bg-blue-600 text-white"} rounded-full w-5 h-5`}>
                      {conv.unreadMessage}
                    </div>
                  )}
                  <button onClick={() => deleteChatHistory(conv._id as string)} className="hidden group-hover:inline-block transition-all duration-300"><BiTrash size={18} /></button>
                  </div>
                  {/* <div className="bg-white absolute p-1 border border-slate-100 rounded-lg shadow-xl right-0 w-[70%]">
                    <button className="flex gap-2 items-center hover:bg-slate-200 w-full px-3 py-2 rounded-lg transition-color duration-300">
                      <BiTrash />
                      <p className="text-xs font-medium text-gray-700">Delete Conversation</p>
                    </button>
                  </div> */}
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
                <p className="text-[11px] text-green-500 font-medium mt-1">{onlineUsers.includes(chatingPerson?._id as string) ? "Online" : null}</p>
              </div>
            </div>
          </div>
          
          {/* Message Area */}
          <div ref={messageEndRef} className="flex-1 overflow-y-auto max-h-[450px] p-6 space-y-4 bg-[#f8fafc] custom-scrollbar">
            {messages.map((message: Chat, index: number) => {
              // const isMe = message.senderId === logedUser._id;
              return (
                <>
                <MessageBubble key={message._id || index} message={message} onUnsend={() => unsendMessage(message._id as string)} onDeleteForMe={() => deleteForMe(message._id as string)} />
                </>
              );
            })}
            {typingUsers.includes(chatingPerson?._id as string)
              ? <>
                <div>
              <BouncingLoader />
            </div>
              </>
              : null
            }
            <div />
          </div>

          {/* Input Area */}
          <div className="p-4 relative bg-white border-t border-gray-100 relative">
            {files && (
              <div className="border absolute bg-white rounded-md bottom-19 border-slate-200 w-fit p-2">
                  <div>
                    <button onClick={removeFile} className="cursor-pointer"><FiX size={10} /></button>
                  </div>
                  <p className="text-xs">{`${files?.name.slice(0, 8)}...`}</p>
                </div>
            )}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 pl-4 border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition-all">
              <input onChange={handleFileChange} ref={attachmentRef} type="file" multiple className="hidden" name="" id="" />
              <button onClick={() => openFileSelection()} className="text-gray-400 hover:text-blue-600"><HiPaperClip size={20} /></button>
              <input 
                onFocus={userTyping}
                onBlur={userStopedTyping}
                onChange={(e) => setChatText(e.target.value)} 
                value={chatText} 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400" 
                placeholder="Type your message..." 
              />
              <button onClick={() => setShowEmojiPicker((prv) => !prv)} className="text-gray-400 hover:text-yellow-500"><BsEmojiSmile size={20} /></button>
              {showEmojiPicker && (
                <div className="absolute bottom-20">
                  <EmojiPicker onEmojiClick={handleEmojiPick} />
                </div>
              )}
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


function MessageBubble({message, onUnsend, onDeleteForMe}: {message: Chat, onUnsend: () => void, onDeleteForMe: () => void}){
  const [isChatMenuOpened, setIsChatMenuOpened] = useState(false)

  const toggleChatMenuOpen = () => setIsChatMenuOpened(prv => !prv)

  const logedUser = useSelector((state: {userAuth:{user:{_id: string, name: string, email: string, profilePicture: string}}}) => {
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


  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} transition-all duration-300`}>
      {message.attachments && message?.attachments[0]?.fileType?.includes('image') && 
        <div className="relative max-w-[70%] rounded-md border-2 border-slate-200">
          <button
            onClick={toggleChatMenuOpen}
            className="absolute top-1 right-1"
          ></button>
          <img className="w-full h-full object-fit-cover rounded-md" src={message.attachments[0].url} alt="" />
          <a href={message.attachments[0]?.url} download={message.attachments[0].fileName} className="absolute bottom-2 right-2">
            <BiDownload />
          </a>
        </div>
      }

      {message.attachments && message.attachments[0]?.fileType?.includes('pdf') && 
        <div className="border border-slate-200 p-2 rounded-md bg-white flex gap-2 items-center">
          <div>
            <p className="text-xs text-medium text-slate-600">{message?.attachments[0]?.fileName}</p>
          </div>
          <div>
            <a href={message.attachments[0]?.url} download={message?.attachments[0]?.fileName} className="border border-slate-300 w-7 h-7 flex items-center justify-center rounded-full">
              <BiDownload color="gray"/>
            </a>
          </div>
        </div>
      }

      {message.attachments && message.attachments.length === 0 && (
        <div
          className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
            isMe
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
          } relative group`}
        >
          <p className="leading-relaxed">{message.text}</p>
          <div
            className={`text-[10px] mt-1.5 flex items-center gap-1 ${isMe ? 'text-blue-100 justify-end' : 'text-gray-400'}`}
          >
            {new Date(message.createdAt as string).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            {isMe && (message.isRead ? <BiCheckDouble size={14} /> : <BiCheck size={14} />)}
          </div>
          <button
            onClick={toggleChatMenuOpen}
            className="hidden group-hover:block absolute top-1 right-1"
          >
            <BiChevronDown size={18} />
          </button>
          {isChatMenuOpened && (
            <div
              className={`absolute !z-9999 bg-white text-black border border-slate-100 p-[1px] rounded-lg shadow-xl w-40 ${isMe ? 'right-10' : 'left-10'}`}
            >
              <button
                onClick={() => {
                  onDeleteForMe();
                  setIsChatMenuOpened(false);
                }}
                className="w-full rounded-lg flex !text-sm font-medium text-gray-700 text-center gap-2 hover:bg-gray-200 transition-color px-4 py-2"
              >
                <BiTrash size={17} /> Delete for me
              </button>
              {isMe && !isTimeOver(message.createdAt as string) && (
                <button
                  onClick={() => {
                    onUnsend();
                    setIsChatMenuOpened(false);
                  }}
                  className="w-full flex text-sm font-medium text-gray-700 text-center gap-2 hover:bg-gray-200 px-4 py-2 rounded-md transition-color duration-300 "
                >
                  <BiBlock size={17} />
                  Unsend
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

