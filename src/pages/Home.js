import Like from '../static/gif/like.png';
import Profile from '../static/gif/man.png';
import Comments from '../static/gif/comment.png';
import styles from '../styles/home.module.css';
import Proptypes from 'prop-types';
import Comment from '../components/Comment';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import Loader from '../components/Loader';

const Home = (props) => {
    const [posts,setPost] = useState(props.post);
    const [loading, setLoader] = useState(true);

    useEffect( () => {

        const fetchPosts = async () =>{
          const response = await getPosts();
          if(response.success){
            setPost(response.data.posts);
            setLoader(false);
          }
        }
    
        fetchPosts();
    
      },[]);


    if(loading){
    return (
        <>
        <Loader />
        </>
    );
    }

    return (
        <div className="posts-list">
            {
                posts.map((post)=> (
                    <div className={styles.postWrapper} key={`post-${post._id}`}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAvatar}>
                                <img
                                    src={Profile}
                                    alt="user-pic"
                                />
                                <div>
                                    <span className={styles.postAuthor}>{post.user.name}</span>
                                    <span className={styles.postTime}>A minute ago</span>
                                </div>
                            </div>
                            <div className={styles.postContent}>{post.content}</div>

                            <div className={styles.postContentAction} style={{padding : 8}}>
                                <div className={styles.postLike}>
                                    <img 
                                        src={Like}
                                        alt="like-icon"
                                    />
                                    <span>{post.likes.length}</span>
                                </div>
                                <div className={styles.postCommentsIcon}>
                                    <img
                                        src={Comments}
                                        alt='comments-icon'
                                    />
                                    <span>{post.comments.length}</span>
                                </div>
                            </div>

                            <div className={styles.postAction}>
                                <div>
                                    <div className={styles.postCommentBox} >
                                        <input placeholder="Start typing a comment" />
                                    </div>
                                    {
                                        post.comments.map((comment)=>(
                                            <Comment comment = {comment} key={comment._id} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

Home.propTypes = {
    props : Proptypes.array.isRequired
}

export default Home;