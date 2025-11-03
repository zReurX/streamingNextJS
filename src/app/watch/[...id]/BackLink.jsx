'use client'
import { IoMdArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";

function BackLink() {
    const router = useRouter()
    return (
        <Button onClick={() => router.back()}
            className="fixed z-50 cursor-pointer top-2 left-2 text-4xl">
            <IoMdArrowRoundBack />
        </Button>
    )
}

export default BackLink