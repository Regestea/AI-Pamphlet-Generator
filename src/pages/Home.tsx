import PamphletForm from "../components/Forms/PamphletForm.tsx";
import TopicsForm from "../components/Forms/TopicsForm.tsx";
import Progressing from "../components/Progressing.tsx";
import {useState} from "react";
import {PamphletOptions} from "../types/PamphletOptions.ts";
import {TopicData} from "../types/TopicData.ts";

enum Steps {
    One,
    Two,
    Three,
}

type PamphletRequest = {
    options: PamphletOptions | null,
    topics: TopicData[] | null,

}
const pm: PamphletRequest = {
    options: null,
    topics: null
};


function Home() {
    const [step, setStep] = useState<Steps>(Steps.One);

    function GetCurrentFormStep(step: Steps) {
        switch (step) {
            case Steps.One:
                return <PamphletForm onNext={(data: PamphletOptions) => {
                    pm.options = data;
                    GoNextStep();
                }}/>
            case Steps.Two:
                return <TopicsForm onNext={(x: TopicData[]) => {
                    pm.topics = x;
                    GoNextStep();
                }}/>
            case Steps.Three:
                return <Progressing/>
        }
    }

    function GoNextStep() {
        if (step !== Steps.Three) {
            console.log(pm);
            setStep(step + 1);
        }
    }

    return <>
        <div className="w-full max-w-2xl min-h-[500px] glass rounded-2xl shadow-lg flex flex-col relative">
            <div className="form-step">
                {GetCurrentFormStep(step)}
            </div>
        </div>
    </>
}

export default Home;