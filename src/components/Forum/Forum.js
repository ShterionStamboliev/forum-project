import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useState, useEffect } from "react";
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
        <div className="forum-background-body">

            <div className="forum-wrapper-title">

                <div className="forum-wrapper-header">

                    <div className="forum-topic-col">
                        Thread title
                    </div>

                    <div className="forum-author-col">
                        Author
                    </div>

                    <div className="forum-posted-col">
                        Posted at
                    </div>

                </div>

                {threads.length > 0 ? Object.values(threads).map((thread) => {
                    return <div className="forum-wrapper" key={thread.id}>

                        <div className="forum-thread-title">
                            <Link to={`/forum/` + thread.id} className="forum-thread-link">{thread.post.postTitle}</Link>
                        </div>

                        <div className="forum-author-name">
                            {thread.author.name}
                        </div>

                        <div className="forum-post-date">
                            {thread.post.postedOn} at {thread.post.postedAt}
                        </div>

                    </div>
                }) : null}

            </div>

        </div>

    );
};

export default Forum;