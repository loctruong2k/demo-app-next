import { formatTimeline } from '@/src/helpers/formatDuration'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

type Props = {
    date: string
}

const TimeLine = ({ date }: Props) => {
    const [state, setState] = useState(moment().toISOString())
    useEffect(() => {
        setInterval(() => {
            setState(moment().toISOString())
        }, 1000 * 60)
    }, [])
    return <span>{formatTimeline(date, state)}</span>
}

export default TimeLine