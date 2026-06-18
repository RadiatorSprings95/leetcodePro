import { Code2Icon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) {
    if (!isOpen) return null;

    const problems = Object.values(PROBLEMS);

    return (
        // Dark, blurred backdrop
        <div className="fixed inset-0 bg-base-300/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans text-base-content selection:bg-primary selection:text-primary-content">
            
            {/* Brutalist Modal Box */}
            <div className="w-full max-w-md bg-base-100 border-4 border-base-content shadow-[16px_16px_0px_0px_currentColor] overflow-hidden">

                {/* Brutalist Header Bar */}
                <div className="bg-warning text-warning-content border-b-4 border-base-content px-4 py-3 flex items-center justify-between font-mono font-black uppercase tracking-widest shadow-sm">
                    <span className="flex items-center gap-2">
                        <Code2Icon className="size-6" />
                        Initialize a Call
                    </span>
                    <button
                        onClick={onClose}
                        className="hover:bg-error hover:text-error-content border-2 border-transparent hover:border-current p-1 transition-colors"
                        title="Abort Initialization"
                    >
                        <XIcon className="size-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-8 bg-base-100">

                    {/* Problem Selection */}
                    <div className="space-y-3">
                        <label className="inline-block font-black uppercase text-sm tracking-tight border-b-4 border-base-content pb-1 pr-4">
                            Target_Algorithm
                        </label>
                        <select
                            value={roomConfig.problem}
                            onChange={(e) => { 
                                const selectedID = e.target.value;
                                setRoomConfig({
                                    ...roomConfig,
                                    problem: selectedID,
                                    difficulty: PROBLEMS[selectedID].difficulty
                                });
                            }}
                            className="w-full bg-base-200 border-4 border-base-content font-mono font-bold px-4 py-4 shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] transition-all outline-none cursor-pointer appearance-none text-base"
                        >
                            <option value="" disabled>Select A Problem...</option>
                            {problems.map((p) => (
                                <option key={p.id} value={p.id} className="font-bold">{p.title} - {p.difficulty}</option>
                            ))}
                        </select>
                    </div>

                    

                </div>

                {/* Brutalist Footer Actions */}
                <div className="bg-base-200 border-t-4 border-base-content p-6 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-base-100 border-4 border-base-content font-black uppercase py-4 shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] active:translate-y-1.5 active:translate-x-1.5 active:shadow-none transition-all text-lg"
                    >
                        Abort
                    </button>
                    
                    <button
                        onClick={onCreateRoom}
                        disabled={isCreating || !roomConfig.problem}
                        className={`flex-1 flex items-center justify-center gap-2 border-4 border-base-content font-black uppercase py-4 transition-all text-lg
                            ${isCreating || !roomConfig.problem
                                ? "bg-base-300 text-base-content/50 shadow-none translate-y-1.5 translate-x-1.5 cursor-not-allowed"
                                : "bg-primary text-primary-content shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] active:translate-y-1.5 active:translate-x-1.5 active:shadow-none"
                            }`}
                    >
                        {isCreating ? (
                            <>
                                <Loader2Icon className="size-6 animate-spin" />
                                Booting...
                            </>
                        ) : (
                            <>
                                <PlusIcon className="size-6 font-bold stroke-1" />
                                Launch
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateSessionModal;
