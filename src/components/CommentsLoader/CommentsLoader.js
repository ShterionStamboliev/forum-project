import { collection, getDocs, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { db } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import './comments.css'

const CommentsLoader = () => {
    const { id } = useParams();
    const [usersComments, setUsersComments] = useState([]);

    const auth = getAuth();
    const userImageProfile = auth.currentUser?.photoURL;


    const col = query(collection(db, `threads/${id}/comments`));

    const getSnap = async () => {
        const qSnap = await getDocs(col);
        let arr = [];
        let data = [];
        qSnap.forEach((doc) => {
            arr.push({ ...doc.data()['comments'] });
        });
        for (const key of arr.values()) {
            let a = Object.values(key);
            for (const v of a) {
                data.push(v);
            };
        };
        setUsersComments(data);
    };

    useEffect(() => {
        const a = new AbortController();
        getSnap();

        return () => a.abort();
    }, []);


    return (
        <>
            {usersComments.map((x) => {
                return (
                    <div className="grid-comments" key={x.id}>
                        <div className="user-comment-icon">
                            <Avatar
                                src={userImageProfile}
                                sx={{ width: 56, height: 56 }}
                            />
                        </div>

                        <div className="user-comment-name">
                            {x.author}
                        </div>

                        <div className="user-comment-text">
                            {x.comment}
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default CommentsLoader;