import { useState } from 'react';
import styles from '../styles/home.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { addPost } from '../api';

const CreatePost = () => {

    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    const handleAddPostClick = async () => {

        setAddingPost(true);

        if(post === ""){
            toast.error('Post cannot be empty....',{
                position : toast.POSITION.TOP_CENTER
            });
        }
        else{
            const response = await addPost(post);
            if(response.success){
                toast.success('Post created successfully...',{
                    position : toast.POSITION.TOP_CENTER
                })
            }
            else{
                toast.error(response.message,{
                    position : toast.POSITION.TOP_CENTER
                });
            }
        }
        setPost("");
        setAddingPost(false);

    }

    return (
        <div className={styles.createPost}>
            <textarea onChange={(e) => setPost(e.target.value)} value={post} />
            <div>
                <button className={styles.addPostBtn} onClick={handleAddPostClick} disabled = {addingPost}>
                    {addingPost ? 'Adding post...':'Add Post'}
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreatePost;