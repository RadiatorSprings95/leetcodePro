import 'stream-chat-react/dist/css/index.css';
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { StreamTheme, CallControls,CallingState, SpeakerLayout, useCallStateHooks, CancelCallButton } from "@stream-io/video-react-sdk";
import { Loader2Icon, MessagesSquareIcon, PhoneOffIcon, UsersIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import * as StreamChatReact from "stream-chat-react";

const Chat = StreamChatReact.Chat || StreamChatReact.default?.Chat;
const Channel = StreamChatReact.Channel || StreamChatReact.default?.Channel;
// FIXED: Removed the 's' from MessageComposers here!
const MessageComposer = StreamChatReact.MessageComposer || StreamChatReact.default?.MessageComposer;
const MessageList = StreamChatReact.MessageList || StreamChatReact.default?.MessageList;
const Thread = StreamChatReact.Thread || StreamChatReact.default?.Thread;
const Window = StreamChatReact.Window || StreamChatReact.default?.Window;

function VideoCallUI({ chatClient, channel, isHost, onEndSession }) {
    const navigate = useNavigate();
    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();
    const [ isChatOpen, setIsChatOpen ] = useState(false);

    // 1. Brutalist Loading State
    if (callingState !== CallingState.JOINED) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-base-100 border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor]">
                <Loader2Icon className="size-12 animate-spin text-primary mb-4" />
                <p className="font-mono font-bold text-lg uppercase animate-pulse">Initializing Secure Uplink...</p>
            </div>
        );
    }

    return (
        <div className='h-full flex gap-4 relative str-video text-base-content'>
            <div className='flex-1 flex flex-col gap-4'>

                {/* 2. Brutalist Top Bar: Participants & Chat Toggle */}
                <div className='flex items-center justify-between border-4 border-base-content p-3 shadow-[4px_4px_0px_0px_currentColor] bg-base-100'>
                    <div className='flex items-center gap-3 font-mono font-bold uppercase'>
                        <div className="bg-primary/20 p-2 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor]">
                            <UsersIcon className='size-5 text-primary'/>
                        </div>
                        <span className="tracking-widest">
                            {participantCount} {participantCount === 1 ? "participant" : "participant"} Connected
                        </span>
                    </div>
                    
                    {chatClient && channel && (
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`flex items-center gap-2 px-4 py-2 border-2 border-base-content font-mono font-bold uppercase transition-all shadow-[2px_2px_0px_0px_currentColor] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none
                                ${isChatOpen ? "bg-primary text-primary-content" : "bg-base-200 hover:bg-base-300"}`}
                            title={isChatOpen ? "Hide Chat" : "Show Chat"}
                        >
                            <MessagesSquareIcon className='size-4'/>
                            {isChatOpen ? "Close Comm_Link" : "Open Comm_Link"}
                        </button>
                    )}
                </div>

                {/* 3. Brutalist Video Stream Area */}
                <div className='flex-1 border-4 border-base-content shadow-[8px_8px_0px_0px_currentColor] bg-base-300 overflow-hidden relative'>
                    
                    <SpeakerLayout/>
                </div>

                {/* 4. Brutalist Call Controls */}
                <div className='border-4 border-base-content p-3 shadow-[4px_4px_0px_0px_currentColor] bg-base-100 flex items-center justify-center gap-4'>
                    <CallControls />
                    {isHost ? (
                        // HOST SEES THIS: A custom button that triggers your database mutation to end the session
                        <button
                            onClick={onEndSession}
                            className="flex items-center gap-2 bg-error text-error-content px-4 py-2 border-2 border-base-content font-black uppercase shadow-[2px_2px_0px_0px_currentColor] hover:translate-y-1px hover:translate-x-1px hover:shadow-none transition-all"
                        >
                            <PhoneOffIcon className="size-5" />
                            End Call
                        </button>
                    ) : (
                        // PARTICIPANT SEES THIS: The standard SDK button to just leave the room silently
                        <div className="border-2 border-error bg-error/20 shadow-[2px_2px_0px_0px_currentColor] hover:translate-y-1px hover:translate-x-1px hover:shadow-none transition-all">
                            <CancelCallButton onLeave={() => navigate("/dashboard")} />
                        </div>
                    )}
                </div>

            </div>

            {/* 5. Brutalist Chat Section */}
            {chatClient && channel && (
                <div
                    className={`flex flex-col border-base-content overflow-hidden bg-base-200 transition-all duration-300 ease-in-out
                    ${isChatOpen ? "w-96 border-4 shadow-[8px_8px_0px_0px_currentColor] opacity-100 ml-2" : "w-0 border-0 opacity-0"}`}
                >
                    {isChatOpen && (
                        <>
                            <div className="bg-secondary text-secondary-content p-3 border-b-4 border-base-content flex items-center justify-between font-mono uppercase font-bold tracking-widest">
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="hover:text-error transition-colors border-2 border-transparent hover:border-current p-1 bg-base-100/20"
                                    title="Close chat"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden stream-chat-dark flex flex-col bg-base-100">
                                <Chat client={chatClient} theme="str-chat__theme-dark">
                                    <Channel channel={channel}>
                                        <Window>
                                            <MessageList />
                                            <MessageComposer />
                                        </Window>
                                        <Thread />
                                    </Channel>
                                </Chat>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default VideoCallUI;
