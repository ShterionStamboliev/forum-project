import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { UseAuth } from '../../contexts/AuthContext';
import OwnerView from '../CommentsViews/OwnerView';
import GuestView from '../CommentsViews/GuestView';
import LoggedInUserView from '../CommentsViews/LoggedInUserView';
import './ThreadDetails.css'

const ThreadDetails = () => {

    const { user } = UseAuth();
    const { id } = useParams();
    const [thread, setThread] = useState({});
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
    
    const avatarUpdate = async () => {
        await updateDoc(threadRef, {
            'author.photo': user.photoURL
        });
    };

    useEffect(() => {
        const abortController = new AbortController();
        owners().then((res) => setIsOwner(res));
        if (isOwner) {
            avatarUpdate();
        }
        return () => abortController.abort();
    }, [user]);

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

    return (
        <div className="wrapper">
            {isOwner ?
                <OwnerView thread={thread} /> :
                !isOwner && user ?
                    <LoggedInUserView thread={thread} /> :
                    !isOwner && !user ?
                        <GuestView thread={thread} /> :
                        null}
        </div>
    )
};
export default ThreadDetails;