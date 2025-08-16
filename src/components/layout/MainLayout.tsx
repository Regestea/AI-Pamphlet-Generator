import Sidebar from "../Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {useSettingsStore} from "../../store/settingsStore.ts";
import SettingsForm from "../SettingsForm.tsx";

function MainLayout() {

    const showSettings = useSettingsStore((state) => state.ShowSettings);

    return <>
        <div className={"bg-gray-900 text-gray-200"}>
            <div className="flex h-screen">
                <main className="flex-1 flex items-center justify-center p-4 sm:p-8 pb-24 md:pb-8">
                    <Outlet/>
                </main>

                <Sidebar/>
            </div>
            {showSettings ? <SettingsForm /> : null}
        </div>
    </>
}

export default MainLayout;