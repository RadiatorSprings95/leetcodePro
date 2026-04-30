import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async() => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("Missing required env var: MONGO_URL");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("connected to MongoDB ", conn.connection.host);
    } catch (error) {
        console.error("error connecting to MongoDB", error instanceof Error ? error.message : error);
        throw error;

    }
}