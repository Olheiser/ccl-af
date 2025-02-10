"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import styles from "@/styles/HamburgerMenu.module.css";

const HamburgerMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname()
    const menuRef = useRef<HTMLDivElement>(null); // Reference for the menu

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }



    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    // Close menu when pathname changes
    useEffect(() => {
        if (menuOpen) {
            setMenuOpen(false); // Close the menu when navigating to a new page
            
        }
    }, [pathname]); // Trigger whenever the route changes


    return (
        <div ref={menuRef}>
            <button
                className={styles.hamburger}
                onClick={toggleMenu}
                aria-label={menuOpen ? "Open navigation menu" : "Close navigation menu"}
            >
                {menuOpen ? '✖' : '☰'}
            </button>
            <ul className={`${styles.menu} ${menuOpen ? styles.showMenu : ""}`}>
                <li><Link href="/" className={pathname === "/" ? styles.active : ""}>Request an Appearance</Link></li>
                <li><Link href="/request-feed" className={pathname === "/request-feed" ? styles.active : ""}>Request Feed</Link></li>
                <li><Link href="/calendar" className={pathname === "/calendar" ? styles.active : ""}>Calendar</Link></li>
            </ul>
        </div>
    )
}

export default HamburgerMenu;