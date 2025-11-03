'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"


export default function UserAvatar() {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return (
    <Button asChild>
      <Link href='/login'>Login</Link>
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='justify-center'>
          <button onClick={signOut}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}