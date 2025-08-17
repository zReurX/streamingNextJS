'use client'
import { IoMdArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation"

function BackLink() {
    const router = useRouter()
    return (
        <button onClick={() => router.back()}
            className="absolute top-2 left-2 text-4xl cursor-pointer">
            <IoMdArrowRoundBack className='' />
        </button>
    )
}

export default BackLink