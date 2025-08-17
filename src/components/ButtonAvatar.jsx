import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function ButtonAvatar({ src='', fallback}) {
    return (
        <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}

export default ButtonAvatar