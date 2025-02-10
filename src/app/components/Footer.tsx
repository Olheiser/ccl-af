import React from "react";
import Image from 'next/image';
import styles from "@/styles/Footer.module.css";
import logo from "../../../public/footer-logo.png";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerItemRow}>
                    {/* CCL Logo */}
                    <div className={styles.footerItemWrap}>
                        <Image 
                            width={300}
                            height={61}
                            src={logo}
                            alt="Canada Criminal Lawyer White Logo"
                        />

                        <p>Need a criminal lawyer to appear on your behalf? You&apos;re in the right place. Agent Finder makes it easy to find counsel to appear for your case.<br /><br />
                        <strong>Support:</strong> <a href="mailto:admin@canadacriminallawyer.ca">admin@canadacriminallawyer.ca</a>
                        </p>
                    </div>

                    {/* Join Our Network */}
                    <div className={styles.footerItemWrap}>
                        <h2 className={styles.footerHeader}>Join Our Network</h2>
                        <p>Join our Canada-wide network of criminal defence lawyers to receive 1st priority for client leads in your area code.</p>
                        <a href="https://directory.canadacriminallawyer.ca/pricing-plan/?_gl=1*1lant51*_ga*ODg4ODQ3MDcxLjE3MzQ3Mjc2NjI.*_ga_EG3WQLDH2Y*MTczOTE0NDM0Ny43LjAuMTczOTE0NDM0Ny42MC4wLjA.&_ga=2.176821602.67371319.1739127069-888847071.1734727662">
                            <button>Become an Affiliate</button>
                        </a>
                    </div>

                    {/* Directory */}
                    <div className={styles.footerItemWrap}>
                        <h2 className={styles.footerHeader}>Directory</h2>
                        <p>Are you a criminal lawyer looking to grow your practice? Join our directory today and connect with clients in need of criminal defence services.</p>
                        <a href="https://directory.canadacriminallawyer.ca/?_gl=1*1od33l*_ga*ODg4ODQ3MDcxLjE3MzQ3Mjc2NjI.*_ga_EG3WQLDH2Y*MTczOTE0NDM0Ny43LjAuMTczOTE0NDM0Ny42MC4wLjA.&_ga=2.226302301.67371319.1739127069-888847071.1734727662">
                            <button>Join Our Directory</button>
                        </a>
                    </div>
                </div>
                <div className={styles.footerSitemap}>
                    <h2 className={styles.footerHeader}>Sitemap</h2>
                    <ul className={styles.footerUl}>
                        <li><Link href="/">Request an Appearance</Link></li>
                        <li><Link href="/request-feed">Request Feed</Link></li>
                        <li><Link href="/calendar">Calendar</Link></li>
                    </ul>
                </div>
                <section className={styles.legalContainer}>
                    <div className={styles.legalDiv}>
                        <p className={styles.copyright}>© 2025 Canada Criminal Lawyer. All Rights Reserved. <a href="https://directory.canadacriminallawyer.ca/terms-of-service/">Terms of Service.</a> <a href="https://canadacriminallawyer.ca/privacy-policy/">Privacy Policy and Website Agreement.</a></p>
                        <p className={styles.termsOfService}><em>All lawyers displayed on www.canadacriminallawyer.ca are independent and have absolutely no affiliation or association (professional, legal, financial or otherwise) with each other. The content on this website represents the views of www.canadacriminallawyer.ca and not of the individual lawyers or their respective law firms.</em></p>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer;

