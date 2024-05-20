"use client"
// import { v4 as uuid} from "uuid";
import { CiLocationOn } from "react-icons/ci"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { BiUser } from "react-icons/bi"; 
import { MdEdit } from "react-icons/md"; 
import Chat from "@/components/Chat/ChatCard";
import Message from "@/components/Chat/MessageCard";
import ChatLayout from "@/components/Layouts/ChatLayout";
import React, { useState } from "react";
import { BsSearch, BsSend } from "react-icons/bs"; 
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

import SelectCountry from "@/components/SelectGroup/SelectCountry";

const cards = [
    {
      avatar: "/images/user/user-01.png",
      name: "Devid Heilo",
      text: "How are you?",
      time: 12,
      type: 0,
    },
    {
      avatar: "/images/user/user-02.png",
      name: "Henry Fisher",
      text: "Waiting for you!",
      time: 12,
      type: 2,
    },
    {
      avatar: "/images/user/user-04.png",
      name: "Jhon Doe",
      text: "What's up?",
      time: 32,
      type: 1,
    },
    {
      avatar: "/images/user/user-05.png",
      name: "Jane Doe",
      text: "Great",
      time: 32,
      type: 3,
    },
    {
      avatar: "/images/user/user-01.png",
      name: "Jhon Doe",
      text: "How are you?",
      time: 32,
      type: 0,
    },
    {
      avatar: "/images/user/user-03.png",
      name: "Jhon Doe",
      text: "How are you?",
      time: 32,
      type: 2,
    },
    {
      avatar: "/images/user/user-01.png",
      name: "Devid Heilo",
      text: "How are you?",
      time: 12,
      type: 4,
    },
    {
      avatar: "/images/user/user-02.png",
      name: "Henry Fisher",
      text: "Waiting for you!",
      time: 12,
      type: 2,
      dot: 1,
    },
    {
      avatar: "/images/user/user-04.png",
      name: "Jhon Doe",
      text: "What's up?",
      time: 32,
      type: 1,
      dot: 3,
    },
    {
      avatar: "/images/user/user-05.png",
      name: "Jane Doe",
      text: "Great",
      time: 32,
      type: 0,
      dot: 6,
    },
  ];

const messages = [
  {
    agent: 1,
    content: "Hello",
    id: "f11w2123f12f1sdfs",
    time: "12:24 pm",
  },
  {
    agent: 0,
    content: "Hello",
    id: "f11w2123f12f1sdfs",
    time: "12:24 pm",
  },
  {
    agent: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna,aliquet.",
    id: "f11w2123f12f1sdfs",
    time: "12:24 pm",
  },
  {
    agent: 0,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet.",
    id: "f11w2123f12f1sdfs",
    time: "12:24 pm",
  },
];

const ChatPage: React.FC = () => {
  const [content, setContent] = useState("")
  const [selectTab, setSelectTab] = useState(1)
  const [filterType, setFilterType] = useState(0)
  const [messageList, setMessageList] = useState(messages)

  const filterData = filterType == 0 ? cards : cards.filter((e) => e.type === filterType)

  const proceedMessage = async () => {
    const msg = {
      agent: 1,
      content: content,
      id: "f11w2123f12f1sdfs",
      time: "12:24 pm",
    }
    setMessageList(prev => [...prev, msg])
    const data = fetch('http://localhost:8000/chat', {
        method: 'POST', 
        body: JSON.stringify({query: content}),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'API-Key': 'secret'
        }
      })
    const text = await (await data).text()
    const userMsg = {
      agent: 0,
      content: text,
      id: "f11w2123f12f1sdfs",
      time: "12:24 pm",
    }
    setMessageList(prev => [...prev, userMsg])
  }

  const handleSendMessage = () => {
    if(content.length > 0){
      proceedMessage();
    }
  }

  const handleKeyPressed = (e:any) => {
    if (e.code === "Enter" && content.length > 0){
      proceedMessage();
    }
  }

  return (
    <ChatLayout>
      <div className="flex flex-row w-full">
        {/* ChatList */}
        <div className="hidden basis-1/4 flex flex-col bg-[#EFF2F8] max-h-screen" >
          {/* Search Bar */}
          <div className="p-5">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BsSearch />
              </span>
              <input
                className="ps-8 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md 
                  py-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                placeholder="Search" 
                type="text" 
                name="search"
              />
            </div>
          </div>
          <div className="px-3 item-center pb-3">
            <button className={`rounded-full m-1 px-3 ${ filterType == 0 ? "bg-white" : "bg-[#EDEDED]"}`} onClick={()=>setFilterType(0)}>All</button>
            <button className={`rounded-full m-1 px-3 ${ filterType == 1 ? "bg-white" : "bg-[#EDEDED]"}`} onClick={()=>setFilterType(1)}>Not Read</button>
            <button className={`rounded-full m-1 px-3 ${ filterType == 2 ? "bg-white" : "bg-[#EDEDED]"}`} onClick={()=>setFilterType(2)}>Completed</button>
            <button className={`rounded-full m-1 px-3 ${ filterType == 3 ? "bg-white" : "bg-[#EDEDED]"}`} onClick={()=>setFilterType(3)}>Reassigned</button>
            <button className={`rounded-full m-1 px-3 ${ filterType == 4 ? "bg-white" : "bg-[#EDEDED]"}`} onClick={()=>setFilterType(4)}>Read</button>
          </div>
          {/* Cards List */}
          <Chat data = {filterData} />
        </div>

        {/* Messages*/}
        <div className="flex-1 bg-white max-h-screen">
          <div className="flex flex-col h-svh px-6">
            <div className="flex-none pt-7 pb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-solid border-b-2 border-[#E9E9E9]">
              <h2 className="text-title-md2 font-semibold text-black">Jeremy cowell</h2>
              <nav>
                <a className="font-medium gap-2" href="">urgent</a>
              </nav>
            </div>
            <div className="hidden flex-none py-3 gap-3 sm:flex-row sm:items-center sm:justify-between border-solid border-b-2 border-[#E9E9E9]" >
              <a className="text-title font-semibold text-primary">Reassign</a>
              <nav>
                <a className="text-title font-semibold text-primary">Complete</a>
              </nav>
            </div>
            {/* Show messages here */}
            <div className="messages flex-1 overflow-auto rounded-lg pb-5">
              <Message data={messageList} />
            </div>
            {/* Message Input */}
            <div className="flex-none flex items-center gap-6 pt-3 pb-8">
              <div className="flex-1 h-14">
                <input
                className="w-full h-full placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 
                  pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                placeholder="Message..." 
                type="text" 
                name="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyPressed}
              />
              </div>
              <div className="flex-none right-0 px-6 py-4 rounded-md bg-slate-600 h-14 flex items-center" onClick={handleSendMessage}>
                <BsSend color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="hidden bg-white border-solid border-l-2 border-[#E9E9E9] max-h-screen py-4 overflow-auto lg:flex lg:flex-col">
          {/* User Name */}
          <div className="flex-none flex flex-row gap-3 items-center justify-between px-4">
            <div className="flex gap-3">
              <BiUser className="w-15 h-15 rounded-lg bg-gray-3"/>
              <div className="py-3">
                <h6 className="text-title-md text-black font-semibold">Jeremy Cowell</h6>
              </div>
            </div>
            <MdEdit className="w-10 h-10 p-2 bg-white border border-gray-3 rounded-md text-slate-300 hover:text-slate-500 cursor-pointer"/>
          </div>
          {/* Person Info Tab */}
          <div className="flex-1 w-full mt-3 overflow-y-auto">
            <div className="flex gap-3 px-4 text-slate-300">
              <a className={`font-medium cursor-pointer border-b border-white ${selectTab == 1 && "border-slate-900 text-black"}`} onClick={() => setSelectTab(1)} >Profile</a>
              <a className={`font-medium cursor-pointer border-b border-white ${selectTab == 2 && "border-slate-900 text-black"}`} onClick={() => setSelectTab(2)} >Activity</a>
              <a className={`font-medium cursor-pointer border-b border-white ${selectTab == 3 && "border-slate-900 text-black"}`} onClick={() => setSelectTab(3)} >Other</a>
            </div>
            <div className="border-t pt-7 mt-1 border-slate-200 px-4">
              <div className={`flex flex-col gap-7 mt-4 ${selectTab == 1 ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-5">
                  <label className="block text-md font-bold text-slate-500">
                    Email
                  </label>
                  <div className="flex items-center mx-4 justify-between">
                    <div className="flex gap-1 items-center">
                      <HiOutlineMail className="w-6 h-6 text-slate-300"/>
                      <input type="text" placeholder="username@gmail.com"
                        className="rounded border-none bg-transparent text-black outline-none transition focus:border-primary active:border-primary 
                        disabled:cursor-default disabled:bg-whiter"
                      />
                    </div>
                    <MdEdit className="p-1 border border-slate-300 rounded-md w-8 h-8 text-slate-300 cursor-pointer hover:text-slate-700"/>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <label className="block text-md font-bold text-slate-500">
                    Phone
                  </label>
                  <div className="flex items-center mx-4 justify-between">
                    <div className="flex gap-1 items-center">
                      <SelectCountry />
                      <input type="text" placeholder="+1 123 456 789"
                        className="rounded border-none bg-transparent text-black outline-none transition focus:border-primary active:border-primary 
                        disabled:cursor-default disabled:bg-whiter"
                      />
                    </div>
                    <MdEdit className="p-1 border border-slate-300 rounded-md w-8 h-8 text-slate-300 cursor-pointer hover:text-slate-700"/>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <label className="block text-md font-bold text-slate-500">
                    Address
                  </label>
                  <div className="flex items-center mx-4 justify-between">
                    <div className="flex gap-1 items-center">
                      <CiLocationOn />
                      <input type="text" placeholder="Placeholder"
                        className="rounded border-none bg-transparent text-black outline-none transition focus:border-primary active:border-primary 
                        disabled:cursor-default disabled:bg-whiter"
                      />
                    </div>
                    <MdEdit className="p-1 border border-slate-300 rounded-md w-8 h-8 text-slate-300 cursor-pointer hover:text-slate-700"/>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <label className="block text-md font-bold text-slate-500">
                    Notes
                  </label>
                  <div className="flex items-center mx-4 justify-between">
                    <input type="text" placeholder="Placeholder"
                      className="rounded border-none bg-transparent text-black outline-none transition focus:border-primary active:border-primary 
                      disabled:cursor-default disabled:bg-whiter"
                    />
                    <MdEdit className="p-1 border border-slate-300 rounded-md w-8 h-8 text-slate-300 cursor-pointer hover:text-slate-700"/>
                  </div>
                  <div className="border-t border-slate-300 pt-6">
                    <div className="px-4 flex items-center gap-3 cursor-pointer">
                      <AiOutlinePlus />
                      <span className="text-slate-500">Add note</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`tab_1 ${selectTab == 2 ? "block" : "hidden"}`}>
                Activity Content
              </div>
              <div className={`tab_1 ${selectTab == 3 ? "block" : "hidden"}`}>
                Other Content
              </div>
            </div>
          </div>
          {/* Button Group */}
          <div className="flex-none flex flex-col gap-3 items-center w-full p-4">
            <div className="flex items-center rounded-md text-white w-full bg-green-600 px-5 py-2 justify-center gap-3 cursor-pointer">
              <span>Mark as Complete</span>
              <AiOutlineCheck />
            </div>
            <div className="flex items-center rounded-md text-black bg-slate-50 w-full px-5 py-2 border border-slate-400 justify-center gap-3 cursor-pointer">
              <span>Reassign Task</span>
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default ChatPage;