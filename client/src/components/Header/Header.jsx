import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])
    // console.log(location)
    
    const controlNavbar = () => {
        if(window.scrollY > 200) {
            if(window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
      window.addEventListener('scroll', controlNavbar);
      return () => {
          window.removeEventListener('scroll', controlNavbar);
      }
    }, [lastScrollY])
    

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }
    
    const opemMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);

    }
    // chech for the Authentication Token
    const isAuth = !!localStorage.getItem("authToken");

    const navigationHandler = (type) => {
        if(type === 'movies') {
            navigate("/explore/movie");
        }
        else if(type === 'tv') {
            navigate("/explore/tv")
        }
        else if(type === 'signup') {
            navigate("/signup")
        }
        else if(type === 'login') {
            navigate("/login")
        }
        setMobileMenu(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/login')
        setMobileMenu(false);
    }
    
    const searchQueryHandler = (e) => {
        if(e.key == "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false);
            }, 1000)
        }
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" />
                    <h1><span className='text-info'>MOVIE-MATRIX</span></h1>
                </div>
                <ul className="menuItems">
                { isAuth ?
                    <>
                        <li className="menuItem" onClick={() => navigationHandler("movies")}>Movies</li>
                        <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
                        <li className="menuItem search">
                            <HiOutlineSearch onClick={openSearch} />
                        </li>
                        <li className="menuItem logBtn" onClick={() => handleLogout()}>Log out</li>
                    </> :
                    <>
                        { location.pathname === '/login' ? 
                        <li className="menuItem logBtn" onClick={() => navigationHandler('signup')}>Sign in</li> :
                        <li className="menuItem logBtn" onClick={() => navigationHandler('login')}>Log in</li>
                        }
                    </>
                }
                </ul>
                <div className="mobileMenuItems">
                    {isAuth && <HiOutlineSearch onClick={openSearch}/> }
                    { mobileMenu ? (<VscChromeClose onClick={() => {setMobileMenu(false)}} />) : (<SlMenu onClick={opemMobileMenu}/>) }
                </div>
            </ContentWrapper>
            { isAuth && showSearch && <div className="searchBar">
                <ContentWrapper >
                <div className="searchInput">
                    <input type="text" placeholder='Search for a movie or tv show...' onChange={(e) => {setQuery(e.target.value)}} onKeyUp={searchQueryHandler} />
                    <VscChromeClose onClick={() => {setShowSearch(false)}} />
                </div>
                </ContentWrapper>         
            </div>}
        </header>
    );
};

export default Header;