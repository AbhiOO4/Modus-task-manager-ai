import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { isLoading, error, resetPassword, clearError } = useAuthStore()
  const { token } = useParams() // Assuming your route is /reset-password/:token
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword){
      toast.error("Passwords doesn't match")
    }
    try{
      await resetPassword(token, password)
      toast.success("Password Changed Successfully")
      navigate('/login')
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    clearError()
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center backgroundImage px-4'>
      <div className='card bg-base-100/70 w-full max-w-md shadow-2xl backdrop-blur-md border border-white/10'>
        <div className='card-body p-8 sm:p-10'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold tracking-tight'>Reset Password</h2>
            <p className='text-sm text-base-content/60 mt-2'>
              Please enter your new password below to secure your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            
            {/* New Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                <Lock className="h-4 w-4 opacity-70 shrink-0" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="grow" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>
            </div>

            {/* Confirm Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Confirm New Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-100/40 w-full">
                <CheckCircle2 className="h-4 w-4 opacity-70 shrink-0" />
                <input 
                  type="password" 
                  className="grow" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </label>
            </div>

            <div>
              {error && <p className='text-red-500 font-semibold text-sm mt-1'>{error}</p>}
            </div>

            <PasswordStrengthMeter password={password}/>

            {/* Submit Button */}
            <div className='mt-4'>
              <button 
                type="submit"
                className="btn btn-primary w-full shadow-lg text-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Resetting...
                  </>
                ) : (
                  "Set New Password"
                )}
              </button>
            </div>
            <p className='text-center text-sm text-base-content mt-2'>
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

export default ResetPassword