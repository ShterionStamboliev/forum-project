import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { UseAuth } from '../../contexts/AuthContext';
import { doc, writeBatch, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import CommentsLoader from '../CommentsLoader/CommentsLoader';

const LoggedInUserView = ({ thread }) => {
    const [commentText, setCommentText] = useState('');
    const { user } = UseAuth();
    const { id } = useParams();

    const currentUserEmail = user.email;

    const batch = writeBatch(db);
    const threadRef = doc(db, 'threads', id, 'comments', id);

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
            {Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>
                    <div className="grid-wrapper">
                        <div className="current-thread-title">
                            {x.post.postTitle}
                        </div>

                        <div className="user-thread-icon center">
                            <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                        </div>

                        <div className="thread-description">
                            {x.post.postDescription}
                        </div>
                    </div>

                    <div className="grid-wrapper-comment">
                        <div className="user-comments-img">
                            <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                        </div>
                        <textarea value={commentText} onChange={handleChange} name="textarea" id="textarea" className="user-comments-area" placeholder='Leave a comment...'></textarea>
                        <input className='comment-button' type="submit" value="Submit" onClick={handleSubmit}></input>
                    </div>

                    <div className="grid-wrapper-comments" key={x.id}>
                        <CommentsLoader />
                    </div>

                </React.Fragment>

            })}
        </>
    )

};
export default LoggedInUserView;