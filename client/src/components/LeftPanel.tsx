"use client"
import {useState} from 'react'
import {Search, Plus, ChevronDown, ChevronUp, Hash, User} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ScrollArea} from '@/components/ui/scroll-area'

export default function LeftPanel() {
  const [isUsersExpanded, setIsUsersExpanded] = useState(true)

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
          <Input type="text" placeholder="Search rooms..." className="pl-8"/>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Rooms</h2>
          <ul className="space-y-2">
            <li
              className="bg-blue-100 dark:bg-blue-900 rounded-md p-2 text-blue-800 dark:text-blue-200 flex items-center">
              <Hash className="h-4 w-4 mr-2"/>
              General
            </li>
            <li
              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-gray-800 dark:text-gray-200 flex items-center transition-colors duration-200">
              <Hash className="h-4 w-4 mr-2"/>
              Random
            </li>
            <li
              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 text-gray-800 dark:text-gray-200 flex items-center transition-colors duration-200">
              <Hash className="h-4 w-4 mr-2"/>
              Work
            </li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => setIsUsersExpanded(!isUsersExpanded)}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Users</h2>
            {isUsersExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
            )}
          </div>
          {isUsersExpanded && (
            <ul className="space-y-2">
              <li
                className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 transition-colors duration-200">
                <User className="h-4 w-4 text-green-500"/>
                <span className="text-gray-800 dark:text-gray-200">Alice Smith</span>
              </li>
              <li
                className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 transition-colors duration-200">
                <User className="h-4 w-4 text-gray-400"/>
                <span className="text-gray-800 dark:text-gray-200">Bob Johnson</span>
              </li>
            </ul>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                onClick={() => {
                }}>
          <Plus className="h-4 w-4 mr-2"/>
          New Room
        </Button>
      </div>
    </div>
  )
}

