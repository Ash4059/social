import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import styles from '../styles/login.module.css';

const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSigningUp(true);

        let error = false;
        if(!name || !email || !password || !confirmPassword){
            toast.error('Please fill all the details', {
                position : toast.POSITION.TOP_CENTER
            });
            error = true;
        }

        if(password !== confirmPassword){
            toast.error('Make sure password and confirm password matches',{
                position : toast.POSITION.TOP_CENTER
            });
            error = true;
        }

        if(error){
            setSigningUp(false);
            return;
        }

        const response = await auth.signup(name,email,password,confirmPassword);

        if(response.success){
            navigate('/login');
            setSigningUp(false);

            toast.success('User registered successfully, Please login now',{
                position : toast.POSITION.TOP_CENTER
            });
        }
        else{
            toast.error(response.message,{
                position : toast.POSITION.TOP_CENTER
            });
        }

        setSigningUp(false);
    }

    if(auth.user){
        return <Navigate to="/" />;
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <span className={styles.loginSignupHeader}>Signup</span>
            <div className={styles.field}>
                <input
                    placeholder="Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    placeholder="Confirm Password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <button disabled = {signingUp}>
                    {signingUp ? 'Signing up...' : 'Sign up'}
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}

export default Signup;