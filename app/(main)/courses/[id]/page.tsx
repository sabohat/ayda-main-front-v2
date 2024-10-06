import { VideoAppWithChatbotComponent } from '@/components/video-app-with-chatbot';

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function CoursePage () {
    const session = (await auth()) as Session
    const missingKeys = await getMissingKeys()

    if (!session?.user) {
        redirect(`/login`)
    }

    return <div className='flex w-full min-h-[calc(100vh_-_theme(spacing.16))]'>
        <VideoAppWithChatbotComponent />
    </div>
}