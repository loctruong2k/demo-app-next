"use client"
import MessageBox from '@/src/components/message-account'

interface Props {
    params: {
        id: string
    }
}

function PageMessageID({ params }: Props) {
    return (
        <div className={`flex relative w-full h-full`}>
            <div className='w-full h-ful'>
                <MessageBox id={params.id} />
            </div>
        </div>
    )
}

export default PageMessageID