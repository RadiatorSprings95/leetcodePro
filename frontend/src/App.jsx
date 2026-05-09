
// import { SignInButton, SignOutButton } from '@clerk/react';
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from "react-hot-toast"

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>} />

      
    </Routes>
    <Toaster/>
    </>
      )
    }


export default App;
