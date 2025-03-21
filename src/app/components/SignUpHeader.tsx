import React from "react";
import styles from "@/styles/SignUpHeader.module.css";


const SignUpHeader = () => {
    return (
        <div className={styles.signUpContainer}>
            <div className={styles.signUpRow}>
                <p>To add yourself to Agent Finder, email <a className={styles.signupLink} href="mailto:agentfinder@canadacriminallawyer.ca">agentfinder@canadacriminallawyer.ca</a></p>
            </div>
        </div>
    )
}

export default SignUpHeader;