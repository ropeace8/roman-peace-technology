import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import blogLogo from './blog_logo.png';
import './Header.css';
import { FiChevronDown } from "react-icons/fi";

function Header() {
    const [ isConnectOpen, setIsConnectOpen ] = useState(false);
    const [ isAvatarOpen, setIsAvatarOpen ] = useState(false);
    const connectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isConnectOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (connectRef.current && !connectRef.current.contains(e.target as Node)) {
                setIsConnectOpen(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isConnectOpen]);

    useEffect(() => {
        if (!isAvatarOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isAvatarOpen]);

    return (
        <>
            <header className='topbar'>
                <Link to="/" className="blog-brand">
                    <img className='blog-logo' src={blogLogo}></img>
                    <div className="blog-name">
                        <h1>Roman Peace Technology</h1>
                        <p>projects · notes · writing</p>
                    </div>
                </Link>

                <div className="header-links">
                    <Link
                        to="/about"
                        className="link"
                    >
                        About
                    </Link>

                    <a
                        href="https://www.linkedin.com/in/roman-peace/"
                        target="_blank"
                        className="link link-icon"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="icon"/>
                    </a>

                    <a
                        href="mailto:romanpeace888@gmail.com"
                        className="link link-icon"
                        aria-label="Email"
                    >
                        <MdEmail className="icon"/>
                    </a>

                    <div className="connect-wrap" ref={connectRef}>
                        <button
                            type="button"
                            className={`link connect-toggle ${isConnectOpen ? "open" : ""}`}
                            onClick={() => setIsConnectOpen(o => !o)}
                        >
                            <FiChevronDown className="icon chevron" />
                        </button>

                        <div className={`connect-dropdown ${isConnectOpen ? "open" : ""}`}>
                            <a
                                href="https://www.linkedin.com/in/roman-peace/"
                                target="_blank"
                                className="dropdown-item"
                            ><FaLinkedin className="icon"/></a>
                            <a
                                href="mailto:romanpeace888@gmail.com"
                                className="dropdown-item"><MdEmail className="icon"/></a>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="avatar"
                        aria-label="Profile"
                        onClick={() => setIsAvatarOpen(true)}
                    >
                        <img src="roman.jpg" alt="Profile portrait"/>
                    </button>
                </div>
            </header>

            {isAvatarOpen && (
                <div
                    className="avatar-overlay"
                    onClick={() => setIsAvatarOpen(false)}
                >
                    <div
                        className="avatar-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img src="roman.jpg" alt="Profile portrait"/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
