import React from 'react';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Button, Stack } from '@mui/material';
import { UseAuth } from '../../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';

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

                        <Stack className='thread-edit-button' direction="row" spacing={2}>
                            <Link to={`/forum/${id}/edit`}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#24252a;',
                                        color: 'white',
                                        fontSize: '12px',
                                        borderRadius: '50px',
                                        ":hover": { backgroundColor: '#525252' }
                                    }}>
                                    Edit
                                </Button>
                            </Link>
                        </Stack>
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