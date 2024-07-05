import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            navigate("/");
        }
        else {
            setCredentials({ email: "", password: "" })
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='login'>

                <h2><span className='text-info'>Welcome Back!</span></h2>
                <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn my-3">
                        <i className="fa-solid fa-user fa-2xl" style={{color: "rgb(77 103 208)"}}></i>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            id="email" 
                            className="fadeIn second" 
                            value={credentials.email} 
                            onChange={handleOnChange} 
                            name="email" 
                            placeholder="E-mail"
                            autoComplete="email"
                            required/>
                        <input 
                            type="password" 
                            id="password"
                            className="fadeIn third"
                            value={credentials.password}
                            onChange={handleOnChange}
                            name="password"
                            placeholder="Password"
                            minLength={4}
                            autoComplete="password"
                            required
                            />
                        <input 
                            type="submit" 
                            className="fadeIn fourth" 
                            value="Log In" />
                    </form>
                    <div id="formFooter">
                        {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                        <p>Don't have an account? <Link className='underlineHover' to='/signup'>Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
