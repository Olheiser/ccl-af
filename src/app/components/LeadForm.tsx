"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from '@/styles/LeadForm.module.css';
import emailAddress, { ProvinceEmailAddress } from "../util/emailAddresses";
import provinceName, { ProvinceNames } from "../util/provinceNames";
//import emailAddress from "../util/emailAddresses";

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

function formatTimeTo12Hour(time: string): string {
  const [hour, minute] = time.split(':');
  let hours = parseInt(hour, 10);
  const minutes = parseInt(minute, 10);

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  return formattedTime;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
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

      // ==================================================================================================================
      // ==================================================================================================================
      // ==================================================================================================================

      const emailsToSend = emailAddress[appearance.province as keyof ProvinceEmailAddress] || [];
      const provinceEmail = provinceName[appearance.province as keyof ProvinceNames]

      if (emailsToSend.length > 0) {
        const emailData = {
          to: emailsToSend,
          subject: `${appearance.province}: Appearance Request - ${appearance.lawyerName} | ${appearance.courthouseName} ${appearance.date}`,
          text: `${appearance.lawyerName} has submitted a new request for appearance at ${appearance.courthouseName} on ${appearance.date} at ${appearance.time}. You can reach ${appearance.lawyerName} at ${appearance.email} for more information.

                Appearance Information:

                Name: ${appearance.lawyerName}
                Email Address: ${appearance.email}
                Province: ${appearance.province}
                Courthouse: ${appearance.courthouseName}
                Date: ${appearance.date}
                Time: ${appearance.time}
                Courtroom: ${appearance.courtroomNumber}
                Type of Appearance: ${appearance.typeOfAppearance}
                Will the Accused be Present? ${appearance.accusedStatus}
                Has a Designation Been Filed With the Court? ${appearance.designationStatus}
                Message: ${appearance.instructions}
                
                To find an agent in ${appearance.province}, go to https://agentfinder.canadacriminallawyer.ca.`,
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Request for Appearance</title>
  <style>
    /* Reset styles for email clients */
    body, p, h1, h2, ul, li {
      margin: 0;
      padding: 0;
      font-family: Roboto, sans-serif;
    }

    /* Body background */
    body {
      background-color: #F1F4F6;
      padding: 20px 0;
    }

    /* Container for the email content */
    .email-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #FDFDFD;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Red bar at the top */
    .red-bar {
      height: 40px;
      background-color: #bb0000;
    }

    /* Logo styling */
    .logo {
      display: block;
      margin: 20px auto;
      max-height: 110px;
      width: auto;
    }

    /* Heading styling */
    h1 {
      text-align: center;
      font-size: 26px;
      color: #333;
      margin: 20px 0;
      padding-top: 10px;
    }
    
    h2 {
      padding-top: 30px;
      font-fize: 20px;
    }

    p, li, a {
      font-size: 14px;
    }

    /* Content styling */
    .content {
      padding: 0 40px 20px 40px;
      font-family: Roboto, sans-serif;
      color: #333;
      line-height: 22px;
    }

    .content strong {
      color: #000;
    }

    .content ul {
      list-style: none;
      padding-left: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .content ul li {
      line-height: 22px;
    }

    /* Footer styling */
    .footer {
      background-color: #8E0000;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #E0E0E0;
    }

    .footer p, .footer a {
      color: #ffffff;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Red bar -->
    <div class="red-bar"></div>

    <!-- Logo -->
    <a href="https://agentfinder.canadacriminallawyer.ca"><img src="https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/f2494350-a48d-4817-3ac0-48679636d100/public" alt="Logo" class="logo"></a>

    <!-- Heading -->
    <h1>New Request for Appearance</h1>

    <!-- Content -->
    <div class="content">
      <p>
        <strong>${appearance.lawyerName}</strong> has submitted a new request for appearance at 
        <strong>${appearance.courthouseName}</strong> on 
        <strong>${formatDate(appearance.date)}</strong> at 
        <strong>${formatTimeTo12Hour(appearance.time)}</strong>. You can reach 
        <strong>${appearance.lawyerName}</strong> at 
        <strong><a href="mailto:${appearance.email}" style="color: #bb0000; text-decoration: none;">${appearance.email}</a></strong> 
        for more information.
      </p>

      <h2>Appearance Information:</h2>

      <ul>
        <li><strong>Name:</strong> ${appearance.lawyerName}</li>
        <li><strong>Email Address:</strong> ${appearance.email}</li>
        <li><strong>Province:</strong> ${appearance.province}</li>
        <li><strong>Courthouse:</strong> ${appearance.courthouseName}</li>
        <li><strong>Date:</strong> ${formatDate(appearance.date)}</li>
        <li><strong>Time:</strong> ${formatTimeTo12Hour(appearance.time)}</li>
        <li><strong>Courtroom:</strong> ${appearance.courtroomNumber}</li>
        ${appearance.typeOfAppearance && `<li><strong>Type of Appearance:</strong> ${appearance.typeOfAppearance}</li>`}
        ${appearance.accusedStatus && `<li><strong>Will the Accused be Present?</strong> ${appearance.accusedStatus}</li>`}
        ${appearance.designationStatus && `<li><strong>Has a Designation Been Filed With the Court?</strong> ${appearance.designationStatus}</li>`}
        ${appearance.instructions && `<li><strong>Instructions:</strong> ${appearance.instructions}</li>`}
      </ul>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>To find an agent in ${provinceEmail}, go to 
        <a href="https://agentfinder.canadacriminallawyer.ca">https://agentfinder.canadacriminallawyer.ca</a>.
        </strong>
      </p>
    </div>
  </div>
</body>
</html>`,
        };

        // Call the API route to send the email
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send mass email');
      }

      console.log('Mass email sent successfully');
    }

    // ==================================================================================================================
    // ==================================================================================================================
    // ==================================================================================================================

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