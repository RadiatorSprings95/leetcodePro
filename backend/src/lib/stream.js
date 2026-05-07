import { StreamChat } from "stream-chat"
import { ENV } from "./env.js"
import { StreamClient } from "@stream-io/node-sdk"
const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // for stream chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // for video calls

export const upsertStreamUser = async(userData) => {
        await chatClient.upsertUser(userData)
        console.log("stream user upserted successfully:", userData);
}

export const deleteStreamUser = async(userId) => {
        await chatClient.deleteUsers([userId], {
            user: 'hard',
            messages: 'hard'
        });
        console.log("stream user deleted successfully:", userId);
}
