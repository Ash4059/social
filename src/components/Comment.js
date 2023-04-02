import styles from '../styles/home.module.css';
import Proptypes from 'prop-types';

const Comment = (props) =>{
    const comment = props.comment;
    return (
        <div className={styles.postCommentsList} key={comment._id}>
            <div className={styles.postCommentItem}>
                <div className={styles.postCommentHeader}>
                <div className={styles.postCommentAuthor}>
                    {comment.user.name}
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>
                        {comment.likes.length}
                    </span>
                </div>
                </div>
                <div className={styles.postCommentContent}>{comment.content}</div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    props : Proptypes.object.isRequired
}

export default Comment;