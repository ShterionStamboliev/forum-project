import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import './Footer.css';

const Footer = () => {

    const [color, setColor] = useState(`rgba(0, 136, 169, 1)`);

    return (
        <div className="footer-wrapper">

            <ul className="socials">
                <li>
                    <Link to=''><FaInstagram style={{ color: color }} /></Link>
                </li>
                <li>
                    <Link to=''><FaFacebook style={{ color: color }} /></Link>
                </li>
                <li>
                    <Link to=''><FaTwitter style={{ color: color }} /></Link>
                </li>
            </ul>

            <ul className="other-info">
                <li>
                    <Link to=''>Services</Link>
                </li>
                <li>
                    <Link to=''>About</Link>
                </li>
                <li>
                    <Link to=''>Privacy Policy</Link>
                </li>
            </ul>

            <p className="copyright">
                Stamboliev @ 2023
            </p>
        </div>
    );
};

export default Footer;