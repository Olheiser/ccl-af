"use client"

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from '@/styles/LeadForm.module.css';

const LeadForm = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const form = useRef<HTMLFormElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!form.current) {
            console.error("Form reference is undefined");
            return;
        }

        emailjs
            .sendForm("service_zlvlw4s", "template_xvkv9vq", form.current, {
                publicKey: "AP4HXf2HPRERJu4fd"
            })
            .then(
                () => {
                    console.log("SUCCESS!");
                    // Add form submission logic here (e.g., API call)
                    setFormSubmitted(true);
                },
                (error) => {
                    console.log("FAILED...", error.text);
                },
            );  
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} ref={form}>
            <h2 className={styles.secondaryTitle}>Appearance Information</h2>
            <div className={styles.formContainer}>

                <div>
                    <label htmlFor="fullName">Requesting Lawyer Name</label>
                    <input type="text" name="name" id="name" 
                        required placeholder="Requesting Lawyer Name..."/>
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" required placeholder="Email Address..." pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                </div>

                <div>
                <label htmlFor="province">Province</label>
                <select name="province" id="province" required>
                    <option value="" disabled>Province...</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="YT">Yukon</option>
                </select>
                </div>

                <div>
                    <label htmlFor="courthouse">Courthouse Name</label>
                    <input type="text" name="courthouse" id="courthouse" required placeholder="Courthouse Name..." />
                </div>

                <div>
                    <label htmlFor="date">Date of Appearance</label>
                    <input type="date" name="date" id="date" required placeholder="Date of Appearance..."/>
                </div>

                <div>
                    <label htmlFor="date">Time</label>
                    <input type="text" name="time" id="time" required placeholder="Time..."/>
                </div>

                <div>
                    <label htmlFor="courtroom">Courtroom Number</label>
                    <input type="text" name="courtroom" id="courtroom" required placeholder="Courtroom Number..."/>
                </div>

                <div>
                    <label htmlFor="appearanceType">Type of Appearance</label>
                    <input type="text" name="appearanceType" id="appearanceType" required placeholder="Type of Appearance..."/>
                </div>
            </div>

            <div>
                <label htmlFor="message">Instructions</label>
                <textarea name="message" id="message" required placeholder="Your Message..."></textarea>
            </div>

            <button className={styles.submit} type="submit" disabled={formSubmitted}>
                {formSubmitted ? "Request Sent" : "Submit"}
            </button>

            {formSubmitted && (
                <p className={styles.successMessage}>Thank you! Your request has been submitted.</p>
            )}
        </form>
    )
}

export default LeadForm;