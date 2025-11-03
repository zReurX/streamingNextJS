import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "./UserAvatar";
import { ModeToggle } from "./ModeToggle";
import { Suspense } from "react";

async function NavBar() {
  const links = [
    { path: "/", name: "Home" },
    { path: "/movie", name: "Film" },
    { path: "/tv", name: "Serie TV" },
  ];

  return (
    <div className="w-screen sticky top-0 z-40 bg-background">
      <NavigationMenu>
        <NavigationMenuList>
          <SidebarTrigger className="md:hidden" />
          <Image
            className="md:hidden"
            src="/PopFilmLogo.png"
            width={26}
            height={26}
            alt="logo"
          />
          <Image
            className="max-md:hidden"
            src="/PopFilm.png"
            width={120}
            height={56}
            alt="logo"
          />
          {links.map((link, index) => (
            <NavigationMenuItem className="max-md:hidden" key={index}>
              <NavigationMenuLink asChild>
                <Link href={link.path}>{link.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <SearchBar />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <UserAvatar />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default NavBar;
