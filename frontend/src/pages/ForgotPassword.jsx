import { useState } from 'react'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  
  const {isLoading, forgotPassword, error} = useAuthStore()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return toast.error("Please enter the email")
    try{
      await forgotPassword(email)
      toast.success("Email send successfully")
      navigate('/password-reset-email-send')
    }catch(error){
      console.log(error)
    }
  }

  return (
      <div className='min-h-screen flex items-center justify-center backgroundImage px-4'>
                  {/* Minimal glassmorphism card */}
                  <div className='card bg-base-100/70 w-full max-w-md shadow-2xl backdrop-blur-md border border-white/10'>
                      <div className='card-body p-8 sm:p-10'>
      
                          {/* Header */}
                          <div className='text-center mb-10'>
                              <h2 className='text-3xl font-bold tracking-tight'>Forgot Password</h2>
                              <p className='text-sm text-base-content/60 mt-2'>Enter your email address and we will send you a link to reset your password</p>
                          </div>
      
                          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      
                              <div className="form-control w-full">
                                  <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 shrink-0">
                                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                      </svg>
                                      <input type="email" className="grow" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                  </label>
                              </div>
      
                              {error && <p className='text-red-500 font-semibold mt-2'>{error}</p> }
      
                              {/* Wide Login Button */}
                              <div className='mt-4'>
                                  {isLoading ? (
                                      <button className="btn btn-primary w-full" disabled={isLoading} >
                                          <span className="loading loading-spinner"></span>
                                          Submitting
                                      </button>
                                  ) : (
                                      <button className='btn btn-primary w-full shadow-lg text-lg'>
                                          Submit
                                      </button>
                                  )}
                              </div>
      
                              {/* Footer Text Link */}
                              <p className='text-center text-sm text-base-content/70 mt-4'>
                                  <Link to='/login' className='btn btn-ghost transition-all'>
                                        <ArrowLeft /> Back to Login
                                  </Link>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
  )
}

export default ForgotPassword
