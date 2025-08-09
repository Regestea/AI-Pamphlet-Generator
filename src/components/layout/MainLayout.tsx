import DesktopSidebar from "../DesktopSidebar.tsx";
import PhoneSidebar from "../PhoneSidebar.tsx";
import {Outlet} from "react-router-dom";

function MainLayout() {
    return <>
        <div className={"bg-gray-900 text-gray-200"}>
            <div className="flex h-screen">
                {/* Sidebar for Desktop */}
                <DesktopSidebar/>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-4 sm:p-8 pb-24 md:pb-8">
                    <Outlet/>
                </main>

                {/* Bottom Nav Container for Mobile */}
               <PhoneSidebar/>
            </div>

        </div>
    </>
}

export default MainLayout;