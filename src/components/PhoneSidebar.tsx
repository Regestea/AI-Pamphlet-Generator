
function PhoneSidebar(){
    return <>
        <div
            id="mobile-nav-container"
            className="md:hidden fixed bottom-0 left-0 right-0 h-20 z-20 glass border-t border-gray-700/50 overflow-hidden"
        >
            <div
                id="nav-panel-1"
                className="nav-panel absolute inset-0 flex items-center justify-around"
            >
                <a
                    href="#"
                    title="Home"
                    className="flex items-center justify-center w-16 h-16 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
                >
                    <i className="fas fa-home fa-lg text-cyan-400"></i>
                </a>
                <button
                    className="mobile-nav-toggle-btn w-10 h-10 flex items-center justify-center text-cyan-400">
                    <i className="mobile-nav-toggle-icon fas fa-chevron-up"></i>
                </button>
                <a
                    href="#"
                    title="Settings"
                    className="flex items-center justify-center w-16 h-16 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
                >
                    <i className="fas fa-cog fa-lg text-cyan-400"></i>
                </a>
            </div>

            <div
                id="nav-panel-2"
                className="nav-panel absolute inset-0 flex items-center justify-around"
            >
                <a
                    href="#"
                    title="Profile"
                    className="flex items-center justify-center w-16 h-16 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
                >
                    <i className="fas fa-user fa-lg text-cyan-400"></i>
                </a>
                <button
                    className="mobile-nav-toggle-btn w-10 h-10 flex items-center justify-center text-cyan-400">
                    <i className="mobile-nav-toggle-icon fas fa-chevron-up"></i>
                </button>
                <a
                    href="#"
                    title="Mail"
                    className="flex items-center justify-center w-16 h-16 rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-white"
                >
                    <i className="fas fa-envelope fa-lg text-cyan-400"></i>
                </a>
            </div>
        </div>
    </>
}
export default PhoneSidebar;