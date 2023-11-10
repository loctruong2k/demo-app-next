"use client"
import HeaderBoxMessage from '@/src/components/header-message'
import ListGroup from '@/src/components/list-group'
import MessageBox from '@/src/components/message-account'
import { ListGroupType } from '@/src/types/groupType'
import { useState } from 'react'

function MessagePage() {
    const [currentItem, setCurrentItem] = useState<ListGroupType>()

    return (
        <div className="h-full w-full">
            <div className='flex flex-row h-full'>
                <ListGroup currentItem={currentItem} setCurrentItem={item => setCurrentItem(item)} />
                <div className={`${currentItem ? "block" : "hidden"} md:!block flex-[3] h-full w-full overflow-hidden`}>
                    {currentItem ?
                        <div className='flex flex-col h-full'>
                            <div className="h-14 shadow-md border-b">
                                <HeaderBoxMessage onLeftClick={() => {
                                    console.log("onLeftClick");

                                    setCurrentItem(undefined)
                                }} dataItem={currentItem} />
                            </div>
                            <div className='flex-1 h-[calc(100%-3.5rem)]'>
                                <MessageBox id={currentItem?.groups._id} />
                            </div>
                        </div>
                        :
                        <div className='flex w-full h-full items-center justify-center'>
                            <p className='p-2 rounded-2xl text-gray-400'>Chọn nhóm để bắt đầu !</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagePage