import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../ContentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <h2><span className='text-info'>Movie-Matrix</span></h2>
                </ul>   
                <div className="infoText">
                Welcome to Movie-Matrix, your ultimate guide to movies and TV shows! Explore, discover, and find your next favorite entertainment with us.
                </div>
                <hr className='linebreak' />
                <div className="rights">
                    <p>&copy; {`${new Date().getFullYear()}`} <span id="currentYear"></span> Movie Matrix | All Rights Reserved</p>
                    <p>Movie-Matrix Team</p>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;