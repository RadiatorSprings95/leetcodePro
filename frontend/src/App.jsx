
// import { SignInButton, SignOutButton } from '@clerk/react';
import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {

  return (
    <>
      <h1>Welcome to the app</h1>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" >
            <button>log in</button>
          </SignInButton>
          <SignUpButton mode="modal"  />
        </Show>
        <Show when="signed-in">
          <UserButton />
          <SignOutButton/>
         </Show>
        


      </header>

    </>
  )
}

export default App;
