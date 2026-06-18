import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
      
      {/* Brutalist Active Count */}
      <div className="bg-success/20 border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
        <div className="flex items-center justify-between mb-4 border-b-4 border-base-content/20 pb-4">
          <div className="p-3 bg-base-100 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
            <UsersIcon className="size-8 text-success" />
          </div>
          <div className="font-mono font-black uppercase tracking-widest text-xs bg-success text-success-content px-3 py-1 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
            Live_Nodes
          </div>
        </div>
        <div className="text-6xl font-black font-mono tracking-tighter mb-2">{activeSessionsCount || 0}</div>
        <div className="font-bold uppercase tracking-widest text-sm text-base-content/70">Active Sessions</div>
      </div>

      {/* Brutalist Recent Count */}
      <div className="bg-primary/20 border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
        <div className="flex items-center justify-between mb-4 border-b-4 border-base-content/20 pb-4">
          <div className="p-3 bg-base-100 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
            <TrophyIcon className="size-8 text-primary" />
          </div>
          <div className="font-mono font-black uppercase tracking-widest text-xs bg-base-200 px-3 py-1 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
            Resolved
          </div>
        </div>
        <div className="text-6xl font-black font-mono tracking-tighter mb-2">{recentSessionsCount || 0}</div>
        <div className="font-bold uppercase tracking-widest text-sm text-base-content/70">Completed Sessions</div>
      </div>

    </div>
  );
}

export default StatsCards;