import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
import Profile from '../static/gif/man.png';

const FriendList = () => {

    const auth = useAuth();
    const {friends} = auth.user ? auth.user : [];
    console.log(friends);
    return (
        <div className={styles.friendList}>
            <div className={styles.header}>
                {
                    friends && friends.length === 0 ? (
                        <div className={styles.noFriends}>
                            No friends found!
                        </div>
                    ) : (
                        <div className={styles.noFriends}>
                            Friends...
                        </div>
                    )
                }
            </div>
            <div style={{height : 'calc(100% - 73px)', overflowY : 'auto', overflowX : 'hidden'}}>
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