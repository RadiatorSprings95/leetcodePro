import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import {Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import CodeOutput from "../components/CodeOutput";
import CodeEditor from "../components/CodeEditor";
import { executeCode } from "../lib/jdoodle";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ currentProblemId, setCurrentProblemId ] = useState("two-sum");
  const [ selectedLanguage, setSelectedLanguage ] = useState("javascript");
  const [ code, setCode ] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [ output, setOutput ] = useState(null);
  const [ isRunning, setIsRunning ] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];
  // if (!currentProblem) return <div>Loading...</div>;

  useEffect(() => {
    if (id && PROBLEMS[id]){
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    } else if (id){
      navigate("/problems", {replace: true});
    }
  }, [id, selectedLanguage, navigate]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    setSelectedLanguage(newLang)
    setCode(currentProblem.starterCode[newLang])
    setOutput(null);  
  }
  const handleProblemChange = (newProblemID) => navigate(`/problem/${newProblemID}`);

  const triggerConfetti= () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x:0.2, y: 0.6},
    });
    
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x:0.8, y: 0.6},
    });
  }

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };
  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null)

    const result = await executeCode(selectedLanguage, code)
    setOutput(result)
    setIsRunning(false)
    
    // check if code executed successfully and matches output
    if(result.success){
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
      const testsPassed = checkIfTestsPassed(result.output, expectedOutput)
      
      if(testsPassed){
        triggerConfetti();
        toast.success("passed all testcases")
      }else{
        toast.error("failed at testcases")
      }
    }else{
      toast.error("fix the code!")
    }  
    
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col font-sans text-base-content selection:bg-primary selection:text-primary-content overflow-hidden">
      <Navbar />

      {/* Brutalist System Status Bar */}
      <div className="bg-warning border-b-4 border-base-content px-6 py-2 flex items-center justify-between font-mono font-bold text-sm uppercase tracking-widest shadow-md z-10">
        <span className="flex items-center gap-2">
           <span className="size-3 bg-error border-2 border-base-content rounded-full animate-pulse"></span>
           Problem // {currentProblemId}
        </span>
        <span>Compiler: Online</span>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden p-4 lg:p-6">
        <div className="h-full border-4 border-base-content shadow-[12px_12px_0px_0px_currentColor] bg-base-100 overflow-hidden">
          
          <PanelGroup direction="horizontal">
            
            {/* Left Panel - Problem Description */}
            <Panel defaultSize={40} minSize={20} className="flex flex-col bg-base-100">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChanged={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </Panel>

            {/* Brutalist Resize Handle */}
            <PanelResizeHandle className="w-4 bg-base-300 border-x-4 border-base-content cursor-col-resize flex items-center justify-center hover:bg-secondary transition-colors group">
              <div className="h-12 w-1 bg-base-content/30 group-hover:bg-base-content rounded-full transition-colors" />
            </PanelResizeHandle>

            {/* Right Panel - Code Editor and Output */}
            <Panel defaultSize={60} className="flex flex-col bg-base-100">
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Editor Container */}
                <div className="flex-1 overflow-hidden">
                  <CodeEditor
                    selectedLanguage={selectedLanguage}
                    code={code}
                    setCode={setCode}
                    onLanguageChange={handleLanguageChange}
                    onRunCode={handleRunCode}
                    isRunning={isRunning}
                  />
                </div>

                {/* Brutalist Output Divider */}
                <div className="border-t-4 border-base-content flex flex-col h-1/3 min-h-[200px]">
                  <div className="bg-base-300 border-b-4 border-base-content px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="size-2 bg-success rounded-full"></span> Standard Output
                  </div>
                  <div className="flex-1 overflow-auto bg-base-100">
                    <CodeOutput
                      output={output}
                      isRunning={isRunning}
                    />
                  </div>
                </div>

              </div>
            </Panel>

          </PanelGroup>
        </div>
      </div>
    </div>
  );

}

export default ProblemPage
