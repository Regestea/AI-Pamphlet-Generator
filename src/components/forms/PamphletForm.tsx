import {PamphletOptions} from "../../types/pamphletOptions.ts";
import {Languages} from "../../enums/languages.ts";
import {FileFormats} from "../../enums/fileFormats.ts";
import {useForm} from "react-hook-form";
import {motion} from "framer-motion";

type PamphletFormProps = {
    data: PamphletOptions;
    onNext: (data: PamphletOptions) => void;
}

function PamphletForm(props: PamphletFormProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<PamphletOptions>({defaultValues: props.data});

    function next(data: PamphletOptions) {
        props.onNext(data);
    }

    return <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
        >
            <form onSubmit={handleSubmit(next)}>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 neon-text-cyan">
                    Explain your Pamphlet or give a prompt
                </h2>

                <textarea
                    {...register("AdditionalPrompt")}
                    placeholder="e.g., A tri-fold pamphlet for a new coffee shop..."
                    className="w-full flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                >
            
        </textarea>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            subject
                        </label>
                        <input type="text" {...register("Subject", {required: "please enter the subject"})}
                               placeholder="Enter your pamphlet subject"
                               className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        {errors.Subject && <p className={"text-red-400"}>{errors.Subject.message}</p>}
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-300"
                        >
                            Language
                        </label>
                        <select
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            {...register("Language")}
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
                            {...register("Format")}
                        >
                            {Object.entries(FileFormats).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type={"submit"}
                        className="w-full mt-4 sm:mt-6 bg-cyan-500 text-white font-bold rounded-lg py-3 hover:bg-cyan-600 transition-colors duration-300 neon-shadow-cyan">
                    Next
                </button>
            </form>
        </motion.div>
       
    </>
}

export default PamphletForm;