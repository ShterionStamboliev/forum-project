import React from 'react';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import { Avatar } from '@mui/material';
import { getAuth } from 'firebase/auth';

const GuestView = ({ thread }) => {
    const auth = getAuth();
    const userImageProfile = auth.currentUser?.photoURL;

    return (
        <>
            {Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>
                    <div className="grid-wrapper">
                        <div className="current-thread-title">
                            {x.post.postTitle}
                        </div>

                        <div className="user-thread-icon center">
                        <Avatar
                                src={userImageProfile}
                                sx={{ width: 56, height: 56 }}
                            />
                        </div>

                        <div className="thread-description">
                            {x.post.postDescription}
                        </div>

                    </div>

                    <div className="grid-wrapper-comments" key={x.id}>
                        <CommentsLoader />
                    </div>

                </React.Fragment>
            })}
        </>
    )
}

export default GuestView;