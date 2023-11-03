"use client"
import EmojiPicker, { EmojiClickData, EmojiStyle, SkinTones, SuggestionMode } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
interface Props {
    children: React.ReactNode,
    classPopup?: string,
    onClick: (item: EmojiClickData) => void
}
function EmojiComponent({ children, classPopup, onClick }: Props) {
    const [open, setOpen] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div ref={divRef} className="relative">
            <div className="z-50" onClick={() => setOpen(!open)}>
                {children}
            </div>
            <div className={`absolute bottom-12 left-0 emoji-component ${classPopup} ${open ? "" : "hidden"}`}>
                <EmojiPicker
                    searchPlaceholder="Tìm kiếm..."
                    emojiStyle={EmojiStyle.GOOGLE}
                    skinTonesDisabled={true}
                    lazyLoadEmojis={true}
                    defaultSkinTone={SkinTones.LIGHT}
                    suggestedEmojisMode={SuggestionMode.RECENT}
                    onEmojiClick={onClick}
                    previewConfig={{ showPreview: false }} />
            </div>
        </div>
    )
}

export default React.memo(EmojiComponent)