import React from 'react';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { UseAuth } from '../../contexts/AuthContext';

const OwnerView = ({ thread }) => {

    const { id } = useParams();
    const { user } = UseAuth();
    return (
        <>
            {Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>
                    <div className="grid-wrapper">

                        <div className="user-thread-name">
                            {x.author.name}
                        </div>

                        <div className="current-thread-title">
                            {x.post.postTitle}
                        </div>

                        <Avatar className="user-thread-icon"
                            src={user.photoURL} alt='User'
                            sx={{ width: 56, height: 56 }}
                        />

                        <div className="thread-description">
                            {x.post.postDescription}
                        </div>

                        <Link to={`/forum/${id}/edit`} className='thread-edit-button'><svg xmlns="http://www.w3.org/2000/svg" className='edit-button-icon' viewBox="14 35 420 440"><path d="M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 177.9L102.4 313.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 242c2.3-2.3 2.3-6.1 0-8.5L246.7 178c-2.5-2.4-6.3-2.4-8.6-.1zM345 165.1L314.9 135c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 199c9.3-9.3 9.3-24.5 0-33.9z" /></svg></Link>
                    </div>

                    <div className="grid-wrapper-comments" key={x.id}>
                        <CommentsLoader />
                    </div>

                </React.Fragment>
            })}
        </>
    );
};

export default OwnerView;