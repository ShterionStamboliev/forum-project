import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import './ThreadDetails.css'

const ThreadDetails = () => {

    const { id } = useParams();
    const [thread, setThread] = useState([]);

    const threadRef = doc(db, 'threads', id);

    const getDocumentData = async () => {
        const dataRef = await getDoc(threadRef);
        const dataValues = dataRef.data();
        console.log(dataValues);
    };
    // useEffect(() => {
    //     getDocumentData();
    // }, []);

    return (
            <div className="wrapper">

                <div className="current-thread-title">
                    <h1>Forum threads</h1>
                </div>

                <div className="user-thread-icon center">
                    {/* PUT USER IMAGE HERE  */}
                </div>

                <div className="thread-description">
                    {/* PUT THREAD DESCRIPTION HERE */}description
                    descriptiondescriptiondescriptiondescription

                </div>
                <Link to={`/forum/${id}/details`} className='thread-edit-button'>Edit thread</Link> 
                {/* to search for icon */}
            </div>
    )
}

export default ThreadDetails;