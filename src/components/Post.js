import styles from '../styles/home.module.css';
import Like from '../static/gif/like.png';
import Profile from '../static/gif/man.png';
import Comments from '../static/gif/comment.png';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { createComment } from '../api';
import { toast } from 'react-toastify';

export const Post = ({post}) => {

    const [comment,setComment] = useState('');
    const [creatingComment,setCreatingComments] = useState(false);
    const posts = usePosts();

    const handleAddComment = async (e) => {
        if(e.key === 'Enter' && !creatingComment){
            setCreatingComments(true);
            
            if(comment === ""){
                toast.error('Comments cannot be empty...',{
                    position : toast.POSITION.TOP_CENTER
                });
            }
            else{
                const response = await createComment(comment,post._id);
                if(response.success){
                    setComment('');
                    posts.addComment(response.data.comment, post._id);
                    toast.success('Comment posted successfully...',{
                        position : toast.POSITION.TOP_CENTER
                    });
                }else{
                    toast.error(response.message, {
                        position : toast.POSITION.TOP_CENTER
                    })
                }
            }

            setCreatingComments(false);
        }
    }

    return (
        <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src={Profile}
                        alt="user-pic"
                    />
                    <div>
                        <Link to={`/user/${post.user._id}`} state={{user : post.user}} className={styles.postAuthor}>{post.user.name}</Link>
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
                        <div className={styles.postCommentBox}  >
                            <input placeholder="Start typing a comment"
                             value={comment}
                             onChange={(e)=>{setComment(e.target.value)}}
                             onKeyDown={handleAddComment} />
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
    )
}