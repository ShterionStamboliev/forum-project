import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { UseAuth } from '../../contexts/AuthContext';
import { doc, setDoc, writeBatch, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';

const UserComments = () => {
    const [commentText, setCommentText] = useState('');
    const { user } = UseAuth();
    const { id } = useParams();

    const currentUserId = user.uid;
    const currentUserEmail = user.email;

    const batch = writeBatch(db);
    const threadRef = doc(db, 'threads', id, 'comments', currentUserId);
    console.log(threadRef);


    const handleSubmit = async (e) => {
        e.preventDefault();


        batch.set(threadRef, {
            comments: arrayUnion(
                {
                    author: currentUserEmail,
                    comment: commentText
                }
            )
        }, { merge: true })
        await batch.commit();
        setCommentText('');
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