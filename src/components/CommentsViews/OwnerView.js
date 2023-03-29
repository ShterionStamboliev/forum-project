import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import { faPenSquare } from '@fortawesome/fontawesome-free-solid';
import { Link, useParams } from 'react-router-dom';

const OwnerView = ({ thread }) => {

    const { id } = useParams();

    return (
        <>
            {Object.values(thread).map((x) => {
                return <React.Fragment key={x.id}>
                    <div className="grid-wrapper">
                        <div className="current-thread-title">
                            {x.post.postTitle}
                        </div>

                        <div className="user-thread-icon center">
                            <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
                        </div>

                        <div className="thread-description">
                            {x.post.postDescription}
                        </div>

                        <Link to={`/forum/${id}/edit`} className='thread-edit-button'><FontAwesomeIcon icon={faPenSquare} /></Link>
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