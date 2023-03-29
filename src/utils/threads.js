function userView(thread) {
    const threads = Object.values(thread);
    const result = [];
    threads.map((topic) => {
        result.push(
        `<div className="grid-wrapper">
            
            <div className="current-thread-title">
                {${topic.post.postTitle}
            </div>

            <div className="user-thread-icon center">
                <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
            </div>

            <div className="thread-description">
                {${topic.post.postDescription}
            </div>

            <Link to={/forum/${id}/edit} className='thread-edit-button'><FontAwesomeIcon icon={faPenSquare} /></Link>

        </div>`
        )
    });
    console.log(result);
};
userView(thread);