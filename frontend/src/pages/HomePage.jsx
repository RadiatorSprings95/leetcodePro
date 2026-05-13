import { Link } from "react-router"
import { ArrowRightIcon, BrickWall, CheckIcon, Code2Icon, UserIcon, VideoIcon, ZapIcon } from 'lucide-react';
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/react'
function HomePage() {
    return (
        <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300">
            {/* NAVBAR */}
            <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
                {/* LOGO */}
                <Link to={"/"}
                    className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <div className="size-10 rounded-xl flex items-center bg-info
                        justify-center shadow-lg">
                        <BrickWall  className="size-6 text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl font-mono tracking-wider text-accent">Leetcode Pro</span>
                        <span className="text-xs text-base-content/60 font-medium  -mt-1">better leetcode</span>
                    </div>
                </Link>

                {/* SIGNIN BTN */}
                <SignInButton mode="modal" >
                    <button className="group px-6 py-3 rounded-xl  text-success font-semibold text-sm  hover:shadow-xl hover:bg-amber-50
                    transition-all duration-200 hover:scale-105 flex items-center gap-2 ">
                        <span>Get Started</span>
                        <ArrowRightIcon className="size-4 group-hover:trnaslate-x-0.5 transition-transform"/>
                    </button>
                </SignInButton>


            </div>

            </nav>

            {/* HERO */}
             <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT COLUMN */}
                    <div className="space-y-8">
                        <div className="badge badge-primary badge-lg">
                            <ZapIcon className="size-4"/>Real-Time Collaboration
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                            <span>Code Togethor, </span> <br />
                            <span className=" bg-linear-to-r from-accent-200 to-accent text-black ">Learn Togethor</span>
                        </h1>
                        <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
                            this is the freshest platform to learn and develop dsa skills along with real life interview environment
                        </p>
                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-3">
                            <div className="badge badge-lg badge-outline">
                                <CheckIcon className="size-4 text-success"/> Live Video Chat
                            </div>
                            <div className="badge badge-lg badge-outline">
                                <CheckIcon className="size-4 text-success"/> Online Code Editor
                            </div>
                            <div className="badge badge-lg badge-outline">
                                <CheckIcon className="size-4 text-success"/> Multi-Language Support
                            </div>
                        </div>
                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <SignInButton mode="modal" >
                                <button className="btn btn-outline btn-lg text-accent">
                                    Start Coding now
                                    <ArrowRightIcon className="size-5"/>
                                </button>
                            </SignInButton>
                            <button className="btn btn-lg btn-outline">
                                <VideoIcon className="size-5"/>
                                Watch Demo
                            </button>
                        
                        </div>

                        {/* STATS */}
                        <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
                            <div className="stat">
                                <div className="stat-value text-primary"> -1</div>
                                <div className="stat-title">Active Users</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value text-primary"> 50k+</div>
                                <div className="stat-title">Sessions</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value text-primary"> 99.9%</div>
                                <div className="stat-title">Up Time</div>
                            </div>
                        </div>



                    </div>
                    {/* RIGHT COLUMN */}
                    <img 
                        src="/wallpaepr.jpeg"
                        alt="leetcode Pro"
                        className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 
                        transition-transform duration-500" 
                    />
                
                </div>
             </div>

            {/* FEATURES SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        the first platform <span className="text-info font-bold">You Need</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        We provide Powerfull feature to ease your journey here
                    </p>
                </div>

                {/* FEATURES GRID*/}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* FEATURE 1*/}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <VideoIcon className="size-8 text-success"/>
                            </div>
                            <h3 className="card-title">HD Video Calls</h3>
                            <p className="text-base-content/70">
                                Super Smooth audio and video for clear communication and experience
                            </p>
                        </div>
                    </div>
                    {/* FEATURE 2*/}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <Code2Icon className="size-8 text-success"/>
                            </div>
                            <h3 className="card-title">Live Code Editor</h3>
                            <p className="text-base-content/70">
                                get your code compiled live without any hassel, supporting many languages
                            </p>
                        </div>
                    </div>
                    {/* FEATURE 3*/}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <UserIcon className="size-8 text-success"/>
                            </div>
                            <h3 className="card-title">Learn N Grow</h3>
                            <p className="text-base-content/70">
                                learn with people and improve communication as well as knowledge with us
                            </p>
                        </div>
                    </div>
                

                </div>
            </div>
        
        </div>
    )
}

export default HomePage
