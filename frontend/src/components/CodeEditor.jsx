import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditor({ selectedLanguage, code, isRunning, onLanguageChange, onCodeChange, onRunCode }) {
  return (
    <div className="h-full bg-base-100 flex flex-col font-sans">
      
      {/* Brutalist Editor Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-200 border-b-4 border-base-content z-10">
        
        <div className="flex items-center gap-4">
          {/* Language Icon Box */}
          <div className="bg-base-100 border-2 border-base-content p-1.5 shadow-[2px_2px_0px_0px_currentColor]">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="size-6"
            />
          </div>

          {/* Brutalist Select Dropdown */}
          <select 
            className="bg-base-100 border-2 border-base-content font-mono font-bold uppercase text-sm px-3 py-2 shadow-[2px_2px_0px_0px_currentColor] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_currentColor] transition-all outline-none cursor-pointer"
            value={selectedLanguage} 
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="font-mono font-bold">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brutalist Execute Button */}
        <button 
            className={`flex items-center gap-2 border-2 border-base-content font-mono font-black uppercase tracking-wider text-sm transition-all px-6 py-2
            ${isRunning 
                ? "bg-base-300 text-base-content/50 shadow-none translate-y-[4px] translate-x-[4px] cursor-not-allowed" 
                : "bg-success text-success-content shadow-[4px_4px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
            }`}
            disabled={isRunning} 
            onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin"/>
              Executing...
            </>
          ) : (
            <>
              <PlayIcon className="size-4 fill-current"/>
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Code Editor Workspace */}
      <div className="flex-1 overflow-hidden bg-base-300">
         {/* The Monaco Editor */}
         <Editor
            height="100%"
            language={selectedLanguage}
            value={code}
            onChange={onCodeChange}
            theme="vs-dark" /* You can keep your existing theme here! */
            options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: '"Fira Code", monospace',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
            }}
         />
      </div>
    </div>
  )
}

export default CodeEditor;
