import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChanged, allProblems }) {
  return (
    <div className="h-full overflow-y-auto bg-base-100 font-sans selection:bg-primary selection:text-primary-content">
      
      {/* Brutalist Header Section (Title, Badge, Category) */}
      <div className="p-6 bg-base-200 border-b-4 border-base-content relative">

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none inline-block">
                {problem.title}
            </h1>
            
            {/* Brutalist Difficulty Badge */}
            <span className={`px-3 py-1 font-mono text-sm font-bold border-2 border-base-content uppercase shadow-[2px_2px_0px_0px_currentColor] ml-4 whitespace-nowrap
                ${problem.difficulty === 'Easy' ? 'bg-success/50' : problem.difficulty === 'Medium' ? 'bg-warning/50' : 'bg-error/50'}`}>
              {problem.difficulty}
            </span>
          </div>
          
          {/* Brutalist Category Tag */}
          <div className="inline-block bg-primary text-primary-content font-mono text-xs font-bold px-2 py-1 border-2 border-base-content shadow-[2px_2px_0px_0px_currentColor] w-max uppercase mt-2">
            Category // {problem.category}
          </div>
        </div>
      </div>

      {/* Problem Content Area (Text, Examples, Constraints, Notes) */}
      <div className="p-6 space-y-8 text-base-content/90 font-medium text-lg leading-relaxed">
          
          {/* 1. Main Problem Text */}
          <div className="prose prose-lg max-w-none">
             <p className="font-mono text-sm leading-loose whitespace-pre-wrap">
                {problem.description?.text || "Mission briefing data loaded successfully..."}
             </p>
          </div>

          {/* 4. Brutalist Notes Section */}
          {problem.description?.notes && (
             <div className="mt-8 bg-warning/20 border-4 border-warning p-5 shadow-[6px_6px_0px_0px_currentColor]">
                 <span className="font-black uppercase text-warning text-sm tracking-widest mb-3 block border-b-4 border-warning/50 pb-2">
                     System_Note //
                 </span>
                 <p className="font-mono text-sm m-0 text-base-content/80 font-bold leading-relaxed">
                     {problem.description.notes}
                 </p>
             </div>
          )}
          {/* 2. Brutalist Examples Section */}
          {problem.examples && problem.examples.length > 0 && (
             <div className="space-y-6 mt-8">
                 <h3 className="text-xl font-black uppercase tracking-tight border-b-4 border-base-content inline-block pb-1 shadow-[2px_2px_0px_0px_currentColor] bg-primary text-primary-content">
                     Examples //
                 </h3>
                 
                 {problem.examples.map((example, index) => (
                     <div key={index} className="bg-base-200 border-4 border-base-content p-4 shadow-[6px_6px_0px_0px_currentColor]">
                         <span className="font-black uppercase text-xs tracking-widest mb-3 block border-b-2 border-base-content/20 pb-1 text-base-content/60">
                             Example_{index + 1}
                         </span>
                         <div className="font-mono text-sm space-y-3">
                             <p>
                                <strong className="text-primary uppercase tracking-wider mr-2">Input:</strong> 
                                {example.input}
                             </p>
                             <p>
                                <strong className="text-success uppercase tracking-wider mr-2">Output:</strong> 
                                {example.output}
                             </p>
                             {example.explanation && (
                                 <p className="pt-2 border-t-2 border-base-content/10 border-dashed mt-2">
                                    <strong className="text-accent uppercase tracking-wider mr-2">Explanation:</strong> 
                                    {example.explanation}
                                 </p>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
          )}

          {/* 3. Brutalist Constraints Section */}
          {problem.constraints && problem.constraints.length > 0 && (
              <div className="mt-8 bg-error/10 border-4 border-error p-5 shadow-[6px_6px_0px_0px_currentColor]">
                  <span className="font-black uppercase text-error text-sm tracking-widest mb-3 block border-b-4 border-error/30 pb-2">
                      System_Constraints //
                  </span>
                  <ul className="font-mono text-sm space-y-3 mt-4 text-base-content/90 flex flex-col">
                      {problem.constraints.map((constraint, index) => (
                          <li key={index} className="flex items-start gap-3">
                              <span className="text-error font-black mt-1">{">"}</span>
                              <code className="bg-base-100 px-2 py-1 border-2 border-base-content/40 font-bold shadow-[2px_2px_0px_0px_currentColor]">
                                {constraint}
                              </code>
                          </li>
                      ))}
                  </ul>
              </div>
          )}


      </div>
    </div>
  );
}

export default ProblemDescription;