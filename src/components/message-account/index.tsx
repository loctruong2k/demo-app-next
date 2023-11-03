"use client"
import InputMessage from '../input-message'
import ListMessage from './list-message'
import MessageFormContext from './message-form-context'

interface Props {
    id: string
}

function MessageBox({ id }: Props) {
    return (
        <MessageFormContext id={id}>
            <div className='flex h-full w-full flex-col max-w-[1366px] mx-auto'>
                <div className='flex-1 bg-slate-50'>
                    <ListMessage />
                </div>
                <InputMessage />
            </div>
        </MessageFormContext>
    )
}

export default MessageBox