import express from "express"
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, "../../frontend/dist");
const app = express();
// const __dirname = path.resolve();

app.get("/healthz",(req, res) =>{
    res.status(200).json({msg: "sucess a"});
});

app.get("/b",(req, res) =>{
    res.status(200).json({msg: "sucess b"});
});

// if(ENV.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));

//     app.get("*",(req, res) => {
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//     });
// }
if (ENV.NODE_ENV === "production") {
    app.use(express.static(frontendPath));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

const startServer = async() => {
    try {
    await connectDB();
    const port = ENV.PORT || 10000;
    app.listen(port, () => console.log(`server running at ${port}`));
    } catch (error) {
        console.error("error starting the server: ", error instanceof Error ? error.message : error)
    }
};

startServer();