import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useState, useEffect } from "react";
import { BsCardText } from 'react-icons/bs';
import { Link } from "react-router-dom";
import './Forum.css';

const Forum = () => {
    const [threads, setThreads] = useState([]);
    const threadsCollectionRef = collection(db, "threads");

    
    useEffect(() => {
        try {
            getDocs(threadsCollectionRef)
                .then((res) => {
                    const threadsArr = [];
                    res.forEach((doc) => {
                        threadsArr.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    setThreads(threadsArr);
                })
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return (
        <div className="container">
            <div className="forum">
                <div className="forum-title">
                    Forum threads
                </div>
                {threads.length > 0 ?
                    Object.values(threads).map((x) => {
                        return <div key={x.id} className="forum-row">
                            <div className="forum-icon subform-column center">
                                <BsCardText style={{ fontSize: '25px', color: '#ecf0f1' }} />
                            </div>
                            <div className="forum-description subform-column">
                                <Link to={`/forum/` + x.id} className="thread-title">{x.post.postTitle}</Link>
                            </div>
                            <div className="forum-post subform-column center">
                            </div>
                            <div className="forum-post-info subform-column">
                                Posted by {x.author.name}
                                <br />
                                On {x.post.postedOn} at {x.post.postedAt}
                            </div>
                        </div>
                    }) :
                    <div className="no-posts">
                        There are no threads yet. Be the first one to make a <Link to='/create-thread'
                            style={{ textDecoration: 'underline', fontSize: '25px' }}><i>post!</i></Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Forum;