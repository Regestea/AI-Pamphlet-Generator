type StepButtonProps = {
    children: string;
    disable?: boolean;
    onButtonClick: () => void;
};

function StepButton({ children, disable = false, onButtonClick }: StepButtonProps) {
    return (
        <button
            disabled={disable}
            onClick={onButtonClick}
            className="w-full mt-4 sm:mt-6 bg-cyan-500 text-white font-bold rounded-lg py-3 hover:bg-cyan-600 transition-colors duration-300 neon-shadow-cyan"
        >
            {children}
        </button>
    );
}

export default StepButton;
