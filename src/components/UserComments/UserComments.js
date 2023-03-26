import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';


const UserComments = () => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        


    };

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };


    return (
        <>
            <div className="user-comments-img">
                <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
            </div>
            <textarea value={commentText} onChange={handleChange} name="userComment" id="userComment" className="user-comments-area"></textarea>
            <input className='comment-button' type="submit" value="Submit" onClick={handleSubmit}></input>
        </>

    )
};

export default UserComments;