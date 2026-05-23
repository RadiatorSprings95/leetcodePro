
// import { SignInButton, SignOutButton } from '@clerk/react';
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from "react-hot-toast"
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import DashboardPage from './pages/DashboardPage';
import ProblemPage from './pages/ProblemPage';

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // * this will get rid of the flickering effect when reloading
  if(!isLoaded) return null;
  return (
    <>
    <Routes>
      <Route path='/' element={!isSignedIn ? <HomePage/> : <Navigate to={"/dashboard"}/>} />
      <Route path='/dashboard' element={isSignedIn ? <DashboardPage/> : <Navigate to={"/"}/>} />

      <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>} />
      <Route path='/problem/:id' element={isSignedIn ? <ProblemPage/> : <Navigate to={"/"}/>} />

      
    </Routes>
    <Toaster/>
    </>
      )
    }


export default App;
