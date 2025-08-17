'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"


function SideBar() {

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  const links = [
    { path: '/', name: 'Home' },
    { path: '/movies', name: 'Film' },
    { path: '/tv-shows', name: 'Serie TV' },
    { path: '/archive', name: 'Archivio' },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton onClick={() => toggleSidebar()} asChild>
                <Link href={link.path}>
                  {link.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar