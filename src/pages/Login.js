import { useState } from 'react';
import styles from '../styles/login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';

const Login = () =>{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (e) =>{

        e.preventDefault();

        setLoggingIn(true);

        if(!email || !password){
            toast.error('Please enter both email and password', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        const response = await auth.login(email, password)

        if(response.success){
            toast.success('Login successfull!',{
                position: toast.POSITION.TOP_CENTER
            });
        }
        else{
            toast.error(response.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }

        setLoggingIn(false);

    };

    return (
        <div>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <span className={styles.loginSignupHeader}>Log In</span>
                <div className={styles.field}>
                    <input 
                        type='email' 
                        placeholder='email' required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className={styles.field}>
                    <input 
                        type='password' 
                        placeholder='password' required 
                        value={password} 
                        onChange={ (e) => setPassword(e.target.value) } 
                    />
                </div>
                <div className={styles.field}>
                    <button>
                        {loggingIn ? 'logging In....' : 'Log In'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;