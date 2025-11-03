import NavBar from "@/components/NavBar/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/SideBar";
import { SessionProvider } from "next-auth/react";

function layout({ children }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="w-screen">
          <SideBar />
          <NavBar />
          <div className="max-w-6xl mx-auto">
            <div className="w-full overflow-hidden -z-10">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}

export default layout;
