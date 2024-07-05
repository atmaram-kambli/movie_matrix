import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './style.scss'

function Signup() {
    const [newUser, setNewUser] = useState({ email: "", username: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newUser.email, username: newUser.username, password: newUser.password })
            });

            const json = await response.json()
            if (json.success) {
                navigate("/login");
            }
            else {
                setNewUser({ email: "", name: "", password: "" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // function to handle onchange event
    const handleOnChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className='signup'>
                <h2><span className='text-info'>Sign Up for Free</span></h2>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn my-3">
                            <i className="fa-solid fa-user fa-2xl" style={{ color: "rgb(77 103 208)" }}></i>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                id="email"
                                className="fadeIn second"
                                value={newUser.email}
                                onChange={handleOnChange}
                                name="email"
                                placeholder="E-mail"
                                autoComplete="email"
                                required />
                            <input
                                type="text"
                                id="username"
                                className="fadeIn second"
                                value={newUser.username}
                                onChange={handleOnChange}
                                name="username"
                                placeholder="User Name"
                                autoComplete="username"
                                required />
                            <input
                                type="password"
                                id="password"
                                className="fadeIn third"
                                value={newUser.password}
                                onChange={handleOnChange}
                                name="password"
                                placeholder="Password"
                                minLength={4}
                                autoComplete="password"
                                required />
                            <input
                                type="submit"
                                className="fadeIn fourth"
                                value="Sign Up" />
                        </form>

                        <div id="formFooter">
                            {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                            <span>Already have an account? <Link className='underlineHover' to='/login'>Log In</Link></span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;