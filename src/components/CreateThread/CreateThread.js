import { useState, useEffect } from "react";
import { db, auth } from '../../config/firebase';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './Create.css';

const CreateThread = () => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const threadsCollection = collection(db, "threads");


    const navigate = useNavigate();

    const onSubmitThread = async () => {
        try {
            if (title === '' || comment === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'You cannot leave empty fields!',
                });
                return;
            }
            await addDoc(threadsCollection, {
                author: {
                    name: auth?.currentUser?.email,
                    userId: auth?.currentUser?.uid,
                },
                post: {
                    title,
                    comment,
                },
                postedOn: new Date().toLocaleDateString(),
                postedAt: new Date().toLocaleTimeString(),
                comments: []
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Post created successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setTitle('');
            setComment('');
            navigate('/forum');
        } catch (error) {
            console.log('error', error);
        }
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className="create-post-container">
            <div>
                <h1 className="create-post-title">Create new post</h1>
            </div>
            <div className="post-title">
                <label className="post-title-label" htmlFor="post-title">Thread title: </label>
                <input value={title} onChange={onTitleChange} className="post-title-input" type="text" name="title" id="title" placeholder="Enter thread title..." />
            </div>
            <div className="post-comment">
                <label className="post-comment-label" htmlFor="post-comment">Comment: </label>
                <textarea value={comment} onChange={onCommentChange} className="post-comment-input" type="text" name="comment" id="comment" cols="30" rows="10" placeholder="Leave a comment..."></textarea>
            </div>
            <input type="submit" onClick={onSubmitThread} className="btn-submit" value="Submit" />
        </div>
    );
};

export default CreateThread;