"use client"
import { InfoData } from "@/src/api/info/type"
import { emitKeys } from "@/src/constants/emitKeys"
import { queryKeys } from "@/src/constants/query-key"
import { useSocket } from "@/src/socket-io/container/hook"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { EmojiClickData } from "emoji-picker-react"
import moment from "moment"
import { useCallback, useEffect, useRef, useState } from "react"
import EmojiPicker from "../emoji-picker"
import { ItemMessageData } from "../message-account/list-message/type"
import { useFormMessage } from "../message-account/message-form-context/hook"
import { keyContext } from "../message-account/message-form-context/type"
import { MessageForm } from "../message-account/type"
import RenderAvatar from "../render-avatar"
import SendButton, { startAnimation } from "../send-button"
import './index.css'
import ListFile from "./list-file"
type Props = {}

function InputMessage({ }: Props) {
  const queryClient = useQueryClient()
  const { data, handleChange } = useFormMessage()
  const { data: profile } = useQuery<InfoData>({
    queryKey: [queryKeys.profile]
  })

  const socket = useSocket()

  const inputRef = useRef<HTMLDivElement>(null)
  const timerSend = useRef<NodeJS.Timeout | undefined>(undefined);

  const [files, setFiles] = useState<any[]>([])

  const parentItem = data.parentItem

  useEffect(() => {
    if (parentItem) {
      if (!inputRef.current) return
      inputRef.current.focus();
    }
  }, [parentItem])

  // nhận file từ input[type = "file"]
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files);
      setFiles(prev => [...prev, ...fileArray])
    }
  }

  // delete file
  const handleDeleteFile = (index: number) => {
    const newFiles = files.filter((i, e) => e !== index)
    setFiles(newFiles)
  }

  // copy paste của người dùng vào input message 
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    if (clipboardData) {
      let fileArray: File[] = []
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (!file) return
          fileArray.push(file)
        }
      }
      if (fileArray.length) {
        setFiles(prev => [...prev, ...fileArray])
      }
    }
    const textToPaste = e.clipboardData.getData('text/plain');
    if (inputRef.current) {
      inputRef.current.innerHTML = inputRef.current.innerHTML + textToPaste;
    }
  }

  // add emoji
  const addEmoji = useCallback((e: EmojiClickData) => {
    if (!inputRef.current) return
    const value = inputRef.current.textContent
    if (value === "Aa") {
      inputRef.current.innerHTML = e.emoji
      return
    }
    inputRef.current.innerHTML = inputRef.current.innerHTML + e.emoji
  }, [])

  // send message
  const sendMessageAction = async () => {
    if (timerSend.current) {
      clearTimeout(timerSend.current)
    }
    timerSend.current = setTimeout(() => {
      if (!inputRef.current) return
      const message = inputRef.current.innerHTML
      if (!message && !files.length) return
      const messageData: MessageForm = {
        content: message === "Aa" ? "" : message,
        groupId: data.id,
        files: files.map(i => i._id),
        parentId: parentItem?._id
      }
      startAnimation()
      resetForm()
      socket?.emit(emitKeys.message.send, messageData)
      handleSendLocalMessage(messageData)
    }, 250)
  }

  const resetForm = () => {
    setTimeout(() => {
      if (!inputRef.current) return
      inputRef.current.innerHTML = ""
      setFiles([])
      if (parentItem) {
        closeReply()
      }
    }, 250);
  }

  const handleSendLocalMessage = (form: MessageForm) => {
    if (!profile) return
    const messageData: ItemMessageData = {
      _id: "new",
      content: form.content,
      accountId: profile?.accountID + "",
      chatsLike: [],
      created_at: moment().toISOString(),
      files: files,
      groupId: data.id,
      info: profile,
      parentId: data.parentItem?._id + "",
      status: "pending",
      updated_at: moment().toISOString(),
      parentMessage: parentItem,
      parentMessageInfo: parentItem?.info
    }
    const listMessage: ItemMessageData[] = queryClient.getQueryData([queryKeys.group_message.listMessage, messageData.groupId]) as ItemMessageData[]
    queryClient.setQueryData([queryKeys.group_message.listMessage, messageData.groupId], [messageData, ...listMessage])
  }
  const uploadFileChecking = () => {
    const index = files.findIndex(i => !i._id)
    return index > -1 ? true : false
  }
  const closeReply = () => {
    handleChange(keyContext.ReplyMessage, undefined)
  }

  return (
    <div className={`border-t ${files.length ? "pt-1" : ""} w-full`}>
      {parentItem ?
        <div className="flex flex-row items-center px-20 bg-gray-50 rounded-xl py-2">
          <RenderAvatar url={parentItem.info.avatar} />
          <div className="ml-4 flex-1">
            <h2 className="text-md font-bold text-gray-600">Trả lời: {parentItem.info.fullName}</h2>
            {parentItem.content ?
              <p className="text-gray-500 truncate w-[65vw]" dangerouslySetInnerHTML={{ __html: parentItem.content }}></p>
              :
              <p className="text-gray-500 truncate w-[65vw]">
                Đính kèm file!
              </p>
            }
          </div>
          <div className="min-w-[24px]">
            <i onClick={closeReply} className="fa-solid fa-xmark text-xl cursor-pointer"></i>
          </div>
        </div>
        :
        null
      }
      <ListFile
        groupId={data.id}
        onChangeFile={(files) => {
          setFiles(files);
        }}
        onDelete={handleDeleteFile}
        files={files}
      />
      <div className="flex w-full items-center">
        <label htmlFor="file-message" className={`w-10 h-6 flex items-center justify-center`}>
          <i className="fa-regular fa-image text-xl text-gray-500"></i>
        </label>
        <input multiple onChange={onChangeFile} type="file" className="hidden" id="file-message" />
        <EmojiPicker
          onClick={addEmoji}>
          <div className={`group w-10 h-6 flex items-center justify-center relative`}>
            <i className="fa-solid fa-face-smile text-xl text-gray-500"></i>
          </div>
        </EmojiPicker>
        <div className="flex-1 m-2 rounded-xl p-2 bg-slate-100">
          <div
            ref={inputRef}
            placeholder='Aa...'
            onFocus={(e) => {
              if (!inputRef.current) return
              const value = inputRef.current.textContent
              if (value === "Aa") {
                inputRef.current.textContent = ""
                inputRef.current.classList.remove("text-gray-400")
                inputRef.current?.classList.add("text-gray-950")
              }
            }}
            onBlur={() => {
              if (!inputRef.current) return
              const value = inputRef.current.textContent
              if (value === "Aa") {
                inputRef.current.classList.remove("text-gray-950")
                inputRef.current.classList.add("text-gray-400")
                return
              }
              if (!value) {
                inputRef.current.classList.remove("text-gray-950")
                inputRef.current.classList.add("text-gray-400")
                inputRef.current.textContent = "Aa"
              }
            }}
            contentEditable={true}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                sendMessageAction();
                event.preventDefault();
              }
            }}
            onInput={(e) => {
              if (!inputRef.current) return
              const value = inputRef.current.textContent
              const element = document.getElementById("button-send-message") as HTMLButtonElement
              if ((value === "Aa" || !value) && !files.length) {
                element.disabled = true;
              } else {
                element.disabled = false;
              }
            }}
            onPaste={handlePaste}
            suppressContentEditableWarning={true}
            className={`outline-none transition-all duration-500 text-gray-400 min-h-[16px] max-h-[136px] overflow-auto input-maximize`}>
            Aa
          </div>
        </div>
        <SendButton
          disabled={uploadFileChecking()}
          onClick={sendMessageAction}
        />
      </div>
    </div>
  )
}

export default InputMessage