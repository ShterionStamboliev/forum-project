import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <div className="home-background"></div>

            <div className="home-welcome">
                <h1 className="home-info">D4jsp is an internet forum for discussions about Diablo games. <br />
                    Here, people can ask their questions and create social connections. </h1>
                <br />
                <div className="forum-rules">
                    <p>Before continuing, please read the  <Link to='/tos' className='tos-link'>Terms of service </Link></p>
                </div>
            </div>
        </>

    );
};

export default Home;