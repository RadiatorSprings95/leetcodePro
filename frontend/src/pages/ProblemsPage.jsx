import { Link } from "react-router"
import Navbar from '../components/Navbar'

import { PROBLEMS } from "../data/problems";
import { ChevronRight, ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
const problems = Object.values(PROBLEMS);
const easyProblemCount = problems.filter(p => p.difficulty === "Easy").length;
const mediumProblemCount = problems.filter(p => p.difficulty === "Medium").length;
const hardProblemCount = problems.filter(p => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary selection:text-primary-content pb-20">
      <Navbar />

      {/* Brutalist System Status Bar */}
      <div className="bg-primary text-primary-content border-b-4 border-base-content px-6 py-2 flex items-center justify-between font-mono font-bold text-sm uppercase tracking-widest shadow-md">
          <span>System: Directory_Access</span>
          <span>Records: {problems.length}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Page Header */}
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter border-b-4 border-base-content inline-block pb-2 pr-8 shadow-[4px_4px_0px_0px_currentColor] bg-warning mb-4 mt-4">
            Algorithm Archive_
          </h1>
          <p className="text-xl font-medium border-l-4 border-base-content pl-4 py-2 mt-4 max-w-2xl bg-base-200/50">
            Select a challenge to initialize the compiler. Rank up your logic circuits.
          </p>
        </div>

        {/* Brutalist Difficulty Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] bg-success/20 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
            <h3 className="font-black uppercase text-xl mb-2 border-b-2 border-base-content/20 pb-2">Easy</h3>
            <p className="text-5xl font-mono font-bold">{easyProblemCount}</p>
          </div>
          <div className="border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] bg-warning/20 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
            <h3 className="font-black uppercase text-xl mb-2 border-b-2 border-base-content/20 pb-2">Medium</h3>
            <p className="text-5xl font-mono font-bold">{mediumProblemCount}</p>
          </div>
          <div className="border-4 border-base-content p-6 shadow-[8px_8px_0px_0px_currentColor] bg-error/20 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
            <h3 className="font-black uppercase text-xl mb-2 border-b-2 border-base-content/20 pb-2">Hard</h3>
            <p className="text-5xl font-mono font-bold">{hardProblemCount}</p>
          </div>
        </div>

        {/* Problems List in a Terminal Box */}
        <div className="space-y-4 border-4 border-base-content p-6 shadow-[12px_12px_0px_0px_currentColor] bg-base-200">
          {problems.map(p => (
            <Link key={p.id} to={`/problem/${p.id}`} className="group block">
              <div className="border-4 border-base-content p-4 bg-base-100 flex flex-col md:flex-row md:items-center justify-between shadow-[6px_6px_0px_0px_currentColor] group-hover:translate-y-[2px] group-hover:translate-x-[2px] group-hover:shadow-[2px_2px_0px_0px_currentColor] transition-all gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 border-2 border-base-content">
                    <Code2Icon className="size-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-tight">{p.title}</h2>
                </div>
                
                <div className="flex items-center gap-4 justify-between md:justify-end">
                  <span className={`px-3 py-1 font-mono text-sm font-bold border-2 border-base-content uppercase 
                    ${p.difficulty === 'Easy' ? 'bg-success/50' : p.difficulty === 'Medium' ? 'bg-warning/50' : 'bg-error/50'}`}>
                    {p.difficulty}
                  </span>
                  <div className="bg-base-300 p-1 border-2 border-base-content group-hover:bg-primary group-hover:text-primary-content transition-colors">
                    <ChevronRight className="size-5" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )

}

export default ProblemsPage
