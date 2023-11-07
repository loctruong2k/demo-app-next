"use client"
import { deleteFileMessage, uploadFileMessage } from '@/src/api/uploads/message'
import { FileMessageData } from '@/src/api/uploads/message/type'
import { renderFileType } from '@/src/helpers/renderTypeFile'
import Image from 'next/image'
import { useEffect } from 'react'
import { useToast } from '../../toast/hook'

type Props = {
    files: any[],
    groupId: string,
    onDelete: (index: number) => void,
    onChangeFile: (files: FileMessageData[]) => void,
}

const ListFile = ({ files, onDelete, groupId, onChangeFile }: Props) => {
    const toast = useToast();
    useEffect(() => {
        if (!files.length) return
        let newFiles: File[] = []
        let fileToUpload: FileMessageData[] = []
        files.forEach((file: any) => {
            if (!file._id) {
                newFiles.push(file)
            } else {
                fileToUpload.push(file)
            }
        })
        if (!newFiles.length) return
        uploadFile(newFiles, fileToUpload);
        return () => {
            deleteUploadFile(fileToUpload.map(i => i._id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files])
    const deleteUploadFile = async (ids: string[]) => {
        try {
            if (ids.length > 0) {
                await deleteFileMessage(ids)
                const deleteFiles = files.filter(i => !ids.includes(i._id))
                onChangeFile(deleteFiles)
            }
        } catch (error) {
            toast.error({
                message: error + ""
            })
        }
    }
    const uploadFile = async (newFiles: File[], files: FileMessageData[]) => {
        try {
            const res = await uploadFileMessage(newFiles, groupId)
            if (res?.length) {
                onChangeFile([...files, ...res])
            }
        } catch (error) {
            toast.error({
                message: error + ""
            })
        }
    }

    if (!files.length) return null
    return (
        <div className="bottom-14 flex overflow-auto items-center w-full py-1">
            {files.map((item, index) => {
                return <div key={index}
                    className='flex items-center bg-slate-200 rounded-lg p-2 ml-2 max-w-[250px]'
                >
                    <div className="w-6">
                        <Image src={renderFileType(item.name)} alt='' width={24} height={24} />
                    </div>
                    <div className='ml-2 flex-1'>
                        <p className='truncate max-w-[180px] text-xs text-gray-500'>{item.name}</p>
                    </div>
                    <div
                        onClick={() => {
                            onDelete(index)
                            if (item._id) {
                                deleteUploadFile([item._id])
                            }
                        }}
                        className='w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-slate-300 rounded-full'>
                        <i className="fa-solid fa-xmark text-gray-600"></i>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListFile