import { useState } from "react";
import { db, auth } from '../../config/firebase';
import { collection, addDoc, updateDoc, writeBatch, doc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
    runSuccessfulPostCreation,
    runEmptyThreadTitleInput,
    runEmptyDescriptionInput
} from "../../utils/alerts";
import './Create.css';

const CreateThread = () => {
    const [value, setValue] = useState({
        title: '',
        description: '',
    });

    const userId = auth.currentUser?.uid;
    const userRef = doc(db, 'users', userId);
    const batch = writeBatch(db);

    const navigate = useNavigate();

    const threadsCollection = collection(db, "threads");

    const handleEventSubmit = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const onSubmitThread = async () => {
        try {
            if (value.title === '') {
                runEmptyThreadTitleInput();
                return;
            } else if (value.description === '') {
                runEmptyDescriptionInput();
                return;
            }

            await addDoc(threadsCollection, {
                author: {
                    owner: auth?.currentUser?.uid,
                    name: auth?.currentUser?.email,
                    photo: auth?.currentUser.photoURL
                },
                post: {
                    postTitle: value.title,
                    postDescription: value.description,
                    postedOn: new Date().toLocaleDateString(),
                    postedAt: new Date().toLocaleTimeString(),
                },
            }).then(async (doc) => {
                const docId = doc.id;
                await updateDoc(userRef, {
                    posts: arrayUnion({
                        postId: docId,
                        postTitle: value.title,
                        postDescription: value.description
                    })
                });
            });
            await batch.commit();
            runSuccessfulPostCreation();
            setValue('');
            navigate('/forum');
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="create-post-container">

            <div>
                <h1 className="create-post-title">Create new post</h1>
            </div>

            <div className="post-title">
                <label className="post-title-label" htmlFor="post-title">Thread title: </label>

                <input
                    value={value.title}
                    onChange={handleEventSubmit}
                    className="post-title-input"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter thread title..."
                />
            </div>

            <div className="post-comment">
                <label className="post-comment-label" htmlFor="post-comment">Description: </label>

                <textarea
                    value={value.description}
                    onChange={handleEventSubmit}
                    className="post-comment-input"
                    type="text"
                    name="description"
                    id="comment"
                    cols="30"
                    rows="10"
                    placeholder="Set thread description...">
                </textarea>

            </div>

            <input type="submit" onClick={onSubmitThread} className="btn-submit" value="Submit" />
        </div>
    );
};

export default CreateThread;