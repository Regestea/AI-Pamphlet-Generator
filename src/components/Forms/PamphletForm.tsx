import StepButton from "../Shared/StepButton.tsx";
import {PamphletOptions} from "../../types/PamphletOptions.ts";
import {Languages} from "../../enums/Languages.ts";
import {FileFormats} from "../../enums/FileFormats.ts";

type PamphletFormProps = {
    onNext: (data: PamphletOptions) => void;
}

function PamphletForm(props: PamphletFormProps) {
    const formData: PamphletOptions = {
        AdditionalPrompt: "",
        Language: Languages.English,
        Format: FileFormats.Markdown
    };

    return <>

        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 neon-text-cyan">
            Explain your Pamphlet or give a prompt
        </h2>

        <textarea
            defaultValue={formData.AdditionalPrompt}
            onChange={(x) => {
                formData.AdditionalPrompt = x.target.value
            }}
            placeholder="e.g., A tri-fold pamphlet for a new coffee shop..."
            className="w-full flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        >
            
        </textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
                <label
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    Language
                </label>
                <select
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue={formData.Language}
                    onChange={(x) => {
                        formData.Language = x.target.value as Languages
                    }}
                >
                    {Object.entries(Languages).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label
                    className="block mb-2 text-sm font-medium text-gray-300"
                >
                    File Format
                </label>
                <select
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue={formData.Format}
                    onChange={(x) => {
                        formData.Format = x.target.value as FileFormats
                    }}
                >
                    {Object.entries(FileFormats).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
            </div>
        </div>
        <StepButton onButtonClick={() => props.onNext(formData)}>
            Next
        </StepButton>
    </>
}

export default PamphletForm;