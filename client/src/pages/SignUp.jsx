import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../../utils'

const SignUp = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }

    // console.log('signupInfo ->', signupInfo)
    
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        const {name, email, password} = signupInfo
        if(!name || !email || !password) {
            return handleError("name, email and password are required")
        }
        try {
            const url = 'http://localhost:8000/auth/signup'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message, error} = result
            console.log(result)
            if (success) {
                handleSuccess(message);
                setTimeout(()=> {
                    navigate('/login')
                },1000)
            } else if (error){
                const details = error?.details[0].message
                handleError(details)
            } else if (!success) {
                handleError(message);
            }
            console.log(result)
        } catch(error) {
            handleError(error)
        }
    }

  return (
    <div className='container'>
        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name='name'
                    onChange={handleChange}
                    autoFocus
                    placeholder='Enter your name'
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name='email'
                    onChange={handleChange}
                    placeholder='Enter your email'
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name='password'
                    onChange={handleChange}
                    placeholder='Enter your password'
                />
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account ?
                <Link to='/login'>Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default SignUp