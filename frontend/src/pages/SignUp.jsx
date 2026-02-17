
import { useState } from 'react'
import './LandingPage.css'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../store/authStore'

const SignUp = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()
    const { signup, error, isLoading } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = user
        if (!name || !email || !password) {
            return toast.error('All fields are required')
        }
        try{
            await signup(email, password, name)
            navigate('/verify-email')
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const userChange = { ...user }
        userChange[name] = value
        setUser(userChange)
    }

    return (
        <div className='min-h-screen flex items-center justify-center backgroundImage px-4'>
            {/* card w-full + max-w-md ensures it's responsive but stays centered */}
            <div className='card bg-base-100/80 w-full max-w-md shadow-2xl backdrop-blur-md border border-white/10'>
                <div className='card-body p-8 sm:p-10'>

                    {/* Centered Header */}
                    <div className='text-center mb-8'>
                        <h2 className='text-3xl font-bold tracking-tight'>Create Account</h2>
                        <div className='h-1 w-12 bg-primary mx-auto mt-2 rounded-full'></div>
                    </div>

                    {/* w-full on form ensures it fills the card-body */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

                        {/* Each form-control is w-full by default */}
                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 shrink-0">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Username" name="name" value={user.name} onChange={handleChange} />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 shrink-0">
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="email" className="grow" placeholder="Email" name='email' value={user.email} onChange={handleChange} />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 shrink-0">
                                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder='Password' name='password' value={user.password} onChange={handleChange} />
                            </label>
                        </div>

                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p> }

                        <PasswordStrengthMeter password={user.password}/>

                        {/* Wide Submit Button */}
                        <button
                            disabled={isLoading}
                            className='btn btn-primary w-full mt-4 shadow-lg hover:shadow-primary/20 text-lg transition-all'
                            type='submit'
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Creating Account...
                                </>
                            ) : 'Sign Up'}
                        </button>

                        {/* Footer Text */}
                        <p className='text-center text-sm text-base-content/70 mt-4'>
                            Already have an account?{' '}
                            <Link to='/login' className='text-primary font-bold hover:underline transition-all'>
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp