import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faCog} from "@fortawesome/free-solid-svg-icons";
import {useSettingsStore} from "../store/settingsStore.ts";
import {motion} from "framer-motion"
import {useMediaQuery} from "react-responsive";

function Sidebar() {
    const setShowSettings = useSettingsStore((state) => state.SetShowSettings);
    const isMd = useMediaQuery({ minWidth: 768 });
    
    return <>
        <motion.div
            className="fixed glass bottom-14 md:bottom-auto left-0 right-0 h-20 z-10 rounded-3xl border-t md:border-t-0 md:border-r border-gray-200/50 w-11/12 justify-self-center md:justify-self-auto  grid grid-cols-2 md:block justify-items-center md:w-20 md:h-screen md:space-y-12 content-center md:z-20"
            initial={isMd ? { x: -100, opacity: 0 } : { y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >

            <button
                onClick={() => window.location.reload()}
                title="Home"
                className="flex items-center justify-center w-14 h-14 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
            >
                <FontAwesomeIcon icon={faHome} className={"text-cyan-400 "} size={"lg"}/>
            </button>


            <button
                onClick={() => setShowSettings(true)}
                title="SettingsForm"
                className="flex items-center justify-center w-14 h-14 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
            >
                <FontAwesomeIcon icon={faCog} className={"text-cyan-400 "} size={"lg"}/>
            </button>
        </motion.div>


    </>
}

export default Sidebar;