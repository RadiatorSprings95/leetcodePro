import { useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useNavigate, useParams } from "react-router";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import { StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { isLocalAudioAttachment } from "stream-chat";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/jdoodle";
import { getDifficultyBadgeClass } from "../lib/utils";
import CodeEditor from "../components/CodeEditor";
import CodeOutput from "../components/CodeOutput";
import VideoCallUI from "../components/VideoCallUI";
import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";


import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import useStreamClient from "../hooks/useStreamClient";

function SessionPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [ output, setOutput ] = useState(null);
    const [ isRunning, setIsRunning ] = useState(false);

    const {data: sessionData, isLoading:loadingSession, refetch }= useSessionById(id)
    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    const session = sessionData?.session;
    const isHost = session?.host?.clerkId === user?.id;
    const isParticipant = session?.participant?.clerkId === user?.id;

    const { call, channel, chatClient, isInitializingCall, streamClient} = useStreamClient(session, loadingSession, isHost, isParticipant);

    // const problemData = session?.problem 
    //     ? PROBLEMS[session.problem] 
    //     : null;
    const problemData = (() => {
        if (!session?.problem) return null;
        
        // 1. Try the fast direct ID lookup first (e.g., "reverse-string")
        if (PROBLEMS[session.problem]) {
            return PROBLEMS[session.problem];
        }
        
        // 2. If that fails, search the titles just in case the DB saved "Reverse String"
        return Object.values(PROBLEMS).find(
            (p) => p.title === session.problem || p.id === session.problem
        ) || null;
    })();

    const [ selectedLanguage, setSelectedLanguage ] = useState("javascript");
    const [ code, setCode ] = useState(problemData?.starterCode?.[selectedLanguage] || "");

    // ? auto-join session if user is not already a participant and not the host
    useEffect(() => {
        if(!session || !user || loadingSession) return;
        if(isHost || isParticipant) return;

        joinSessionMutation.mutate(id, { onSuccess: refetch });
    }, [session, user, loadingSession, isHost, isParticipant, id]);

    // ?redirect the "participant" when session ends
    useEffect(() => {
        if(!session || loadingSession) return;

        if(session.status === "completed") navigate("/dashboard")
    },[session, loadingSession, navigate])

    // ? update code when problem loads or changes
    useEffect(() => {
        if (problemData?.starterCode?.[selectedLanguage]) {
            setCode(problemData.starterCode[selectedLanguage]);
        }
    }, [problemData, selectedLanguage]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        // * use problem-specific starter code
        const starterCode = problemData?.starterCode?.[newLang] || "";
        setCode(starterCode);
        setOutput(null);
    }

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const normalizeOutput = (outputStr) => {
        return outputStr
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);
        return normalizedActual == normalizedExpected;
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);

        if (result.success) {
            const expectedOutput = problemData?.expectedOutput?.[selectedLanguage];
            if (expectedOutput) {
                const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
                if (testsPassed) {
                    triggerConfetti();
                    toast.success("passed all testcases");
                } else {
                    toast.error("failed at testcases");
                }
            } else {
                toast.success("code executed successfully");
            }
        } else {
            toast.error("fix the code!");
        }
    };

    const handleEndSession = () => {
        if(confirm("Are you sure you want to end the session? All the participants will be informed.")){
            // ? this will only navigate the host to the dashboard
            endSessionMutation.mutate(id, {onSuccess: () => navigate("/dashboard")})
        }
    }
    

  return (
    <div className="h-screen bg-base-200 flex flex-col font-sans text-base-content selection:bg-primary selection:text-primary-content overflow-hidden">
        <Navbar/>

        {/* Brutalist System Status Bar */}
        <div className="bg-info text-info-content border-b-4 border-base-content px-6 py-2 flex items-center justify-between font-mono font-bold text-sm uppercase tracking-widest shadow-md z-10">
            <span className="flex items-center gap-2">
                <span className="size-3 bg-error border-2 border-base-content rounded-full animate-pulse"></span>
                Live Session // Uplink Active
            </span>
            <span className="flex items-center gap-4">
                <span>Terminal: Syncing...</span>
            </span>
        </div>

        {/* Main Workspace Container */}
        <div className="flex-1 overflow-hidden p-4 lg:p-6">
            <div className="h-full border-4 border-base-content shadow-[12px_12px_0px_0px_currentColor] bg-base-100 overflow-hidden">
                <PanelGroup direction="horizontal">
                    
                    {/* Left Panel - Video Call & Chat UI */}
                    <Panel defaultSize={35} minSize={20} className="flex flex-col border-r-4 border-base-content bg-base-200 relative">
                        <div className="bg-secondary text-secondary-content border-b-4 border-base-content px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            Comms_Link
                        </div>
                        <div className="flex-1 overflow-hidden">
                                {/* FIX #2: Safely check for 'client', not 'videoClient' */}
                                {streamClient && call ? (
                                    <StreamVideo client={streamClient}>
                                        <StreamCall call={call}>
                                            <VideoCallUI 
                                                chatClient={chatClient} 
                                                channel={channel} 
                                                isHost={isHost}
                                                onEndSession={handleEndSession}
                                            />
                                        </StreamCall>
                                    </StreamVideo>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full bg-base-100 border-4 border-base-content p-6">
                                        <Loader2Icon className="size-12 animate-spin text-primary mb-4" />
                                        <span className="font-mono font-bold uppercase animate-pulse">Initializing Terminal...</span>
                                    </div>
                                )}
                            </div>
                    </Panel>

                    {/* Brutalist Resize Handle */}
                    <PanelResizeHandle className="w-4 bg-warning border-r-4 border-base-content cursor-col-resize flex items-center justify-center hover:bg-warning/80 transition-colors group">
                        <div className="h-12 w-1 bg-base-content/30 group-hover:bg-base-content rounded-full transition-colors" />
                    </PanelResizeHandle>

                    {/* Right Panel - Code Editor & Output */}
                    <Panel defaultSize={65} minSize={30} className="flex flex-col bg-base-100">
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={60} minSize={10} className="overflow-auto bg-base-100">
                                {/* Problem DESC Body */}
                                {problemData ? (
                                    <ProblemDescription 
                                        problem={problemData} 
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-base-content/50 font-mono">
                                        Awaiting problem data...
                                    </div>
                                )}
                            </Panel>

                            <PanelResizeHandle className="w-full bg-warning border-r-4 border-base-content cursor-col-resize flex items-center justify-center hover:bg-warning/80 transition-colors py-1 group">
                                <div className="h-1 w-8 bg-base-content/30 group-hover:bg-base-content rounded-full transition-colors" />
                            </PanelResizeHandle>
                            <Panel defaultSize={40} minSize={30} className="flex flex-col h-full">
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    
                                    {/* Editor Header */}
                                    <div className="bg-base-300 border-b-4 border-base-content px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        IDE_Terminal
                                    </div>
                                    
                                    {/* Editor Area */}
                                    <div className="flex-1 overflow-hidden">
                                        <CodeEditor 
                                            // Make sure your session props are passed down correctly here!
                                            selectedLanguage={selectedLanguage}
                                            code={code}
                                            isRunning={isRunning}
                                            onLanguageChange={handleLanguageChange}
                                            onCodeChange={setCode}
                                            onRunCode={handleRunCode}
                                            />
                                    </div>

                                    {/* Brutalist Output Divider */}
                                    <div className="border-t-4 border-base-content flex flex-col h-1/3 min-h-50p">
                                        <div className="bg-base-300 border-b-4 border-base-content px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <span className="size-2 bg-success rounded-full animate-pulse"></span> Standard Output
                                        </div>
                                        <div className="flex-1 overflow-auto bg-base-100">
                                            <CodeOutput 
                                                output={output}
                                                isRunning={isRunning}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    </div>
  )

}

export default SessionPage
