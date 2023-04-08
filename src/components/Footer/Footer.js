import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import './Footer.css';

const Footer = () => {

    return (
        <div className="footer-wrapper">

            <ul className="socials">
                <li>
                    <Link to=''><FaInstagram style={{ color: '#0088a9'}} /></Link>
                </li>
                <li>
                    <Link to=''><FaFacebook style={{ color: '#0088a9' }} /></Link>
                </li>
                <li>
                    <Link to=''><FaTwitter style={{ color: '#0088a9' }} /></Link>
                </li>
            </ul>

            <ul className="other-info">
                <li>
                    <Link to=''>Terms of service</Link>
                </li>
                <li>
                    <Link to=''>About</Link>
                </li>
            </ul>

            <p className="copyright">
                &copy; Stamboliev 2023
            </p>
        </div>
    );
};

export default Footer;