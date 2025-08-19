import { signOut } from "@/lib/auth.js"
import { Button } from "../ui/button"
 
export function Logout() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}