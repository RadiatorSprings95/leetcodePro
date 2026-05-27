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
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar/>
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel - problem Description*/}
          <Panel defaultSize={40} minSize={20}>
            <ProblemDescription
              problem={currentProblem}  
              currentProblemId={currentProblemId}
              onProblemChanged={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            /> 
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize"/>

          {/* right panel - code editor & Output*/}
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="vertical">
              {/* right Upper panel - code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditor
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>
              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize"/>

              {/* right Lower panel - Output */}
              <Panel defaultSize={30} minSize={30}>
                <CodeOutput output={output}/>
              </Panel>
            </PanelGroup>
             
          </Panel>
        </PanelGroup>

      </div>
    </div>
  )
}

export default ProblemPage
