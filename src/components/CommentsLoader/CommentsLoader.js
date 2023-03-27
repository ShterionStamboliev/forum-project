import { faUser } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';


const CommentsLoader = () => {
    const { id } = useParams();
    const [usersComments, setUsersComments] = useState([]);


    return (
        <React.Fragment>
            {Object.values(usersComments).map((x) => {
                return <>
                    <div className="user-comment-icon">
                        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                    </div>

                    <div className="user-comment-text">
                        {x.comment}
                    </div>

                    <div className="user-comment-name">
                        {x.author}
                    </div>
                </>
            })}
        </React.Fragment>
    );
};

export default CommentsLoader;