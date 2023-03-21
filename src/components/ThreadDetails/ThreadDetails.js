import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, onSnapshot, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { UseAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ThreadDetails = () => {
    const { user } = UseAuth();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [dataRef, setDataRef] = useState([]);
    const navigate = useNavigate();
    const threadRef = doc(db, 'threads', id);

    // const getSnap = async () => {
    //     const docSnap = await getDoc(threadRef);
    //     const snapDoc = docSnap.data();
    //     console.log(snapDoc);
    // }
    // getSnap();

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
                    deleteDoc(threadRef);
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    navigate('/forum');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your file is safe :)',
                        'error'
                    )
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '' || comment === '') {
            return
        };
    };

    return (
        <div>
            <h3>Edit thread</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Update title: </label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label htmlFor="comment">Update comment: </label>
                <input type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <br />
                <button onClick={handleDelete}>Delete post</button>
            </form>
        </div>
    );
};

export default ThreadDetails;