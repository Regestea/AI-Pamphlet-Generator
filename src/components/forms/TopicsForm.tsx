import {Fragment, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {produce} from "immer";
import "../../types/topicData.ts";
import {TopicData} from "../../types/topicData.ts";

type TopicFromProps = {
    onNext: (data: TopicData[]) => void;
    onPrevious: () => void;
}

function TopicsForm(props: TopicFromProps) {
    const [topicList, setTopicList] = useState<TopicData[]>([]);
    const textInput = useRef<any>();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);


    function TopicClick() {
        let topicText: string = textInput.current.value;
        if (topicText == null || topicText == "") {
         setIsEmpty(true);
         return;
        }
        setTopicList([...topicList, {
            Topic: topicText,
            SubTopicList: []
        }]);
        textInput.current.value = null;
    }

    function SubTopicClick() {
        let subText: string = textInput.current.value;

        setTopicList(produce(draft => {
            draft.at(-1)?.SubTopicList.push(subText);
        }))
        textInput.current.value = null;
    }


    function DeleteTopicClick(index: number) {
        setTopicList(produce(draft => {
            draft.splice(index, 1);
        }));
    }

    function DeleteSubTopicClick(topicIndex: number, subIndex: number) {
        setTopicList(produce(draft => {
            draft.at(topicIndex)?.SubTopicList.splice(subIndex, 1);
        }));
    }

    return <>

        
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 neon-text-cyan">
                Step 2: Topic List
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                Add titles and subtitles to structure your content.
            </p>

            {topicList.length > 0 ? (
                    <>
                        <div
                            key={"contentList"}
                            className="flex-1 space-y-2 bg-gray-900/30 rounded-lg p-2 sm:p-4 overflow-y-auto overflow-x-hidden"
                        >
                            {topicList.map((topic: TopicData, topicIndex: number) => (
                                <Fragment key={topicIndex}>
                                    <div
                                        key={"T" + topicIndex}
                                        className="flex items-center justify-between bg-gray-900/50 p-2 rounded-md animate-fade-in">
                                        <span className="font-bold text-lg text-cyan-400">{topic.Topic}</span>
                                        <button onClick={() => DeleteTopicClick(topicIndex)}
                                                className="text-pink-500/70 hover:text-pink-500 transition-colors p-2">
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </div>
                                    {topic.SubTopicList.map((subTopic: string, subIndex: number) => (
                                        <div
                                            key={"S" + subIndex}
                                            className="flex items-center justify-between bg-gray-900/50 p-2 rounded-md animate-fade-in">
                                            <span className="text-gray-300 pl-4">{subTopic}</span>
                                            <button onClick={() => DeleteSubTopicClick(topicIndex, subIndex)}
                                                    className="text-pink-500/70 hover:text-pink-500 transition-colors p-2">
                                                <FontAwesomeIcon icon={faTimes}/>
                                            </button>
                                        </div>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </>
                ) :
                <div
                    className={"flex-1 space-y-2 bg-gray-900/30 rounded-lg p-2 sm:p-4 overflow-y-auto"}>
                    <h1 className={"block justify-self-center mt-10.5"}>there is no topic</h1>
                </div>
            }
            <div
                className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <input
                    ref={textInput}
                    onInput={()=>setIsEmpty(false)}
                    type="text"
                    placeholder="Enter content..."
                    className={`w-full sm:flex-1 bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isEmpty ? "border-pink-500" : ""}`}
                />
                <div className="flex w-full sm:w-auto space-x-2 mt-2">
                    <button
                        onClick={TopicClick}
                        className="flex-1 sm:flex-none bg-cyan-500/80 text-white font-bold rounded-lg px-4 py-2 hover:bg-cyan-500 transition-colors neon-shadow-cyan"
                    >
                        Topic
                    </button>
                    <button
                        onClick={SubTopicClick}
                        {...topicList.length == 0 ? {disabled: true} : {disabled: false}}
                        className="flex-1 sm:flex-none bg-pink-500/80 disabled:bg-pink-800/80 text-white font-bold rounded-lg px-4 py-2 hover:bg-pink-500 transition-colors neon-shadow-pink"
                    >
                        SubTopic
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-3">
                <button
                    onClick={props.onPrevious}
                    type={"button"}
                    className="col-span-1 mt-4 sm:mt-6 bg-cyan-500 text-white font-bold rounded-4xl py-3 hover:bg-cyan-600 transition-colors duration-300 neon-shadow-cyan  disabled:bg-cyan-800"
                >
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <button
                    {...topicList.length == 0 ? {disabled: true} : {disabled: false}}
                    onClick={() => props.onNext(topicList)}
                    type={"button"}
                    className="col-span-5 mt-4 sm:mt-6 bg-cyan-500 text-white font-bold rounded-lg py-3 hover:bg-cyan-600 transition-colors duration-300 neon-shadow-cyan  disabled:bg-cyan-800">
                    Start Generating Pamphlet
                </button>
            </div>
       
        
      
    </>
}

export default TopicsForm;