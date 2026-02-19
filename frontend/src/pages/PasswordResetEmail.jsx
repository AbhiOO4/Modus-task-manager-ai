import { ArrowLeft, Mail } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

function PasswordResetEmail() {
    return (
        <div className='min-h-screen flex items-center justify-center backgroundImage px-4'>
            {/* Minimal glassmorphism card */}
            <div className='card bg-base-100/70 w-full max-w-md shadow-2xl backdrop-blur-md border border-white/10'>
                <div className='card-body p-8 sm:p-10'>

                    {/* Header */}
                    <div className='text-center mb-10'>
                        <h2 className='text-3xl font-bold tracking-tight'>Password reset</h2>
                        <div className='flex justify-center my-5'>
                            <div className='p-4 bg-secondary/60 rounded-4xl'>
                                <Mail size={32}/>
                            </div>
                        </div>
                        <p className='mt-3 font-semibold text-base-content'>You will recieve a password reset link in your email inbox shortly. </p>
                    </div>



                    {/* Footer Text Link */}
                    <p className='text-center text-sm text-base-content mt-2'>
                        <Link to='/login' className='btn btn-ghost transition-all'>
                            <ArrowLeft /> Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetEmail
