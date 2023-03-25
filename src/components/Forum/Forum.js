import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useState, useEffect } from "react";
import { BsCardText } from 'react-icons/bs';
import './Template.css';
import { Link } from "react-router-dom";

const Forum = () => { // SHOW FORUM THREADS HERE
    const [threads, setThreads] = useState([]);
    const threadsCollectionRef = collection(db, "threads");

    useEffect(() => {
        try {
            const threadData = query(threadsCollectionRef);
            const unsubscribe = onSnapshot(threadData, (querySnapshot) => {
                let threadsArray = [];
                querySnapshot.forEach((doc) => {
                    threadsArray.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setThreads(threadsArray);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error.message);
        }
    }, [threadsCollectionRef]);


    return (
        <div className="container">
            <div className="forum">
                <div className="forum-title">
                    <h1>Forum threads</h1>
                </div>
                {threads.length > 0 ?
                    Object.values(threads).map((x) => {
                        return <div key={x.id} className="forum-row">
                            <div className="forum-icon subform-column center">
                                <BsCardText style={{ fontSize: '25px', color: '#ecf0f1' }} />
                            </div>
                            <div className="forum-description subform-column">
                                <h1><Link to={`/forum/` + x.id} className="thread-title">{x.post.title}</Link></h1>
                            </div>
                            <div className="forum-post subform-column center">
                                <span>Comments {x.post.comments.length}</span>
                            </div>
                            <div className="forum-post-info subform-column">
                                <b>Posted by {x.author.name} </b>
                                <br />
                                On {x.post.postedOn} at {x.post.postedAt}
                            </div>
                        </div>
                    }) :
                    <div className="no-posts">
                        There are no threads yet. Be the first one to make a <Link to='/create-thread' style={{ textDecoration: 'underline', fontSize: '25px' }}><i>post!</i></Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Forum;