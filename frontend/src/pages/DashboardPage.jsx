import { useNavigate } from "react-router"
import { useUser } from "@clerk/react"
import { useState } from "react"
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatCards from "../components/StatCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {

  const navigate = useNavigate();
  const {user} = useUser();
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: ""});

  const createSessionMutation = useCreateSession();

  const {data: activeSessionsData, isLoading:loadingActiveSessions} = useActiveSessions();
  const {data: recentSessionsData, isLoading:loadingRecentSessions} = useMyRecentSessions();

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  const handleCreateRoom = () => {
    if(!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setshowCreateModal(false);
          navigate(`/session/${data.session._id}`)
        },
      }
    );
  };
  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];
  return (
    <>
      <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary selection:text-primary-content">
        <Navbar />
        
        {/* Main Dashboard Container */}
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          
          {/* Welcome Section - Wrapped in a Brutalist Box */}
          <div className="border-4 border-base-content p-2 bg-secondary/10 shadow-[8px_8px_0px_0px_currentColor]">
            <div className="border-2 border-dashed border-base-content/50 p-6">
              <WelcomeSection onCreateSession={() => setshowCreateModal(true)} />
            </div>
          </div>

          {/* GRID: Stats (1 col) + Active Sessions (2 cols) */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: The Re-Added Stats Cards */}
            <StatCards 
                activeSessionsCount={activeSessions.length} 
                recentSessionsCount={recentSessions.length} 
            />

            {/* Right Column: Active Sessions Area */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-base-content inline-block pb-2 pr-8 shadow-[4px_4px_0px_0px_currentColor] bg-warning mb-4">
                Active Uplinks_
              </h2>
              <div className="border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] bg-base-200 h-[calc(100%-4rem)]">
                <ActiveSessions 
                    sessions={activeSessions} 
                    isLoading={loadingActiveSessions} 
                    isUserInSession={isUserInSession} 
                />
              </div>
            </div>
            
          </div>

          {/* Recent Sessions Area */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight border-b-4 border-base-content inline-block pb-2 pr-8 shadow-[4px_4px_0px_0px_currentColor] bg-primary text-primary-content mb-4 mt-8">
              Terminal History_
            </h2>
            <div className="border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] bg-base-200">
              <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
            </div>
          </div>

        </div>
      </div>

      {/* Keep your Create Session Modal */}
      {showCreateModal && (
        <CreateSessionModal
          isOpen={showCreateModal}
          onClose={() => setshowCreateModal(false)}
          roomConfig={roomConfig}
          setRoomConfig={setRoomConfig}
          onCreateRoom={handleCreateRoom}
          isCreating={createSessionMutation.isPending}
        />
      )}
    </>
  );


  
}

export default DashboardPage
