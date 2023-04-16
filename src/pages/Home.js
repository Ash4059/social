import styles from '../styles/home.module.css';
import Proptypes from 'prop-types';
import Loader from '../components/Loader';
import { useAuth, usePosts } from '../hooks';
import FriendList from '../components/FriendList';
import CreatePost from '../components/CreatePost';
import { Post } from '../components/Post';
import { ToastContainer } from 'react-toastify';

const Home = (props) => {
    const auth = useAuth();
    const posts = usePosts();

    if(posts.loading){
    return (
        <>
        <Loader />
        </>
    );
    }

    return (
        <div className={styles.home}>
            <div className={styles.postsList}>
                {auth.user ? (<CreatePost />) : (<></>)}
                {
                    posts.post?.map((post)=> (
                        <Post post = {post} key = {`post-${post._id}`} />
                    ))
                }
            </div>
            {
                (auth.user) ? <FriendList /> : <></>
            }
            <ToastContainer />
        </div>
    )
}

Home.propTypes = {
    props : Proptypes.array.isRequired
}

export default Home;