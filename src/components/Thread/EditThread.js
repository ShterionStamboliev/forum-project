import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { runEmptyFieldAlert } from '../../utils/alerts';
import Swal from 'sweetalert2';
import { UseAuth } from '../../contexts/AuthContext';
import './Thread.css';

const EditThread = () => {
    const { id } = useParams();
    const { user } = UseAuth();
    const [value, setValue] = useState({
        title: '',
        comment: ''
    });

    const navigate = useNavigate();

    const threadRef = doc(db, 'threads', id);

    const usrRef = doc(db, 'users', user.uid);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const docSnap = threadRef;

        if (value.title === '' || value.comment === '') {
            runEmptyFieldAlert();
            return;
        };
        try {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    updateDoc(docSnap, {
                        'post.postTitle': value.title,
                        'post.postDescription': value.comment,
                        'post.lastUpdated': new Date().toLocaleDateString(),
                        'author.photo': user.photoURL
                    })
                    Swal.fire('Saved!', '', 'success')
                        .then(() => navigate('/forum'))
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    updateDoc(usrRef, {
                        [`posts.${id}`]: deleteField()
                    });
                    deleteDoc(threadRef);
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then(() => navigate('/forum'))
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your file is safe :)',
                        'error'
                    )
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="update-post-container">
                <div>
                    <h1 className="update-post">Update post</h1>
                </div>
                <div className="update-post-title">
                    <label
                        className="update-post-title-label"
                        htmlFor="update-post-title">Update title:
                    </label>

                    <input
                        value={value.title}
                        onChange={handleEventSubmit}
                        className="update-post-title-input"
                        type="text"
                        name="title"
                        id="updateTitle"
                        placeholder="Update title..."
                    />
                </div>

                <div className="update-post-comment">
                    <label
                        className="update-post-comment-label"
                        htmlFor="update-post-comment">Update comment:
                    </label>

                    <textarea
                        value={value.comment}
                        onChange={handleEventSubmit}
                        className="update-post-comment-input"
                        type="text"
                        name="comment"
                        id="updateComment"
                        cols="30"
                        rows="10"
                        placeholder="Update comment...">
                    </textarea>
                </div>
                <input type="submit" onClick={handleUpdate} className="update-btn-submit-post" value="Update" />
                <input type="submit" onClick={handleDelete} className="update-btn-delete-post" value="Delete" />
            </div>
        </>
    );
};

export default EditThread;