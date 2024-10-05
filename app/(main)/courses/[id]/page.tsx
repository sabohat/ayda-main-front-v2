import { VideoAppWithChatbotComponent } from '@/components/video-app-with-chatbot';

export default function CoursePage ({ courseData }: { courseData: any }) {
    return <div className='flex w-full min-h-[calc(100vh_-_theme(spacing.16))]'>
        <VideoAppWithChatbotComponent />
    </div>
}