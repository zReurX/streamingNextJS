import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/SideBar";

function layout({children}) {
    return (
        <SidebarProvider>
            <div className="w-screen">
                <SideBar />
                <NavBar />
                <div className="max-w-6xl mx-auto">
                    <div className="w-full overflow-hidden -z-10 pt-14 min-h-screen">
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default layout