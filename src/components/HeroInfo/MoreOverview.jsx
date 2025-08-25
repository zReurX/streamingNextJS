import { useState } from "react"
import { Button } from "../ui/button"

export default function MoreOverview({ children }) {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <div className="space-y-1">
            <p className={`text-xs ${!show && 'line-clamp-3'}`}>
                {children}
            </p>
            <Button variant='ghost' onClick={handleClick}>{!show ? 'Leggi tutto' : 'Leggi meno'}</Button>
        </div>
    )

}