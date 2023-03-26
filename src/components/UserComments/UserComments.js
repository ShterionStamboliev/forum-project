import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { UseAuth } from '../../contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';


const UserComments = () => {
    const [commentText, setCommentText] = useState('');
    const { user } = UseAuth();

    const commentsCollectionRef = collection(db, 'comments');
    
    const getCommentsDocs = async () => {
        const getComments = await getDocs(commentsCollectionRef)
        getComments.forEach((doc) => {
            console.log(doc.data());
        })
    }
    getCommentsDocs();


    const currentUserId = user.uid;
    const currentUserEmail = user.email;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };


    return (
        <>
            <div className="user-comments-img">
                <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
            </div>
            <textarea value={commentText} onChange={handleChange} name="textarea" id="textarea" className="user-comments-area"></textarea>
            <input className='comment-button' type="submit" value="Submit" onClick={handleSubmit}></input>
        </>

    )
};

export default UserComments;