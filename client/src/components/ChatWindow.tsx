"use client"
import { useState } from 'react'
import { Send, Smile, Paperclip } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ChatWindow() {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    // Handle sending message
    setMessage('')
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-gray-800 dark:text-gray-200">Hello! How are you?</p>
            <span className="text-xs text-gray-500 mt-1">10:00 AM</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 max-w-xs lg:max-w-md">
            <p className="text-white">I'm good, thanks! How about you?</p>
            <span className="text-xs text-blue-200 mt-1">10:02 AM</span>
          </div>
        </div>
        {/* More messages... */}
      </ScrollArea>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow duration-200"
          />
          <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

