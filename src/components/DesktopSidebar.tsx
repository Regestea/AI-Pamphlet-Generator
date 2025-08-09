import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome,faCog,faBolt } from "@fortawesome/free-solid-svg-icons";

function DesktopSidebar() {
    return <>
        <aside
            className="hidden md:flex w-20 h-screen glass border-r border-gray-700/50 flex-col items-center z-10">
            <div className="flex items-center justify-center h-20 border-b border-gray-700/50 w-full">
                <FontAwesomeIcon className={"text-cyan-400 neon-text-cyan"} icon={faBolt} size={"2x"}/>
            </div>
            <nav className="flex-1 py-8">
                <ul>
                    <li className="mb-4">
                        <a
                            href="#"
                            title="Home"
                            className="flex justify-center items-center w-12 h-12 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-200 group"
                        >
                            <FontAwesomeIcon className="text-cyan-400" icon={faHome} size={"lg"}/>
                        </a>
                    </li>
                    <li className="mb-4">
                        <a
                            href="#"
                            title="Settings"
                            className="flex justify-center items-center w-12 h-12 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-200 group"
                        >
                            <FontAwesomeIcon className="text-cyan-400" icon={faCog} size={"lg"}/>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    </>
}
export default DesktopSidebar;
