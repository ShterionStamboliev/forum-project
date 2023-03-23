import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

const ThreadDetails = () => {

    const { id } = useParams();
    const [thread, setThread] = useState([]);

    const threadRef = doc(db, 'threads', id);

    useEffect(() => {
        const unsubscribe = onSnapshot(threadRef, (doc) => {
            const data = doc.data();
            Object.values(data).forEach((x) => {
                console.log(x);
            });
            setThread(data);
        });
        return () => unsubscribe();
    }, []);


    return (
        <>
            <h1 style={{ textAlign: 'center', color: 'white' }}>Current Thread details</h1>
            {Object.values(thread).map((x) => {
                return <div key={x.id}>
                    <h1 style={{ textAlign: 'center', color: 'white' }}>{x.title}</h1>
                    <h1 style={{ textAlign: 'center', color: 'white' }}>{x.comment}</h1>
                </div>
            })}
        </>
    )
}

export default ThreadDetails;