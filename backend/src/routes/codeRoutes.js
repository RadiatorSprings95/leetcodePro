import express from "express";
import { executeCode } from "../controllers/codeController.js";
// You can also import 'protectRoute' from your middleware here if you want to restrict this to logged-in users only!

const router = express.Router();

// This sets up a POST request endpoint
router.post("/execute", executeCode);

export default router;