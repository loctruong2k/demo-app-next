"use client"
import { InfoData } from '@/src/api/info/type'
import { FileMessageData } from '@/src/api/uploads/message/type'
import { getFileType } from '@/src/helpers/renderTypeFile'
import React from 'react'
import MessageLike from '../../messafe-like'
import RenderAvatar from '../../render-avatar'
import TimeLine from '../../time-line'
import { ItemMessageData } from '../list-message/type'
import { useFormMessage } from '../message-form-context/hook'
import { keyContext } from '../message-form-context/type'
import "./index.css"
import RenderFiles from './render-file'
import RenderImage from './render-image'
import RenderLike from './render-like'

type Props = {
    item: ItemMessageData,
    index: number,
    profile: InfoData
}

function ItemMessage({ item, index, profile }: Props) {
    const { handleChange } = useFormMessage()
    const isCurrent = profile.accountID === item.accountId
    const getFiles = () => {
        let images: FileMessageData[] = []
        let files: FileMessageData[] = []
        if (item.files.length) {
            item.files.forEach((item, index) => {
                if (getFileType(item.name) === "image") {
                    images.push(item)
                    return
                }
                files.push(item)
            })
        }
        return {
            images: images,
            files: files
        }
    }
    const filesFormat = getFiles();

    const onReplyMessage = () => {
        handleChange(keyContext.ReplyMessage, item)
    }

    const scrollToItem = () => {
        const element = document.getElementById(item.parentMessage?._id + "")
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" })
            element.classList.add("bg-blue-200")
            setTimeout(() => {
                element.classList.remove("bg-blue-200")
            }, 1000 * 5);
        }
    }

    const renderAvatar = () => {
        return <div className='rounded-full w-[44px] h-[44px] overflow-hidden'>
            <RenderAvatar url={item.info.avatar} />
        </div>
    }

    const isContent = !!item.content
    if (isCurrent) {
        return (
            <div id={item._id} className='flex flex-row items-start my-3 justify-end px-2 py-2'>
                <div className='flex-1 flex flex-col mr-2 items-end'>
                    <RenderImage isCurrent={isCurrent} images={filesFormat.images} />
                    <div className='flex items-end content-item'>
                        <div className='flex items-end'>
                            {!isContent ?
                                <div className='mr-2 flex item-center opacity-0 menu-item'>
                                    <div className='w-6 h-6 flex item-center justify-center'>
                                        <i className="fa-solid fa-ellipsis-vertical text-sm font-bold text-gray-500 cursor-pointer"></i>
                                    </div>
                                    <MessageLike id={item._id} />
                                    <div className='w-6 h-6 flex item-center justify-center'>
                                        <i onClick={onReplyMessage} className="fa-solid fa-reply text-xs font-bold text-gray-500 cursor-pointer"></i>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {filesFormat.files.length > 0 ?
                                <div className='flex flex-col mb-2 max-w-[80vw] 2xl:max-w-[40vw]'>
                                    {filesFormat.files.map((item, index) => {
                                        return <RenderFiles isCurrent={isCurrent} item={item} index={index} key={index} />
                                    })}
                                    {!isContent && item.likeMessageList?.length ? <div className="my-1"><RenderLike data={item.likeMessageList} /></div> : null}
                                </div>
                                : null}
                        </div>
                        <div className="relative flex-1 flex flex-col justify-end items-end">
                            {item.parentMessage ?
                                <div className="flex w-full items-end flex-col max-w-[60vw] 2xl:max-w-[40vw]">
                                    <p className="text-gray-400">{item.info.fullName} trả lời {item.parentMessageInfo?.fullName}</p>
                                    <div onClick={scrollToItem} className="bg-gray-200 w-fit p-2 pb-6 px-4 rounded-xl cursor-pointer">
                                        {item.parentMessage.content ?
                                            <div className="truncate max-w-[60vw] 2xl:max-w-[40vw] text-gray-400" dangerouslySetInnerHTML={{ __html: item.parentMessage.content }} />
                                            :
                                            <div className="text-gray-400 h-2 max-w-[60vw] 2xl:max-w-[40vw]">
                                                File đính kèm !
                                            </div>
                                        }
                                    </div>
                                </div>
                                :
                                null
                            }
                            {isContent ?
                                <div className='flex items-end'>
                                    <div className='mr-2 flex item-center opacity-0 menu-item'>
                                        <div className='w-6 h-6 flex item-center justify-center'>
                                            <i className="fa-solid fa-ellipsis-vertical text-sm font-bold text-gray-500 cursor-pointer"></i>
                                        </div>
                                        <MessageLike isCurrent={isCurrent} id={item._id} />
                                        <div className='w-6 h-6 flex item-center justify-center'>
                                            <i onClick={onReplyMessage} className="fa-solid fa-reply text-xs font-bold text-gray-500 cursor-pointer"></i>
                                        </div>
                                    </div>

                                    <div className={`p-2 w-fit max-w-[90vw] 2xl:max-w-[40vw] ${item.parentMessage && "mt-[-24px]"} mt-2 ${item.likeMessageList?.length ? "min-w-[70px]" : ""} bg-blue-100 rounded-xl overflow-hidden border border-gray-100`}>
                                        <p className='w-full break-words' dangerouslySetInnerHTML={{ __html: item.content }} />
                                        {item.likeMessageList?.length ?
                                            <div className={`${item.likeMessageList?.length && "h-6"} mt-2 flex items-center relative `}>
                                                <div className="absolute bg-slate-200 p-1 rounded-2xl">
                                                    <RenderLike data={item.likeMessageList} />
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>

                    <p className='text-xs text-gray-400 pt-1'>{item._id === "new" ? "Đang gửi..." : <TimeLine date={item.created_at} />}</p>
                </div>
                {renderAvatar()}
            </div>
        )
    }
    const renderMenu = () => {
        return (
            <div className='ml-4 opacity-0  menu-item flex items-center'>
                <div className='w-6 h-6 flex item-center justify-center'>
                    <i onClick={onReplyMessage} className="fa-solid fa-reply text-xs font-bold text-gray-500 cursor-pointer"></i>
                </div>
                <MessageLike isCurrent={isCurrent} id={item._id} />
                <div className='w-6 h-6 flex item-center justify-center'>
                    <i className="fa-solid fa-ellipsis-vertical text-sm font-bold text-gray-500 cursor-pointer"></i>
                </div>
            </div>
        )
    }
    return <div id={item._id} className='flex flex-row items-start md:mx-2 my-3 px-2'>
        {renderAvatar()}
        <div className='ml-2'>
            <RenderImage isCurrent={isCurrent} images={filesFormat.images} />
            {filesFormat.files.length > 0 ?
                <div className='flex flex-col'>
                    {filesFormat.files.map((item, index) => {
                        return <RenderFiles isCurrent={isCurrent} item={item} index={index} key={index} />
                    })}
                </div>
                : null
            }
            {isContent ?
                <div className='flex items-end content-item'>
                    <div className="relative flex flex-col">
                        {item.parentMessage ?
                            <div className="flex flex-col">
                                <p className="text-gray-400">{item.info.fullName} trả lời {item.parentMessageInfo?.fullName}</p>
                                <div onClick={scrollToItem} className="bg-gray-200 max-w-[60vw] 2xl:max-w-[40vw] w-fit p-2 pb-8 px-4 rounded-xl cursor-pointer">
                                    {item.parentMessage.content ?
                                        <div className="truncate text-gray-400 max-w-[60vw] 2xl:max-w-[40vw]" dangerouslySetInnerHTML={{ __html: item.parentMessage.content }} />
                                        :
                                        <div className="text-gray-400 h-2 max-w-[60vw] 2xl:max-w-[40vw]">
                                            File đính kèm !
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className={`flex items-end ${item.parentMessage && "mt-[-24px]"}`}>
                            <div className={`p-2 w-fit bg-white ${item.likeMessageList?.length ? "min-w-[70px]" : ""} overflow-hidden mt-2 rounded-xl max-w-[80vw] border border-gray-100`}>
                                <p className='w-full break-words' dangerouslySetInnerHTML={{ __html: item.content }} />
                                {item.likeMessageList?.length ?
                                    <div className={`${item.likeMessageList?.length && "h-6"} mt-1 flex items-center justify-end relative `}>
                                        <div className="absolute bg-slate-200 p-1 rounded-2xl">
                                            <RenderLike data={item.likeMessageList} />
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            {renderMenu()}
                        </div>
                    </div>
                </div>
                :
                null
            }
            <div className='flex flex-row items-center gap-2'>
                <p className='text-xs text-gray-400 pt-1'>{item._id === "new" ? "Đang gửi..." : <TimeLine date={item.created_at} />}</p>
            </div>
        </div>
    </div>
}

export default React.memo(ItemMessage)