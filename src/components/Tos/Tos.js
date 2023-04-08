import React from 'react';
import './Tos.css';

const Tos = () => {
    return (
        <>
            <div className="tos-background"></div>

            <div className="forum-tos-rules">
                <h1>Forum rules</h1>
                <br />
                <h2>Posting rules</h2>
                <p>- Don't spam the forum /posting advertising, one-word posts, posts that add no value to the community/ <br /> Doing so will result in account <b>warning</b>.</p>
                <p>- Don't be rude to other Members or Moderators.</p>
                <p>- <b>DO NOT</b> post any racist or homophobic messages, nor talk about illegal activities.</p>
                <p>- Don't post religious or political topics.</p>
                <p>- Don't advertise other similar sites.</p>
                <br />
                <h2>Language</h2>
                <p>- Please use only English</p>
                <p>- Infringement results in <b>warning</b></p>
                <br />
                <h2>Avatars</h2>
                <p>- Please <b>DO NOT</b> use adult images.</p>
                <p>- Do not use links to other websites in your avatar.</p>
                <p>- Infringement results in <b>warning</b>.</p>
            </div>
        </>
    )
};

export default Tos;