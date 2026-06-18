import { Link } from "react-router";
import { ArrowRightIcon, Code2Icon, VideoIcon, ZapIcon, TerminalIcon } from 'lucide-react';
import { SignInButton, useUser } from '@clerk/react';
import Navbar from '../components/Navbar';

function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary selection:text-primary-content">
      <Navbar />

      {/* Neo-Brutalist Hero */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Bold Copy */}
        <div className="space-y-8">
          <div className="inline-block px-4 py-1 border-2 border-base-content bg-warning font-mono font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_currentColor]">
            System v2.0 // Active
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            Code. <br/>
            {/* The tilted background span is a classic retro-web design trick */}
            <span className="bg-primary text-primary-content px-2 border-4 border-base-content inline-block mt-2 -rotate-2">Fight.</span> <br/>
            Win.
          </h1>
          
          <p className="text-xl font-medium max-w-lg border-l-4 border-base-content pl-4 py-2">
            Stop coding alone in the dark. Challenge peers in real-time, execute algorithms instantly, and flex your skills in HD video rooms.
          </p>
          
          <div className="pt-4">
            {isSignedIn ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg border-4 border-base-content rounded-none shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_currentColor] transition-all font-black uppercase text-xl h-auto py-4">
                Access Terminal 
                <ArrowRightIcon className="size-6 ml-2" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-accent btn-lg border-4 border-base-content rounded-none shadow-[6px_6px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_currentColor] transition-all font-black uppercase text-xl h-auto py-4">
                  Init System 
                  <TerminalIcon className="size-6 ml-2" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Right Side: Abstract Terminal Window */}
        <div className="hidden lg:block bg-base-300 border-4 border-base-content p-6 shadow-[12px_12px_0px_0px_currentColor] relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Fake Mac/Windows window buttons */}
            <div className="flex gap-2 mb-4 border-b-4 border-base-content pb-4">
                <div className="size-4 bg-error border-2 border-base-content rounded-full"></div>
                <div className="size-4 bg-warning border-2 border-base-content rounded-full"></div>
                <div className="size-4 bg-success border-2 border-base-content rounded-full"></div>
            </div>
            <pre className="font-mono text-sm leading-relaxed overflow-x-hidden text-base-content/80">
                <code>
<span className="text-primary font-bold">const</span> hero = <span className="text-secondary font-bold">await</span> User.connect();<br/>
<br/>
<span className="text-primary font-bold">if</span> (!hero.isCoding) &#123;<br/>
&nbsp;&nbsp;hero.joinRoom({`{`}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;video: <span className="text-accent font-bold">true</span>,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;language: <span className="text-warning font-bold">'javascript'</span><br/>
&nbsp;&nbsp;{`}`});<br/>
&#125;<br/>
<br/>
console.log(<span className="text-warning font-bold">"Let's build."</span>);
                </code>
            </pre>
        </div>
      </div>

      {/* Brutalist Grid Features Section */}
      <div className="border-t-4 border-base-content bg-secondary/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-12 border-b-4 border-base-content pb-4 inline-block">System Features_</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-base-100 border-4 border-base-content p-8 shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
              <Code2Icon className="size-12 mb-6 text-primary" />
              <h3 className="text-2xl font-black uppercase mb-4">Compiler</h3>
              <p className="font-medium text-base-content/80 font-mono text-sm">Direct injection to JDoodle API. Execute code, analyze standard output, and destroy bugs in real-time.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-base-100 border-4 border-base-content p-8 shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
              <VideoIcon className="size-12 mb-6 text-secondary" />
              <h3 className="text-2xl font-black uppercase mb-4">Uplink</h3>
              <p className="font-medium text-base-content/80 font-mono text-sm">Stream Video integration. Peer-to-peer visual confirmation and zero-latency text channels.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-base-100 border-4 border-base-content p-8 shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_currentColor] transition-all">
              <ZapIcon className="size-12 mb-6 text-accent" />
              <h3 className="text-2xl font-black uppercase mb-4">Sync</h3>
              <p className="font-medium text-base-content/80 font-mono text-sm">Custom Express backend. Stateful room architectures keeping your squad perfectly aligned.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;