import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../static/gif/man.png';
import styles from '../styles/settings.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { addFriends, fetchUserInfo, removeFriends } from '../api';
import Loader from '../components/Loader';
import { useAuth } from '../hooks';


const UserProfile = () =>{

    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    const checkIfUserIsFriend = () => {
        const friends = auth.user.friends;
        const friendsId = friends.map(friend => friend.to_user._id);
        const index = friendsId.indexOf(userId);
        if(index === -1){
            return false;
        }
        return true;
    }

    const handleRemoveFriendClick = async () => {
        setRequestInProgress(true);

        const response = await removeFriends(userId);
        if(response.success){
            const friendship = auth.user.friends.filter(friend => friend.to_user._id === userId);
            auth.updateUserFriends(false,friendship[0]);
            toast.success('Friend removed successfully!...', {
                position : toast.POSITION.TOP_CENTER
            });
        }
        else{
            toast.error(response.message, {
                position : toast.POSITION.TOP_CENTER
            });
        }

        setRequestInProgress(false);
    };

    const handleAddFriendClick = async () => {
        setRequestInProgress(true);

        const response = await addFriends(userId);
        if(response.success){
            const { friendship } = response.data;
            auth.updateUserFriends(true,friendship);
            toast.success('Friend request sent successfully!...', {
                position : toast.POSITION.TOP_CENTER
            });
        }
        else{
            toast.error(response.message, {
                position : toast.POSITION.TOP_CENTER
            });
        }

        setRequestInProgress(false);
    };

    const isUserFriend = checkIfUserIsFriend();
    
    useEffect( ()=> {

        const getUser = async () => {

            const response = await fetchUserInfo(userId);
            
            if(response.success){
                setLoading(false);
                setUser(response.data.user);
            }else{
                return navigate('/');
            }
            setLoading(false);

        };

        getUser();

    },[userId])

    if(loading){
        return <Loader />
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
                    {user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {user?.name}
                </div>
            </div>
            <div className={styles.btnGrp}>
                {
                    isUserFriend ? (
                        <button className={styles.saveBtn} onClick={handleRemoveFriendClick} disabled = {requestInProgress} >
                            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
                        </button>
                    ) : (
                        <button className={styles.saveBtn} onClick={handleAddFriendClick} disabled = {requestInProgress} >
                            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
                        </button>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserProfile;