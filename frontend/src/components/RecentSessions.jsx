import { Code2, Clock, Users, Trophy, LoaderIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";
import { PROBLEMS } from "../data/problems";

function RecentSessions({ sessions, isLoading }) {
    const getProblemTitle = (problemKey) => {
        if (!problemKey) return "Unknown Terminal";
        
        // Try direct ID lookup first
        if (PROBLEMS[problemKey]) return PROBLEMS[problemKey].title;
        
        // Fallback: Check if the string itself is already the title
        const found = Object.values(PROBLEMS).find(p => p.title === problemKey || p.id === problemKey);
        return found ? found.title : "Unknown Terminal";
    };
  return (
    <div className="h-full flex flex-col gap-6">

        {/* Header Section */}
        <div className="flex items-center justify-between border-b-4 border-base-content pb-4">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                <Clock className="size-6 text-primary" />
                Operation Log
            </h3>
            <span className="font-mono font-bold px-3 py-1 bg-primary/20 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
                {sessions?.length || 0} RECORDS
            </span>
        </div>

        {/* Sessions List */}
        <div className="flex flex-col gap-4">
            {isLoading ? (
                
                /* Brutalist Loading State */
                <div className="p-8 border-4 border-base-content bg-base-200 text-center shadow-[6px_6px_0px_0px_currentColor] flex flex-col items-center justify-center gap-4">
                    <LoaderIcon className="size-8 animate-spin text-primary" />
                    <span className="font-mono font-bold uppercase animate-pulse">Decrypting history...</span>
                </div>

            ) : sessions?.length > 0 ? (
                sessions.map(session => (
                    /* Brutalist Session Box */
                    <div key={session._id} className="border-4 border-base-content p-4 bg-base-100 flex flex-col md:flex-row md:items-center justify-between shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_0px_currentColor] transition-all gap-4">

                        {/* Left Side: Icon and Info */}
                        <div className="flex items-center gap-4 flex-1">
                            <div className="bg-primary/20 size-12 border-2 border-base-content flex items-center justify-center shadow-[2px_2px_0px_0px_currentColor]">
                                <Code2 className="size-6 text-primary"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black uppercase text-lg tracking-tight">
                                    {getProblemTitle(session.problem)}
                                </span>
                                <span className="font-mono text-xs font-bold text-base-content/70 uppercase">
                                    {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Badges */}
                        <div className="flex items-center gap-4 justify-between md:justify-end">
                            {/* Session Status Box */}
                            <div className="flex items-center gap-2 border-2 border-base-content px-2 py-1 bg-base-200">
                                <Trophy className="size-4" />
                                <span className="font-mono font-bold whitespace-nowrap">Concluded</span>
                            </div>

                            {/* Difficulty Badge */}
                            <span className={`px-3 py-1 font-mono text-xs font-bold border-2 border-base-content uppercase 
                                ${session.difficulty === 'Easy' ? 'bg-success/50' : session.difficulty === 'Medium' ? 'bg-warning/50' : 'bg-error/50'}`}>
                                {session.difficulty || "System"}
                            </span>
                        </div>

                    </div>
                ))
            ) : (
                
                /* Brutalist Empty State */
                <div className="p-8 border-4 border-base-content bg-base-200 text-center shadow-[6px_6px_0px_0px_currentColor]">
                    <span className="font-mono font-bold uppercase text-base-content/60">No historical data found in the mainframe.</span>
                </div>

            )}
        </div>
    </div>
  );
}

export default RecentSessions;