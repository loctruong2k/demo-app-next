"use client"
import MessageBox from '@/src/components/message-account'

interface Props {
    params: {
        id: string
    }
}

function PageMessageID({ params }: Props) {
    return (
        <div className={`h-[calc(100vh-56px)] overflow-hidden`}>
            <MessageBox id={params.id} />
        </div>
    )
}

export default PageMessageID