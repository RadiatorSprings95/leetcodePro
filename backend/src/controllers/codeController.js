import { ENV } from "../lib/env.js"; 

const JDOODLE_API = "https://api.jdoodle.com/v1/execute";

// Map languages to JDoodle's expected format
const LANGUAGE_VERSIONS = {
  javascript: { language: "nodejs", versionIndex: "4" },
  python: { language: "python3", versionIndex: "4" },
  java: { language: "java", versionIndex: "4" },
};

export const executeCode = async (req, res) => {
  try {
    // We will expect the frontend to send 'language' and 'code' in the request body
    const { language, code } = req.body;
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return res.status(400).json({ 
        success: false, 
        error: `Unsupported language: ${language}` 
      });
    }

    // Call the JDoodle API
    const response = await fetch(JDOODLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: ENV.JDOODLE_CLIENT_ID,
        clientSecret: ENV.JDOODLE_CLIENT_SECRET,
        script: code,
        language: languageConfig.language,
        versionIndex: languageConfig.versionIndex
      }),
    });

    const data = await response.json();

    // JDoodle returns an error property if the API call fails (like invalid keys)
    if (data.error) {
      return res.status(400).json({ 
        success: false, 
        error: data.error 
      });
    }

    // Send the terminal output back to the frontend
    res.status(200).json({ 
      success: true, 
      output: data.output || "No output" 
    });

  } catch (error) {
    console.error("Error in executeCode controller:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error" 
    });
  }
};