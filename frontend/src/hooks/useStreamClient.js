import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient( session, loadingSession, isHost, isParticipant) {
    const [ streamClient, setStreamClient ] = useState(null);
    const [ call, setCall ] = useState(null);
    const [ chatClient, setChatClient ] = useState(null);
    const [ channel, setChannel ] = useState(null);
    const [ isInitializingCall, setIsInitializingCall] = useState(true);

    useEffect(() => {
        let ignore = false;
        let videoCall = null;
        let chatClientInstance = null;

        const initCall = async () => {
            if (!session?.callId) return;
            if (!isHost && !isParticipant) return;
            if (session.status === "completed") return;
            try {
                const { token, userId, userName, userImage } = await sessionApi.getStreamToken()
                
                if (ignore) return;

                const client = await initializeStreamClient({
                    id: userId,
                    name: userName,
                    image: userImage,
                    },
                    token
                );

                if (ignore) return;
                setStreamClient(client);

                videoCall = client.call("default", session.callId);
                await videoCall.join({ create: true });
                
                if (ignore) return;
                setCall(videoCall);

                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                chatClientInstance = StreamChat.getInstance(apiKey);

                if (!chatClientInstance.userID) {
                    await chatClientInstance.connectUser({
                        id: userId,
                        name: userName,
                        image: userImage,
                        },
                        token
                    );
                }
                
                if (ignore) return;
                setChatClient(chatClientInstance);

                const chatChannel = chatClientInstance.channel("messaging", session.callId);
                await chatChannel.watch();
                
                if (ignore) return;
                setChannel(chatChannel);

            } catch (error) {
                if (!ignore) {
                    toast.error("Failed to join voice call");
                    console.error("Erroe init call", error);
                }

            }finally{
                if (!ignore) setIsInitializingCall(false)
            }
        };
        if (session && !loadingSession) initCall();

        // cleanup - performance
        return () => {
            ignore = true;
            // iife
            (async () => {
                try{
                    if (videoCall) {
                        try {
                            await videoCall.leave();
                        } catch (leaveErr) {
                            if (!leaveErr.message?.includes("already been left")){
                                console.error("Error leaving call :", leaveErr);
                            }
                        }
                    }
                    if (chatClientInstance && chatClientInstance.userID) {
                        await chatClientInstance.disconnectUser();
                    }
                    await disconnectStreamClient();
                }catch (error){
                    console.error("Cleanup error: ", error);
                }
            })();
        };
    }, [session, loadingSession, isHost, isParticipant]);
    
    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    };
}

export default useStreamClient;
