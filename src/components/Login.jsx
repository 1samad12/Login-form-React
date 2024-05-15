import React, { useState } from 'react';
import "./Login.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login() {
    const [emailVisible, setEmailVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toggleEmailVisibility = () => {
        setEmailVisible((prevState) => !prevState);
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };
    const notify = (message) => toast(message);
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`http://192.168.100.24:8001/api/login/`, {
                email: email,
                password: password
                
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Response:", response.data.token);
            if (response.token) {
                localStorage.setItem("LoginFormApi", response.data.token);
                window.location.href = "/home"; 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response); 
        }
    }
    return (
        <>
            <div>

            <div className='main'>
                <h1 className='head display-1 text-wrap'>
                    <img width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                </h1>
                <div className='emailpass'>
                    <div>
                        <input
                            className='email'
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                        />
                    </div>
                    <div className='pass'>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordVisible ? (
                            <VisibilityIcon className='eye' onClick={togglePasswordVisibility} />
                        ) : (
                            <VisibilityOffIcon className='eye' onClick={togglePasswordVisibility} />
                        )}
                    </div>
                </div>
                <button className='button' onClick={handleSubmit}>Login</button>
            </div>
            <ToastContainer />
            </div>
        </>
    );
}

export default Login;