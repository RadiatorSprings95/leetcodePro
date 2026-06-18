function CodeOutput({ output, isRunning }) {
  const isActuallyError = output?.output?.includes("SyntaxError") || 
                          output?.output?.includes("ReferenceError") || 
                          output?.output?.includes("Exception") ||
                          output?.error; // fallback if error field exists
  return (
    <div className="h-full bg-base-300 font-mono text-sm p-4 md:p-6 overflow-auto flex flex-col selection:bg-base-content selection:text-base-100">
      
      {isRunning ? (
        // Brutalist Loading State
        <div className="flex items-center gap-3 text-warning font-bold uppercase animate-pulse">
          <span className="size-3 bg-warning border-2 border-warning-content rounded-full"></span>
          <span>Executing_Process...</span>
        </div>

      ) : output === null ? (
        // Brutalist Empty State
        <div className="text-base-content/50 uppercase font-bold tracking-wider leading-relaxed">
          <span className="text-primary">{">"}</span> SYSTEM STANDBY_<br/>
          <span className="text-primary">{">"}</span> AWAITING COMPILE DIRECTIVE...
        </div>

      ) : (output.success && !isActuallyError) ? (
        // Brutalist Success State
        <div className="text-success font-bold whitespace-pre-wrap leading-relaxed">
          <div className="uppercase tracking-widest mb-4 pb-2 border-b-2 border-success/30 inline-block">
            {">"} Compile_Success_
          </div>
          <br/>
          {output.output}
        </div>

      ) : (
        // Brutalist Error State
        <div className="text-error font-bold whitespace-pre-wrap leading-relaxed">
          <div className="uppercase tracking-widest mb-4 pb-2 border-b-2 border-error/30 inline-block">
            {">"} Fatal_Error_
          </div>
          <br/>
          {output.output && (
            <>
              {output.output}
              <br/>
            </>
          )}
          {output.error}
        </div>
      )}
      
    </div>
  );
}

export default CodeOutput;
