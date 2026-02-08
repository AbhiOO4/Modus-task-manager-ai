import { Link, useNavigate } from "react-router"
import './LandingPage.css'
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../lib/axios"

function Login() {
    const [user, setUser] = useState({email: '', password: ''})
    const [loging, setLoging] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target
        const userChange = {...user}
        userChange[name] = value
        setUser(userChange)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = user
        if (!email || !password){
            return toast.error('All fields are required !')
        }
        setLoging(true)
        try{
            const result = await api.post('/auth/login', user)
            const {jwtToken, name} = result.data
            localStorage.setItem("token", jwtToken)
            localStorage.setItem("username", name)
            setTimeout(() => {
                navigate('/DashBoard')
            }, 1000)
            toast.success(`Welcome ${name}`)
        }catch(error){
            if (error.response?.status === 429){
                toast.error("Too many attempts, try again later", {duration: 5000})
            }
            else if (error.response?.status === 403) {
                if (error.response?.data?.message) {
                    toast.error(error.response.data.message)
                }
            }else{
                toast.error('Not able to login')
            }
            console.log(error)
            
        }finally{
            setLoging(false)
        }
    }
    return (
            <div className='min-h-screen flex items-center justify-center backgroundImage px-2'>
                <div className='card bg-base-100/50 w-96 shadow-xl p-3 backdrop-blur-sm'>
                    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg ">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder='************' name="password" value={user.password} onChange={handleChange} />
                        </label>
                        <div className='flex items-center justify-center mt-10'>
                        {loging ? <button className="btn">
                            <span className="loading loading-spinner"></span>
                            Loging In
                        </button> :
                            <button className='btn btn-primary px-8'>Login</button>
                        }
                        </div>
                        <div>
                            <hr className='mt-5 w-auto mx-8 ' />
                            <p className='text-center'>Or</p>
                        </div>
                        <div className='flex items-center justify-center my-5'>
                            <Link className='btn btn-neutral px-8' to={'/signup'}>Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Login