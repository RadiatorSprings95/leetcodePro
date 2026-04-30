import express from "express"
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

app.get("/healthz",(req, res) =>{
    res.status(200).json({msg: "sucess a"});
});

app.get("/b",(req, res) =>{
    res.status(200).json({msg: "sucess b"});
});

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}


const startServer = async() => {
    try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log(`server running at ${ENV.PORT}`));
    } catch (error) {
        console.error("error starting the server: ", error)
    }
}

startServer();