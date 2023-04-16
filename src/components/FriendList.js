import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
import Profile from '../static/gif/man.png';

const FriendList = () => {

    const auth = useAuth();
    const {friends} = auth.user ? auth.user : [];
    
    return (
        <div className={styles.friendList}>
            <div className={styles.header}>
                {
                    friends && friends.Length === 0 ? (
                        <div className={styles.noFriends}>
                            No friends found!
                        </div>
                    ) : (
                        <div>
                            Friends...
                        </div>
                    )
                }
            </div>
            <div style={{margin : '20px'}}>
                {
                    friends && friends.map(friend => 
                            <div key={`friend-${friend._id}`}>
                                <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                                    <div className={styles.friendsImg}>
                                        <img src={Profile} alt='Profile pics' />
                                    </div>
                                    <div className={styles.friendsName}>
                                        {friend.to_user.email}
                                    </div>
                                </Link>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default FriendList;