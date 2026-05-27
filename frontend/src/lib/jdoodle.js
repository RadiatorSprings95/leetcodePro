export async function executeCode(language, code) {
  try {
    // Change the URL to point to your Express backend route
    const response = await fetch("http://localhost:5001/api/code/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the language and the code exactly as your codeController expects
      body: JSON.stringify({ language, code }),
    });

    const data = await response.json();
    
    // This will return the { success: true, output: "..." } format you already set up
    return data; 
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}