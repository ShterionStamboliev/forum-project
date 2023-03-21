import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import './Footer.css';

const Footer = () => {

    const [color, setColor] = useState(`rgba(0, 136, 169, 1)`);

    return (
        <section className="footer">
            <div className="socials">
                <Link to=''><FaInstagram style={{ color: color }} /></Link>
                <Link to=''><FaFacebook style={{ color: color }} /></Link>
                <Link to=''><FaTwitter style={{ color: color }} /></Link>
            </div>

            <ul className="socials-list">
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
        </section>
    );
};

export default Footer;