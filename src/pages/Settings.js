import { useAuth } from '../hooks';
import Profile from '../static/gif/man.png';
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Settings = () =>{

    const auth = useAuth();
    const [edit,setEdit] = useState(false);
    const [name, setName] = useState(auth.user?.name);
    const [password, setPassword] = useState(auth.user?.password);
    const [confirmPassword,setConfirmPassword] = useState(auth.user?.password);
    const [savingForm, setSavingForm] = useState(false);
    const navigate = useNavigate();

    const updateProfile = async () => {

        setSavingForm(true);

        let error = false;

        if(!name || !password || !confirmPassword){
            toast.error('Please fill all the field',{
                position:toast.POSITION.TOP_CENTER
            });
            error = true;
        }

        if(password !== confirmPassword){
            toast.error('Your password and confirm password does not matched!',{
                position:toast.POSITION.TOP_CENTER
            });
            error = true;
        }

        if(error){
            setSavingForm(false);
            return;
        }

        const response = await auth.udpateUser(auth.user._id,name,password,confirmPassword);
        setEdit(false);
        setSavingForm(false);

        if(response.success){
            toast.success('Your profile updated successfully!',{
                position:toast.POSITION.TOP_CENTER
            })
        }else{
            toast.error(response.message,{
                position:toast.POSITION.TOP_CENTER
            })
        }
    }

    return (
        <div className={`settings ${styles.settings}`}>
            <div className={styles.imgContainer}>
                <img src={Profile} alt='Profile' />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Email
                </div>
                <div className={styles.fieldValue}>
                    {auth.user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                {
                    edit?(
                        <>
                            <input type='name' value={name} onChange={(e)=>setName(e.target.value)} />
                        </>
                    ):(
                        <div className={styles.fieldValue}>
                            {name}
                        </div>
                    )
                }
            </div>
            {
                edit?(
                    <>
                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>
                                Password
                            </div>
                            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>
                                Confirm Password
                            </div>
                            <input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                        </div>
                    </>
                ):(<></>)
            }
            <div className={styles.btnGrp}>
                {edit?
                    <button className={styles.editBtn} onClick={updateProfile} disabled={savingForm}>
                        {savingForm ? 'Saving...' : 'Save'} Profile
                    </button>
                    :<button className={styles.editBtn} onClick={()=>{setEdit(true)}} disabled={savingForm}>
                        Edit Profile
                    </button>
                }
                
                <button className={styles.editBtn} onClick={()=>{navigate(-1)}} disabled={savingForm}>
                    Go back
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Settings;