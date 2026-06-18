import { ArrowRightIcon, Code2Icon, CrownIcon, SparklesIcon, UsersIcon, ZapIcon, LoaderIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Link } from "react-router";
import { PROBLEMS } from "../data/problems";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
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
            
            {/* Header Section (Internal to the component) */}
            <div className="flex items-center justify-between border-b-4 border-base-content pb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <ZapIcon className="size-6 text-warning" />
                    Network Nodes
                </h3>
                <span className="font-mono font-bold px-3 py-1 bg-success/20 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
                    {sessions?.length || 0} ACTIVE
                </span>
            </div>

            {/* Sessions List */}
            <div className="flex flex-col gap-4">
                {isLoading ? (
                    
                    /* Brutalist Loading State */
                    <div className="p-8 border-4 border-base-content bg-base-200 text-center shadow-[6px_6px_0px_0px_currentColor] flex flex-col items-center justify-center gap-4">
                        <LoaderIcon className="size-8 animate-spin text-primary" />
                        <span className="font-mono font-bold uppercase animate-pulse">Scanning network...</span>
                    </div>

                ) : sessions?.length > 0 ? (
                    sessions.map(session => {
                        const isFull = Boolean(session.participant);
                        const canEnter = !isFull || isUserInSession?.(session);
                        const sessionCardContent = (
                            
                            <div className="border-4 border-base-content p-4 bg-base-100 flex flex-col md:flex-row md:items-center justify-between shadow-[6px_6px_0px_0px_currentColor] group-hover:translate-y-[2px] group-hover:translate-x-[2px] group-hover:shadow-[2px_2px_0px_0px_currentColor] transition-all gap-4">

                                {/* Left Side: Avatar and Info */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="relative bg-secondary/20 size-14 border-2 border-base-content flex items-center justify-center">
                                        <Code2Icon className="size-7 text-danger"/>
                                        
                                        {/* Status dot is now a square-ish pulsing border! */}
                                        <div className="absolute -top-2 -right-2 size-4 bg-success border-2 border-base-content animate-pulse"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase text-lg tracking-tight">
                                            {getProblemTitle(session.problem)} 
                                        </span>
                                        <span className="font-mono text-xs font-bold text-base-content/70 uppercase">
                                            Host: {session.host?.name || "Anonymous"}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Badges and Action */}
                                <div className="flex items-center gap-4 justify-between md:justify-end">
                                    
                                    {/* Participant Count */}
                                    <div className="flex items-center gap-2 border-2 border-base-content px-2 py-1 bg-base-200">
                                        <UsersIcon className="size-4" />
                                        <span className="font-mono font-bold">{session.participant ? "2/2" : "1/2"}</span>
                                    </div>

                                    {/* Difficulty Badge */}
                                    <span className={`px-3 py-1 font-mono text-xs font-bold border-2 border-base-content uppercase 
                                        ${session.difficulty === 'Easy' ? 'bg-success/50' : session.difficulty === 'Medium' ? 'bg-warning/50' : 'bg-error/50'}`}>
                                        {session.difficulty || "System"}
                                    </span>

                                    {/* Join Arrow */}
                                    <div className="bg-base-300 p-2 border-2 border-base-content group-hover:bg-primary group-hover:text-primary-content transition-colors">
                                        <ArrowRightIcon className="size-5" />
                                    </div>

                                </div>

                            </div>
                        );
                        return canEnter ? (
                            <Link key={session._id} to={`/session/${session._id}`} className="group block">
                                {sessionCardContent}
                            </Link>
                        ) : (
                            <div key={session._id} className="group block cursor-not-allowed opacity-50 grayscale"> 
                                {sessionCardContent}
                            </div>
                        );
                    })
                ) : (
                    
                    /* Brutalist Empty State */
                    <div className="p-8 border-4 border-base-content bg-base-200 text-center shadow-[6px_6px_0px_0px_currentColor]">
                        <span className="font-mono font-bold uppercase text-base-content/60">No active uplinks detected in the network.</span>
                    </div>

                )}
            </div>
        </div>
    )
}

export default ActiveSessions;
