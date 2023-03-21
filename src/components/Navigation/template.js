/* 
        <>
            <nav className='nav'>
                <Link to="/" className="title">Home page</Link>
                {authUser ?
                    <ul>
                        <div>{`Hello, ${authUser.email}! `}</div>
                        <li><Link to="/forum">Forum page</Link></li>
                        <li><Link to="/create">Create page</Link></li>
                        <button className="logout-btn" onClick={handleLogout}> Logout</button>
                    </ul> :

                    <ul>
                        <li><Link to="/forum">Forum page</Link></li>
                        <li><Link to="/login">Login page</Link></li>
                        <li><Link to="/register">Register page</Link></li>
                    </ul>
                }
            </nav>
        </>

*/