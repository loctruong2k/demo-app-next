"use client"
import { PhotoProvider } from 'react-photo-view'
import InputMessage from '../input-message'
import ListMessage from './list-message'
import MessageFormContext from './message-form-context'

interface Props {
    id: string
}

function MessageBox({ id }: Props) {
    return (
        <PhotoProvider
            className='w-full h-full'>
            <MessageFormContext id={id}>
                <div className='flex h-full w-full flex-col'>
                    <div className='flex-1 overflow-auto bg-slate-100'>
                        <ListMessage />
                    </div>
                    <InputMessage />
                </div>
            </MessageFormContext>
        </PhotoProvider>
    )
}

export default MessageBox