import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { UseAuth } from '../../contexts/AuthContext'
import UserComments from '../UserComments/UserComments';
import './grid_old.css'
import { faPenSquare } from '@fortawesome/fontawesome-free-solid';

const ThreadDetails = () => {
    // QUERY TO CHECK IF THE CURRENT USER ID IS EQUAL TO THE CURRENT DOCUMENT OWNER ID 
    const { user } = UseAuth();
    const { id } = useParams();
    const [thread, setThread] = useState([]);
    const [usersComments, setUsersComments] = useState([]);
    const [isOwner, setIsOwner] = useState(null);

    const threadRef = doc(db, 'threads', id);
    const currentUserId = user?.uid;

    const owners = () => getDoc(threadRef)
        .then((res) => {
            const usr = res.get('author.owner');
            const owner = usr === currentUserId;
            return owner;
        });

    const prom = Promise.resolve(owners());
    prom.then(function (val) {
        const owner = val;
        return owner;
    });

    useEffect(() => {
        const abortController = new AbortController();
        owners().then((res) => setIsOwner(res));

        return () => abortController.abort();
    }, []);


    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(threadRef, (doc) => {
                let arr = [];
                arr.push({ ...doc.data(), id: doc.id });
                setThread(arr);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    // PUT USERS COMMENTS IN COMMENTS COLLECTION AND SET THE DOC ID WITH THE CURRENT DOC ID
    // THEN SET THE DOC WITH WRITEBATCH AND MAP THE COMMENTS INSIDE


    return (
        <div className="wrapper">
            {isOwner ? Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>

                    <div className="current-thread-title">
                        {x.post.postTitle}
                    </div>

                    <div className="user-thread-icon center">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="thread-description">
                        {x.post.postDescription}
                    </div>

                    <Link to={`/forum/${id}/edit`} className='thread-edit-button'><FontAwesomeIcon icon={faPenSquare} /></Link>


                    <div className="user-comment-icon">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="user-comment-text">
                        User comment here
                    </div>

                </React.Fragment>
            }) : !isOwner && user ? Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>

                    <div className="current-thread-title">
                        {x.post.postTitle}
                    </div>

                    <div className="user-thread-icon center">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="thread-description">
                        {x.post.postDescription}
                    </div>

                    <UserComments />

                    <div className="user-comment-icon">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="user-comment-text">
                        Users comments here
                    </div>
                    <div className="user-comment-name">

                    </div>

                </React.Fragment>
            }) : null}

        </div>
    )
};
export default ThreadDetails;