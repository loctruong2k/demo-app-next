"use client"
import { InfoData } from "@/src/api/info/type"
import { queryKeys } from "@/src/constants/query-key"
import { useSocket } from "@/src/socket-io/container/hook"
import { useQuery } from "@tanstack/react-query"
import { EmojiClickData } from "emoji-picker-react"
import { useCallback, useRef, useState } from "react"
import EmojiPicker from "../emoji-picker"
import { useFormMessage } from "../message-account/message-form-context/hook"
import { MessageForm } from "../message-account/type"
import SendButton from "../send-button"
import './index.css'
import ListFile from "./list-file"
type Props = {}

function InputMessage({ }: Props) {
  const { data } = useFormMessage()
  const { data: profile } = useQuery<InfoData>({
    queryKey: [queryKeys.profile]
  })

  const socket = useSocket()

  const inputRef = useRef<HTMLDivElement>(null)

  const [files, setFiles] = useState<File[]>([])

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
    if (!inputRef.current) return
    const message = inputRef.current.innerHTML
    if (!message && !files.length) return
    const messageData: MessageForm = {
      content: message,
      groupId: data.id,
      files: files,
      parentId: data.parentItem?._id
    }
  }

  return (
    <div className={`border-t ${files.length ? "pt-1" : ""}`}>
      <ListFile onDelete={handleDeleteFile} files={files} />
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
            onPaste={handlePaste}
            suppressContentEditableWarning={true}
            className={`outline-none transition-all duration-500 text-gray-400 min-h-[16px] max-h-[136px] overflow-auto input-maximize`}>
            Aa
          </div>
        </div>
        <SendButton
          disabled={false}
          onClick={sendMessageAction} loading={false} />
      </div>
    </div>
  )
}

export default InputMessage