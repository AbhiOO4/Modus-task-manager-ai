import  { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore'

function EmailVerification() {
  const [code, setCode] = useState(["","","","","",""])
  const inputRefs = useRef([])
  const navigate = useNavigate()
  console.log("EmailVerification mounted")

  const {error, isLoading, verifyEmail} = useAuthStore()

  const handleChange = (index, value) => {
    if (index === 5 && code[5] !== "" && value !== "") {
      return;
    }
    const newCode = [...code]
    //handle pasted code 123456
    if (value.length > 1) {
      const pasteCode = value.slice(0, 6).split("")
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasteCode[i] || "";
      }
      setCode(newCode)

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();

    } else {
      newCode[index] = value
      setCode(newCode)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    if (code.includes("")) {
      return toast.error("Fill Code Fully")
    }

    const verificationCode = code.join("").trim()
    console.log("Sending token:", verificationCode)
    try{
      await verifyEmail(verificationCode)
      toast.success("email verified successfully")
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }

  // Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit();
		}
	}, [code]);

  return (
    <div className='min-h-screen flex items-center justify-center backgroundImage px-4'>
      <div className='card bg-base-100/70 w-full max-w-md shadow-2xl backdrop-blur-md border border-white/10'>
        <div className='card-body p-8 sm:p-10'>
          <h1 className='text-center text-lg font-bold'>Verify Your Email</h1>
          <p className='text-center text-sm mb-6'>Enter the 6-digit code sent to your email address.</p>
          <form className='space-y-6'>
            <div className='flex justify-between'>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength='6'
                  value={digit} 
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='w-12 h-12 text-center text-2xl font-bold border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                />
              ))}
            </div>
          </form>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p> }

          <button className='btn btn-primary mt-4' type='button'  onClick={handleSubmit} >
             {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    veirfying
                                </>
                            ) : 'Verify Email'}
            </button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
