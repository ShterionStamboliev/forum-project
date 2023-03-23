import { useState } from "react";
import { db, auth } from '../../config/firebase';
import { collection, addDoc, updateDoc, writeBatch, doc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './Create.css';

const CreateThread = () => {
    const [value, setValue] = useState({
        title: '',
        comment: '',
    });

    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    const batch = writeBatch(db);

    const navigate = useNavigate();

    const threadsCollection = collection(db, "threads");

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const onSubmitThread = async () => {
        try {
            if (value.title === '' || value.comment === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'You cannot leave empty fields!',
                });
                return;
            }
            await addDoc(threadsCollection, {
                author: {
                    name: auth?.currentUser?.email,
                    owner: auth?.currentUser?.uid,
                },
                post: {
                    title: value.title,
                    comment: value.comment,
                    postedOn: new Date().toLocaleDateString(),
                    postedAt: new Date().toLocaleTimeString(),
                    comments: []
                },
            });
            // Adding post to the current user map posts
            await updateDoc(userRef, {
                posts: arrayUnion({
                    threadTitle: value.title,
                    comment: value.comment                    
                })
            });
            await batch.commit();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Post created successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setValue('');
            navigate('/forum');
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="create-post-container">
            <div>
                <h1 className="create-post-title">Create new post</h1>
            </div>
            <div className="post-title">
                <label className="post-title-label" htmlFor="post-title">Thread title: </label>
                <input value={value.title} onChange={handleEventSubmit} className="post-title-input" type="text" name="title" id="title" placeholder="Enter thread title..." />
            </div>
            <div className="post-comment">
                <label className="post-comment-label" htmlFor="post-comment">Comment: </label>
                <textarea value={value.comment} onChange={handleEventSubmit} className="post-comment-input" type="text" name="comment" id="comment" cols="30" rows="10" placeholder="Leave a comment..."></textarea>
            </div>
            <input type="submit" onClick={onSubmitThread} className="btn-submit" value="Submit" />
        </div>
    );
};

export default CreateThread;