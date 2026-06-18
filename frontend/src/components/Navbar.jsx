import { UserButton } from "@clerk/react";
import { BookOpenIcon, LayoutDashboardIcon, TerminalSquare } from "lucide-react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => path === location.pathname;

  return (
    <nav className="bg-base-100 border-b-4 border-base-content px-6 py-3 sticky top-0 z-50 flex items-center justify-between">
      {/* Retro Brand Area */}
      <div>
        <Link to="/" className="flex items-center gap-2 group">
          {/* Physical button effect on logo */}
          <div className="bg-primary border-2 border-base-content p-1.5 shadow-[2px_2px_0px_0px_currentColor] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
            <TerminalSquare className="size-6 text-primary-content" />
          </div>
          <div className="flex flex-col ml-2">
            <span className="font-black text-2xl tracking-tighter uppercase">
              LeetCode<span className="text-primary">Pro</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links & Profile */}
      <div className="flex items-center gap-6">
        <ul className="flex gap-4 font-bold uppercase tracking-wide text-sm">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-3 py-2 border-2 border-transparent hover:border-base-content hover:shadow-[2px_2px_0px_0px_currentColor] transition-all
              ${isActive('/dashboard') ? 'bg-secondary text-secondary-content border-base-content shadow-[2px_2px_0px_0px_currentColor]' : ''}`}
            >
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden sm:block">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/problems" 
              className={`flex items-center gap-2 px-3 py-2 border-2 border-transparent hover:border-base-content hover:shadow-[2px_2px_0px_0px_currentColor] transition-all
              ${isActive('/problems') ? 'bg-secondary text-secondary-content border-base-content shadow-[2px_2px_0px_0px_currentColor]' : ''}`}
            >
              <BookOpenIcon className="size-4" />
              <span className="hidden sm:block">Problems</span>
            </Link>
          </li>
        </ul>
        {/* Clerk User Profile */}
        <div className="pl-6 border-l-4 border-base-content flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;