'use client'
import Link from "next/link"
import { useEffect, useState } from "react";
import './Navbar.css'

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(true); // State untuk mengelola status collapsed

    useEffect(() => {
        const debounce = (fn) => {
            let frame;
            return (...params) => {
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                frame = requestAnimationFrame(() => {
                    fn(...params);
                });
            }
        };

        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY;
        }

        document.addEventListener('scroll', debounce(storeScroll), { passive: true });
        storeScroll();
    }, []);

    const toggleNavbar = () => {
        setCollapsed(!collapsed); // Toggle status collapsed
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-3 d-block ${!collapsed ? 'bg-white shadow-transition' : ''}`} data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container">
                <Link className="navbar-brand" href="/"><img className="d-inline-block" src="/img/gallery/logo.png" width="50" alt="logo" /><span className="fw-bold text-primary ms-2">YukNgaji</span></Link>
                <button
                    className={`navbar-toggler ${collapsed ? 'collapsed' : ''}`}
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={!collapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0 ${collapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto pt-2 pt-lg-0 font-base">
                        <li className="nav-item px-2">
                            <Link className="nav-link fw-medium active" aria-current="page" href="/kajian">
                                <span className="nav-link-icon text-800 me-1 fas fa-map-marker-alt"></span>
                                <span className="nav-link-text">Kajian </span>
                            </Link>
                        </li>
                        <li className="nav-item px-2">
                            <a className="nav-link" href="#flights">
                                <span className="nav-link-icon text-800 me-1 fas fa-plane"></span>
                                <span className="nav-link-text">Blog</span>
                            </a>
                        </li>
                    </ul>
                    <form>
                        <button className="btn text-800 order-1 order-lg-0 me-2" type="button">Support</button>
                        <button className="btn btn-voyage-outline order-0" type="submit"><span className="text-primary">Sign in</span></button>
                    </form>
                </div>
            </div>
        </nav>
    );
}