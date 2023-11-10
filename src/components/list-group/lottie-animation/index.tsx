import { LottieOptions, useLottie } from 'lottie-react';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    url: string
}

function LottieAnimation({ url }: Props) {
    const [options, setOptions] = useState<LottieOptions>({
        animationData: null,
        loop: true,
        width: 40,
        height: 40,
    });

    useEffect(() => {
        fetch(url)
            .then((data) => data.json())
            .then((json) => {
                setOptions(prev => ({
                    ...prev,
                    animationData: json
                }))
            })
    }, [url]);

    const { View } = useLottie(options);
    return <div className="w-[48px]">{View}</div>
}

export default LottieAnimation