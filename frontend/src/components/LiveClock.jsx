import { useState, useEffect } from 'react'

const LiveClock = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm font-mono backdrop-blur-md">
            {time.toLocaleTimeString()} • {time.toLocaleDateString()}
        </div>
    )
}

export default LiveClock
