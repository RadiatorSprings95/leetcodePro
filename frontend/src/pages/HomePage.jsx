import React from 'react'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'
import toast from 'react-hot-toast'

function HomePage() {
    return (
        <div>
            <button className='btn' onClick={() => toast.success("noce")} >hehehe</button>

            <header> 
            <Show when="signed-out">
                <SignInButton mode="modal" >
                    <button className='btn'>log in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className='btn'>sign up in</button>

                </SignUpButton>
            </Show>
            <Show when="signed-in">
                <UserButton />
                <SignOutButton>
                    <button className='btn'>log out</button>

                </SignOutButton>
            </Show>
            </header>  
        </div>
    )
}

export default HomePage
// TODO: react-query aka tanstack, axios