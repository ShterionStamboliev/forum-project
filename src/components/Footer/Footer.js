import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import './Footer.css';

const Footer = () => {

    return (
        <div className="footer-wrapper">

            <ul className="socials">
                <li>
                    <Link to='https://github.com/ShterionStamboliev' className="github-page"><FaGithub style={{ color: '#0088a9' }} /></Link>
                </li>
            </ul>

            <ul className="other-info">
                <li>
                    <Link to='/tos' className="tos-footer">Terms of service</Link>
                </li>
            </ul>

            <p className="copyright">
               D4jsp &copy; Stamboliev 2023
            </p>
        </div>
    );
};

export default Footer;