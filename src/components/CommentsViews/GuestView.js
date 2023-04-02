import React from 'react';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import { Avatar } from '@mui/material';

const GuestView = ({ thread }) => {

    return (
        <>
            {Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>
                    <div className="grid-wrapper">
                        <div className="current-thread-title">
                            {x.post.postTitle}
                        </div>

                            <Avatar className="user-thread-icon"
                                src={x.author.photo}
                                sx={{ width: 56, height: 56 }}
                            />

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