import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { UseAuth } from '../../contexts/AuthContext';
import { doc, writeBatch, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';

const UserComments = () => {
    const [commentText, setCommentText] = useState('');
    const { user } = UseAuth();
    const { id } = useParams();

    const currentUserEmail = user.email;

    const batch = writeBatch(db);
    const threadRef = doc(db, 'threads', id, 'comments', id);


    // ********************************************************

    // const col = query(collection(db, `threads/${id}/comments`));

    // const getSnap = async () => {
    //     const qSnap = await getDocs(col);
    //     let arr = [];
    //     qSnap.forEach((doc) => {
    //         arr.push({ ...doc.data()['comments'] });
    //     });
    //     for (const key of arr.values()) {
    //         let a = Object.values(key);
    //         for (const v of a) {
    //             setAllComments(v);
    //         }
    //     }
    // }
    // getSnap();
    // useEffect(() => {
    //     const a = new AbortController();
    //     getSnap();

    //     return () => a.abort();
    // }, []);
    //////// TO CHECK TOMORROW


    // ****************************************************************

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