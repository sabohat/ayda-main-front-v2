'use client'

import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconClose, IconSidebar } from './ui/icons'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const youtubeLinks = [
  { id: 1, title: "Class 1", url: "https://www.youtube.com/watch?v=example1" },
  { id: 2, title: "Class 2", url: "https://www.youtube.com/watch?v=example2" },
  // Add more links as needed
];

export function VideoAppWithChatbotComponent () {


  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you with the video?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Replace setTimeout with streaming API call
    fetchStreamingApiResponse(newMessage)
  }

  const fetchStreamingApiResponse = async (userMessage: Message) => {
    // Example of a streaming API call
    const apiUrl = process.env.NEXT_PUBLIC_STREAMING_API_URL || '/api/streaming-response';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage.text })
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader?.read() || {}
      done = readerDone ?? false

      if (value) {
        const chunk = decoder.decode(value, { stream: true })
        const botResponse: Message = {
          id: messages.length + 2,
          text: chunk,
          sender: 'bot'
        }
        setMessages(prevMessages => [...prevMessages, botResponse])
      }
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-purple-100">
      <button onClick={toggleSidebar} className="absolute top-2 left-2 p-2 bg-gray-800 text-white">
        <IconSidebar className="size-8" />
      </button>

      {isSidebarOpen && (
        <div className="md:w-1/4 bg-white shadow-md flex flex-col h-full">
          <div className="p-4 bg-gray-800 text-white flex flex-row justify-between">
            <h2 className="text-xl font-bold pl-12">Sidebar</h2>
            <button onClick={toggleSidebar} className="">
              <IconClose className="size-8" />
            </button>
          </div>
          <div className="p-4">
            <p>List of classes</p>
            <ul>
              {youtubeLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            {/* Add more sidebar content here */}
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className="flex-grow">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dLS450xck1I"
          width="100%"
          height="100%"
          controls
          playing
          muted
          loop
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous"
              }
            }
          }}
        />
      </div>

      {/* Chatbot */}
      <div className="md:w-1/4 bg-white shadow-md flex flex-col h-full">
        <div className="p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-bold">Study buddy</h2>
        </div>
        <ScrollArea className="flex-grow p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex w-full space-x-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2 focus:ring focus:ring-opacity-50"
            />
            <Button type="submit" className="text-white flex-shrink-0">Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}