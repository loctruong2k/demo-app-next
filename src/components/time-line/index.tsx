import { formatTimeline } from '@/src/helpers/formatDuration'
import React, { useEffect, useState } from 'react'

type Props = {
    date: string
}

const TimeLine = ({ date }: Props) => {
    const [state, setState] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setState(prev => prev++)
        }, 1000 * 60)
    }, [])
    return formatTimeline(date)
}

export default TimeLine