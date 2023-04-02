import { collection, getDocs, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { db } from '../../config/firebase';
import './comments.css'

const CommentsLoader = () => {
    const [usersComments, setUsersComments] = useState([]);

    const { id } = useParams();

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
    }, []); // PUT USERSCOMMENTS DEPENDANCY HERE FOR AUTO COMMENTS RE-LOAD

    return (
        <>
            {usersComments.map((x) => {
                console.log(x.photo)
                return (
                    <div className="grid-comments" key={x.id}>
                            <Avatar className="user-comment-icon"
                                src={x.photo}
                                sx={{ width: 56, height: 56 }}
                            />

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