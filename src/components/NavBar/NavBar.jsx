import Link from 'next/link'
import { FaRegBell } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import SearchBar from './SearchBar';
import ButtonAvatar from '../ButtonAvatar';
import Image from 'next/image';
import { SidebarTrigger } from '../ui/sidebar';
import UserAvatar from './UserAvatar';
import { auth } from '@/lib/auth';
import { ModeToggle } from '../ModeToggle';
import { Button } from '../ui/button';


async function NavBar() {
  const session = await auth()
  const links = [
    { path: '/', name: 'Home' },
    { path: '/movies', name: 'Film' },
    { path: '/tv-shows', name: 'Serie TV' },
    { path: '/archive', name: 'Archivio' },
  ]

  return (
    <div className='w-screen sticky top-0 z-40 bg-background'>
      <NavigationMenu>
        <NavigationMenuList>
          <SidebarTrigger className='md:hidden' />
          <Image src='/PopFilm.png' width={120} height={56} alt='logo' />
          {links.map((link, index) => (
            <NavigationMenuItem className='max-md:hidden' key={index}>
              <NavigationMenuLink asChild>
                <Link href={link.path}>
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuList>
          <SearchBar />

          <NavigationMenuItem>
            <FaRegBell />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ButtonAvatar fallback="IT" />
          </NavigationMenuItem>

          <NavigationMenuItem>
            {!session ? 
            <Button><Link href='/api/auth/signin'>Login</Link></Button> : 
            <UserAvatar />}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default NavBar