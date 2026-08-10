import mongoose from "mongoose";
import dns from "node:dns";
import { ENV } from "./env.js";

// Fix for Windows local DNS / ISP blocking MongoDB SRV records (querySrv ECONNREFUSED)
try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder("ipv4first");
    }
} catch (dnsErr) {
    console.warn("Could not set custom DNS servers:", dnsErr.message);
}

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