import { useUser } from "@clerk/react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      
      {/* Left Side: Brutalist Greeting */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          
          {/* Brutalist Icon Box */}
          <div className="size-14 bg-primary border-4 border-base-content flex items-center justify-center shadow-[4px_4px_0px_0px_currentColor]">
            <SparklesIcon className="size-7 text-primary-content" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-base-content">
            Welcome back,<br/>
            {/* Tilted highlight tape effect */}
            <span className="bg-warning text-warning-content px-2 border-4 border-base-content inline-block mt-2 -rotate-2 shadow-[4px_4px_0px_0px_currentColor]">
              {user?.firstName || "Hacker"}!
            </span>
          </h1>
        </div>
        
        {/* Terminal-style subtitle */}
        <p className="font-mono font-bold text-base-content/80 text-sm md:text-base border-l-4 border-base-content pl-4 uppercase tracking-widest mt-6 bg-base-200 py-2 w-max">
          System Ready // Level up your logic circuits.
        </p>
      </div>

      {/* Right Side: Brutalist Action Button */}
      <button
        onClick={onCreateSession}
        className="group px-8 py-4 bg-accent text-accent-content border-4 border-base-content shadow-[8px_8px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[6px_6px_0px_0px_currentColor] active:translate-y-[8px] active:translate-x-[8px] active:shadow-none transition-all flex items-center gap-3 w-full md:w-auto justify-center"
      >
        <ZapIcon className="size-6 fill-current" />
        <span className="font-black uppercase text-xl tracking-wider">Create Session</span>
        <ArrowRightIcon className="size-6 group-hover:translate-x-2 transition-transform" />
      </button>
      
    </div>
  );
}

export default WelcomeSection;