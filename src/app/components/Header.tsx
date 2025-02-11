import React from "react";
import Image from 'next/image';
import styles from "@/styles/Header.module.css";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../../../public/ccl-logo.webp";
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleBar}>
                <div className={styles.titleRow}>
                    <div>
                        <a href="https://canadacriminallawyer.ca">&larr; Main Site</a>
                    </div>
                    
                    <div className={styles.affiliateContainer}>
                        <a href="https://directory.canadacriminallawyer.ca/pricing-plan/?_gl=1*1k14l3q*_ga*ODg4ODQ3MDcxLjE3MzQ3Mjc2NjI.*_ga_EG3WQLDH2Y*MTczOTEyNzA2NS42LjEuMTczOTEyNzg4OS42MC4wLjA.&_ga=2.224063708.67371319.1739127069-888847071.1734727662">Join Our Network</a>
                        <span className={styles.titleDivider}>|</span>
                        <a href="https://directory.canadacriminallawyer.ca/?_gl=1*1k14l3q*_ga*ODg4ODQ3MDcxLjE3MzQ3Mjc2NjI.*_ga_EG3WQLDH2Y*MTczOTEyNzA2NS42LjEuMTczOTEyNzg4OS42MC4wLjA.&_ga=2.224063708.67371319.1739127069-888847071.1734727662">Directory</a>
                    </div>
                </div>
            </div>
            <div className={styles.headerContainer}>
                <Link href="/">
                    <Image 
                        src={logo}
                        alt="Canada Criminal Lawyer Logo"
                        width={250}
                        height={120}
                        className={styles.logo}
                    />
                </Link>
                <nav>
                    <HamburgerMenu />
                </nav>
            </div> 
        </header>
    )
}

export default Header;

