"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from '@/styles/LeadForm.module.css';

interface CourtAppearance {
  lawyerName: string;
  email: string;
  province: string;
  courthouseName: string;
  date: string;
  time: string;
  courtroomNumber: string;
  typeOfAppearance: string;
  accusedStatus: string;
  designationStatus: string;
  instructions: string;
}

const LeadForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useRef<HTMLFormElement | null>(null);

  const submitAppearance = async (appearance: CourtAppearance) => {
    const response = await fetch('/api/appearances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appearance),
    });
    if (!response.ok) {
      throw new Error('Failed to add court appearance');
    }
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    if (!form.current) {
      console.error("Form reference is undefined");
      return;
    }

    // Extract form data
    const formData = new FormData(form.current);
    const appearance: CourtAppearance = {
      lawyerName: formData.get('name') as string,
      email: formData.get('email') as string,
      province: formData.get('province') as string,
      courthouseName: formData.get('courthouse') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      courtroomNumber: formData.get('courtroom') as string,
      typeOfAppearance: formData.get('appearanceType') as string,
      accusedStatus: formData.get('accusedStatus') as string,
      designationStatus: formData.get('designationStatus') as string,
      instructions: formData.get('message') as string,
    };

    try {
      // Submit the form data to the API
      await submitAppearance(appearance);
      console.log('Court appearance submitted successfully');

      // Send email using EmailJS
      await emailjs.sendForm(
        "service_zlvlw4s",
        "template_vkqmvak",
        form.current,
        { publicKey: "AP4HXf2HPRERJu4fd" }
      );
      console.log('Email sent successfully');

      // Mark the form as submitted
      setFormSubmitted(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError('Failed to submit form. Please try again.');
    }
  };

  function resetForm() {
    if (form.current) {
      form.current.reset(); // Resets all input fields
    }
    setFormSubmitted(false); // Allow form to be submitted again
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={form}>
      <h2 className={styles.secondaryTitle}>Appearance Information</h2>
      <div className={styles.formContainer}>
        <div>
          <label htmlFor="fullName">Requesting Lawyer Name</label>
          <input type="text" name="name" id="name" required placeholder="Requesting Lawyer Name..." />
        </div>

        <div>
          <label htmlFor="email">Requesting Lawyer Email Address</label>
          <input type="email" name="email" id="email" required placeholder="Email Address..." pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
        </div>

        <div>
          <label htmlFor="province">Province</label>
          <select name="province" id="province" required defaultValue="">
            <option value="" disabled hidden>Select a Province</option>
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

        <div className={styles.dateContainer}>
          <label htmlFor="date">Date of Appearance</label>
          <input type="date" name="date" id="date" required placeholder="Date of Appearance..." min={new Date().toISOString().split("T")[0]}/>
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" min="08:00" max="17:00" required />
        </div>

        <div>
          <label htmlFor="courtroom">Courtroom Number</label>
          <select name="courtroom" id="courtroom" defaultValue="">
          <option value="" disabled hidden>Select a courtroom number</option>
            <option value="none">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div>
          <label htmlFor="appearanceType">Type of Appearance</label>
          <input type="text" name="appearanceType" id="appearanceType" placeholder="Type of Appearance..." />
        </div>

        <div className={styles.radioGroup}>
          <label>Will the Accused be Present?</label>
          <div className={styles.radioRow}>
            <div className={styles.radioContainer}>
              <input type="radio" name="accusedStatus" id="accusedYes" value="Yes" />
              <label htmlFor="accusedYes">Yes</label>
            </div>

            <div className={`${styles.radioContainer} ${styles.rightContainer}`}>
              <input type="radio" name="accusedStatus" id="accusedNo" value="No" />
              <label htmlFor="accusedNo">No</label>
            </div>
          </div>
        </div>

        <div className={styles.radioGroup}>
          <label>Has a Designation Been Filed With the Court?</label>
          <div className={styles.radioRow}>
            <div className={styles.radioContainer}>
              <input type="radio" name="designationStatus" id="designationYes" value="Yes" />
              <label htmlFor="designationYes">Yes</label>
            </div>

            <div className={`${styles.radioContainer} ${styles.rightContainer}`}>
              <input type="radio" name="designationStatus" id="designationNo" value="No" />
              <label htmlFor="designationNo">No</label>
            </div>
          </div>
        </div>

      </div>

      <div>
        <label htmlFor="message">Instructions</label>
        <textarea name="message" id="message" placeholder="Your Message..."></textarea>
      </div>

      {/* Submit and Reset Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.submit} type="submit" disabled={formSubmitted}>
          {formSubmitted ? "Request Sent" : "Submit"}
        </button>

        
        {formSubmitted && (
          <button className={styles.resetButton} onClick={resetForm}>&#10226;</button>
        )}
      </div>

      {formSubmitted && (
        <p className={styles.successMessage}>Thank you! Your request has been submitted.</p>
      )}

      {error && (
        <p className={styles.errorMessage}>{error}</p>
      )}
    </form>
  );
};

export default LeadForm;