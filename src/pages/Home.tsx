import TopicsForm from "../components/forms/TopicsForm.tsx";
import Progressing from "../components/Progressing.tsx";
import { useState, useEffect } from "react"; // <-- 1. Import useEffect
import { PamphletOptions } from "../types/pamphletOptions.ts";
import { TopicData } from "../types/topicData.ts";
import PamphletForm from "../components/forms/PamphletForm.tsx";
import { FileFormats } from "../enums/fileFormats.ts";
import { Languages } from "../enums/languages.ts";
import DownloadFile from "../components/DownloadFile.tsx";
import { PamphletRequest } from "../requests/pampheltRequest.ts";
import { generatePamphletService } from "../Services/generatePamphletService.ts";
import { MarkdownToFIleService } from "../Services/markdownToFIleService.ts";
import { convertMarkdownToPdf } from "../Services/markdownToPdfService.ts";
import { convertMarkdownToWord } from "../Services/markdownToWordService.ts";

enum Steps {
    One,
    Two,
    Three,
    Four
}

// Define initial state outside the component so it's not recreated on every render
const initialData: PamphletRequest = {
    options: {
        AdditionalPrompt: "",
        Subject: "",
        Language: Languages.English,
        Format: FileFormats.Markdown
    },
    topics: null
};

function Home() {
    const [step, setStep] = useState<Steps>(Steps.One);
    // --- 2. Use useState for your data and URL ---
    // This is the main fix. State persists across re-renders.
    const [pamphletRequest, setPamphletRequest] = useState<PamphletRequest>(initialData);
    const [fileUrl, setFileUrl] = useState<string>("");

    // --- 3. Handle async logic in a useEffect hook ---
    // This is the standard React way to handle "side effects" like API calls.
    useEffect(() => {
        if (step === Steps.Three) {
            const generateFile = async () => {
                try {
                    const markdown = await generatePamphletService(pamphletRequest);
                    let generatedUrl = "";
                    switch (pamphletRequest.options.Format) {
                        case FileFormats.Markdown:
                            generatedUrl = MarkdownToFIleService(markdown);
                            break;
                        case FileFormats.PDF:
                            generatedUrl = await convertMarkdownToPdf(markdown);
                            break;
                        case FileFormats.Word:
                            generatedUrl = await convertMarkdownToWord(markdown);
                            break;
                    }
                    setFileUrl(generatedUrl); // Set the generated URL in state
                    GoNextStep(); // Proceed to the download step
                } catch (error) {
                    console.error("Failed to generate the file:", error);
                    // Optional: Add error handling, like showing a message to the user
                    // and going back to the previous step.
                    // GoPreviousStep();
                }
            };

             generateFile();
        }
        // This effect runs only when `step` changes to `Steps.Three`
    }, [step]);

    function GoNextStep() {
        if (step !== Steps.Four) {
            setStep(prevStep => prevStep + 1);
        }
    }

    function GoPreviousStep() {
        if (step !== Steps.One) {
            setStep(prevStep => prevStep - 1);
        }
    }

    function GetCurrentFormStep() {
        switch (step) {
            case Steps.One:
                return <PamphletForm
                    data={pamphletRequest.options}
                    onNext={(data: PamphletOptions) => {
                        // Use the state setter function to update the request data
                        setPamphletRequest(prev => ({ ...prev, options: data }));
                        GoNextStep();
                    }}
                />;
            case Steps.Two:
                return <TopicsForm
                    onPrevious={GoPreviousStep}
                    onNext={(x: TopicData[]) => {
                        setPamphletRequest(prev => ({ ...prev, topics: x }));
                        GoNextStep();
                    }}
                />;
            case Steps.Three:
                // Only display the loading indicator. The useEffect handles the logic.
                return <Progressing />;
            case Steps.Four:
                return <DownloadFile
                    fileFormat={pamphletRequest.options.Format}
                    fileUrl={fileUrl} // Read the URL from state
                    onDoneClick={() => {
                        // Clean up and reset all state for the next run
                        if (fileUrl) {
                            URL.revokeObjectURL(fileUrl);
                        }
                        setPamphletRequest(initialData);
                        setFileUrl("");
                        setStep(Steps.One);
                    }}
                />;
            default:
                return null;
        }
    }

    return (
        <div className="w-full max-w-2xl min-h-[550px] glass rounded-2xl shadow-lg flex flex-col relative">
            <div className="absolute inset-0 p-4 flex flex-col">
                {GetCurrentFormStep()}
            </div>
        </div>
    );
}

export default Home;