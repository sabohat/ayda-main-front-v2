import { redirect } from 'next/navigation'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { VideoAppWithChatbotComponent } from '@/components/video-app-with-chatbot'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage () {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  redirect('/courses')
  return (
    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} session={session} missingKeys={missingKeys} />
    // </AI>
    <div className="flex justify-center items-center w-full bg-red-400">
    </div>
  )
}
