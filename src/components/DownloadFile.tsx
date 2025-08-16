import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {FileFormats} from "../enums/fileFormats.ts";

type DownloadFileProps = {
    fileFormat: FileFormats;
    fileUrl: string;
    onDoneClick: () => void;
}

function DownloadFile(props: DownloadFileProps) {
    
    return <>

        <div className=" mt-24 justify-center">

            <div className=" w-full ">
                {DownloadCard(props)}
                
                
            </div>
            <button
                onClick={props.onDoneClick}
                className="w-full mt-36 bg-cyan-500 text-white font-bold rounded-lg py-3 hover:bg-cyan-600 transition-colors">Done
            </button>
        </div>
    </>;
}

function DownloadCard(props: DownloadFileProps) {
    switch (props.fileFormat) {
        case FileFormats.PDF:
            return <>
                <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
                    <FontAwesomeIcon icon={faFilePdf} className="text-7xl text-red-400" />

                    <a
                        href={props.fileUrl}
                        download={"pamphlet.pdf"}
                        className="w-full p-4 bg-red-400 text-white font-bold rounded-lg hover:bg-red-500 transition-colors"
                    >
                        Download
                    </a>
                </div>

            </>
        case FileFormats.Word:
            return <>

                <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
                    <FontAwesomeIcon icon={faFileWord} className={"text-7xl text-blue-500"}/>
                    <a
                        href={props.fileUrl}
                        download={"pamphlet.docx"}
                        className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Download
                    </a>
                </div>
                
            </>
        case FileFormats.Markdown:
            return <>
                <div className="flex flex-col glass rounded-2xl p-8 text-center ">
                    <div
                        className="w-20 h-20 mx-auto rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-black text-4xl">MD</span>
                    </div>
                    
                    <a
                        href={props.fileUrl}
                        download={"pamphlet.md"}
                        className="w-full mt-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg py-3 hover:opacity-90 transition-opacity">Download
                    </a>
                </div>
            </>
    }
}

export default DownloadFile;