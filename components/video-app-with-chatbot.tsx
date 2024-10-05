'use client'

import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export function VideoAppWithChatbotComponent () {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you with the video?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')

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

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-purple-100">
      {/* Video Player */}
      <div className="md:w-2/3">
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
      <div className="md:w-1/3 bg-white shadow-md flex flex-col h-full">
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