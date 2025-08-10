import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf,faFileWord} from "@fortawesome/free-solid-svg-icons";

function DownloadFile() {
    return <>

        <div className="form-step items-center justify-center">
            
            <div id="result-container" className=" w-full max-w-sm">
                
                <div className="result-card hidden glass rounded-2xl p-8 text-center animate-fade-in">
                    <FontAwesomeIcon icon={faFilePdf} className={"text-7xl text-red-400"}/>
                    <p className="mt-4 font-bold text-xl">Your PDF is ready!</p>
                    <button
                        className="w-full mt-6 bg-red-400 text-white font-bold rounded-lg py-3 hover:bg-red-500 transition-colors">Download
                    </button>
                </div>
                
                <div className="result-card hidden glass rounded-2xl p-8 text-center animate-fade-in">
                    <div
                        className="w-20 h-20 mx-auto rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-black text-4xl">MD</span>
                    </div>
                    <p className="mt-4 font-bold text-xl">Your Markdown file is ready!</p>
                    <button
                        className="w-full mt-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg py-3 hover:opacity-90 transition-opacity">Download
                    </button>
                </div>
                
                <div className="result-card  glass rounded-2xl p-8 text-center animate-fade-in">
                    <FontAwesomeIcon icon={faFileWord} className={"text-7xl text-blue-500"}/>
                    <p className="mt-4 font-bold text-xl">Your DOCX file is ready!</p>
                    <button
                        className="w-full mt-6 bg-blue-500 text-white font-bold rounded-lg py-3 hover:bg-blue-600 transition-colors">Download
                    </button>
                </div>
                
            </div>
        </div>
    </>;
}

export default DownloadFile;