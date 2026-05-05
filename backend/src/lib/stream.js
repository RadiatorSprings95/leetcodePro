import { StreamChat } from "stream-chat"
import { ENV } from "./env.js"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

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
// method to generate tokens