import {useSettingsStore} from "../store/settingsStore.ts";
import {Settings} from "../types/settings.ts";
import {useForm} from "react-hook-form";
import {GeminiModels} from "../enums/geminiModels.ts";
import {GetSettings, SetSettings} from "../Services/settingsService.ts";
import {motion} from "framer-motion";

function SettingsForm() {
    const setShowSettings = useSettingsStore((state) => state.SetShowSettings);
    
    const {register, handleSubmit,formState: {errors}} = useForm<Settings>({defaultValues: GetSettings()});

    function closeSettings() {
        setShowSettings(false);
    }

    function saveSettings(data: Settings) {
        SetSettings(data);
        setShowSettings(false);
    }

    return <>
        <div
            className={"fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800/20 backdrop-blur-xl"}
        >
            <motion.div
                initial={{ y: 400, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                    willChange: "transform", // ✅ GPU optimization
                    transform: "translateZ(0)" // ✅ GPU acceleration
                }}
                className="w-full max-w-md border border-gray-700/50 rounded-2xl shadow-lg p-6 bg-gray-900/70 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold neon-text-cyan">Gemini Settings</h2>
                    <button
                        onClick={closeSettings}
                        className="text-gray-400 hover:text-white text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit(saveSettings)}>
                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">API
                                Token</label>
                            <input type="text" {...register("GeminiApiKey",{required:"please enter the api token"})} placeholder="Enter your API token"
                                   className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                            {errors.GeminiApiKey && <p className={"text-red-400"}>{errors.GeminiApiKey.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="ai-model-select" className="block mb-2 text-sm font-medium text-gray-300">AI
                                Model</label>
                            <select
                                {...register("GeminiModel")}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <option value={GeminiModels.Pro}>Gemini 2.5 Pro</option>
                                <option value={GeminiModels.Flash}>Gemini 2.5 Flash</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full mt-8 bg-cyan-500 text-white font-bold rounded-lg py-3 hover:bg-cyan-600 transition-colors duration-300 neon-shadow-cyan">Save
                    </button>
                </form>
            </motion.div>
        </div>
    </>;
}

export default SettingsForm;