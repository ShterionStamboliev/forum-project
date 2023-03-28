import { faUser } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

const CommentsLoader = () => {
    const { id } = useParams();
    const [usersComments, setUsersComments] = useState([]);

    const col = query(collection(db, `threads/${id}/comments`));

    const getSnap = async () => {
        const qSnap = await getDocs(col);
        let arr = [];
        let data = [];
        qSnap.forEach((doc) => {
            arr.push({ ...doc.data()['comments']});
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
                return <React.Fragment key={x.id}>
                    <div className="user-comment-icon">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="user-comment-text">
                        {x.comment}
                    </div>

                    <div className="user-comment-name">
                        {x.author}
                    </div>
                </React.Fragment>
            })}
        </>
    );
};

export default CommentsLoader;