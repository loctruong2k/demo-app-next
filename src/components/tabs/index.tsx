import React, { useState } from 'react'
import { TabList, TabValue } from './type'

const classActiveTab = "border-b-2 border-sky-500 font-bold"
function Tabs(props: TabList) {
    const [active, setActive] = useState<TabValue>(props.data[0])
    return (
        <div className={`h-full flex flex-col ${props.className}`}>
            <div className={`flex items-center ${props.classTabs}`}>
                {props.data.map((item, index) => {
                    const isActive = active.id === item.id
                    return <div
                        onClick={() => {
                            setActive(item)
                            props.onChange && props.onChange(item)
                            props.onChangeIndex && props.onChangeIndex(index)
                        }}
                        key={index} className={`${isActive ? classActiveTab : ""} flex-1 mx-2 flex items-center justify-center`}>
                        <span>{item.title}</span>
                    </div>
                })}
            </div>
            <div className={`${props.classContent} flex-1`}>
                {active.children}
            </div>
        </div>
    )
}

export default Tabs