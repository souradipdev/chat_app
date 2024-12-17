import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import LeftPanel from '@/components/LeftPanel'
import ChatWindow from '@/components/ChatWindow'
import RightPanel from '@/components/RightPanel'
import NewRoomModal from '@/components/NewRoomModal'

const inter = Inter({ subsets: ['latin'] })

export default function ChatApplication() {
  return (
    <div className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900 ${inter.className}`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <ChatWindow />
        <RightPanel />
      </div>
      <NewRoomModal />
    </div>
  )
}

