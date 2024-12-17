import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function RightPanel() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Room Details</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
              <p className="text-gray-800 dark:text-gray-200">General</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
              <p className="text-gray-800 dark:text-gray-200">General discussion for all team members</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Participants</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-800 dark:text-gray-200">John Doe</span>
                </li>
                <li className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/avatars/02.png" alt="User" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Alice Smith</span>
                </li>
                {/* More participants... */}
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

