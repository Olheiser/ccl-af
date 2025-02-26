"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from '@/styles/LeadForm.module.css';
import emailAddress, { ProvinceEmailAddress } from "../util/emailAddresses";
import { appearanceEmailTemplate } from "../util/appearanceEmailTemplate";
import confirmationEmailTemplate from "../util/confirmationEmailTemplate";
import { StylesConfig } from "react-select";
//import emailAddress from "../util/emailAddresses";
//import CourthouseSelect from "./CourthouseSelect";
import dynamic from "next/dynamic";

interface OptionType {
  value: string;
  label: string;
  province: string;
}

const leadAutoCompleteStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    padding: '2px 5px 2px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '12px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '3px',
    backgroundColor: '#ffffff',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    '&:focus': {
      borderColor: '#888',
      outline: 'none',
      boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.15)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: state.isFocused ? '#ffffff' : '#333333', // Change font color on hover
    fontSize: '14px',
    backgroundColor: state.isSelected
      ? '#f0f0f0' // Background color for selected option
      : state.isFocused
      ? '#007bff' // Background color for hovered option
      : '#ffffff', // Default background color
    '&:active': {
      backgroundColor: '#0056b3', // Background color when the option is clicked
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
};

const CourthouseSelect = dynamic(() => import("./CourthouseSelect"), {
  ssr: false,
});;

interface CourtAppearance {
  lawyerName: string;
  email: string;
  phone: string;
  contactMethod: string;
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
  const [province, setProvince] = useState<string>("");
  const [courthouse, setCourthouse] = useState<string>("");

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    setProvince(newProvince);
    setCourthouse(""); // Reset courthouse when province changes
  };

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

    if (!courthouse) {
      setError("Courthouse is required.");
      return;
    }

    if (!form.current) {
      console.error("Form reference is undefined");
      return;
    }

    // Extract form data
    const formData = new FormData(form.current);
    const appearance: CourtAppearance = {
      lawyerName: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      contactMethod: formData.get('contactMethod') as string,
      province: formData.get('province') as string,
      courthouseName: courthouse,
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
      console.log(`Emails to send: ${emailsToSend}`)
      console.log(`Appearance.email: ${appearance.email}`)

      // Filter out the submitted email address from the Appearances email list (if it exists)
      const filteredEmailsToSend = emailsToSend.filter(email => email !== appearance.email);
      console.log(`Filtered Emails: ${filteredEmailsToSend}`)

      if (filteredEmailsToSend.length > 0) {
        const emailData = {
          to: filteredEmailsToSend,
          subject: `${appearance.province}: Appearance Request - ${appearance.lawyerName} | ${appearance.courthouseName} ${appearance.date}`,
          text: `${appearance.lawyerName} has submitted a new request for appearance at ${appearance.courthouseName} on ${appearance.date} at ${appearance.time}. You can reach ${appearance.lawyerName} at ${appearance.email} for more information.

                Appearance Information:

                Requesting Lawyer's Name: ${appearance.lawyerName}
                Requesting Lawyer's Email Address: ${appearance.email}
                Requesting Lawyer's Phone Number: ${appearance.phone}
                Preferred Contact Method: ${appearance.contactMethod}
                Province: ${appearance.province}
                Courthouse: ${appearance.courthouseName}
                Date of Appearance: ${appearance.date}
                Time: ${appearance.time}
                Courtroom Number: ${appearance.courtroomNumber}
                Type of Appearance: ${appearance.typeOfAppearance}
                Will the Accused be Present? ${appearance.accusedStatus}
                Has a Designation Been Filed With the Court? ${appearance.designationStatus}
                Message: ${appearance.instructions}
                
                To find an agent in ${appearance.province}, go to https://agentfinder.canadacriminallawyer.ca.`,
          html: appearanceEmailTemplate(appearance),
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

    const confirmationEmailData = {
      to: appearance.email,
      subject: `Confirmation of Appearance Request - ${appearance.lawyerName} at ${appearance.courthouseName} on ${appearance.date}`,
      text: `Dear ${appearance.lawyerName},\n\nYour request for appearance at ${appearance.courthouseName} on ${appearance.date} at ${appearance.time} has been received. Thank you, The Agent Finder Team.`,
      html: confirmationEmailTemplate(appearance),
    };

    const confirmationResponse = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(confirmationEmailData),
    });

    if (!confirmationResponse.ok) {
      throw new Error('Failed to send confirmation email');
    }


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
    setProvince(""); // Reset province state
    setCourthouse(""); // Reset courthouse state
    setFormSubmitted(false); // Allow form to be submitted again
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={form}>
      <h2 className={styles.secondaryTitle}>Appearance Information</h2>
      <div className={styles.formContainer}>
        <div>
          <label htmlFor="fullName">Requesting Lawyer&apos;s Name</label>
          <input type="text" name="name" id="name" required placeholder="Requesting Lawyer Name..." />
        </div>

        <div>
          <label htmlFor="email">Requesting Lawyer&apos;s Email Address</label>
          <input type="email" name="email" id="email" required placeholder="Email Address..." pattern="^[^@]+@[^@]+\.[^@]+$" />
        </div>

        <div>
          <label htmlFor="phone">Requesting Lawyer&apos;s Phone Number</label>
          <input type="tel" name="phone" id="phone" placeholder="Phone Number..." />
        </div>

        <div>
          <label htmlFor="contactMethod">Preferred Contact Method</label>
          <select name="contactMethod" id="contactMethod" defaultValue="Email">
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        <div>
          <label htmlFor="province">Province</label>
          <select name="province" id="province" required value={province} onChange={handleProvinceChange}>
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

        {/* <div>
          <label htmlFor="courthouse">Courthouse Name</label>
          <input type="text" name="courthouse" id="courthouse" required placeholder="Courthouse Name..." />
        </div>*/}
        <div>
          <CourthouseSelect 
          province={province} 
          onProvinceChange={setProvince} 
          onCourthouseChange={setCourthouse} 
          courthouse={courthouse} 
          needLabel={true} 
          courtStyles={"leadFormAutocomplete"}
          required={true}
          styles={leadAutoCompleteStyles}
          />
        </div>
        

        <div className={styles.dateContainer}>
          <label htmlFor="date">Date of Appearance</label>
          <input type="date" name="date" id="date" required placeholder="Date of Appearance..." min={new Date().toISOString().split("T")[0]} 
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const day = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
            if (day === 5 || day === 6) {
              alert("Weekends are not allowed. Please select a weekday.");
              e.target.value = ""; // Reset input
            }
          }}/>
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" min="08:00" max="17:00" required />
        </div>

        <div>
          <label htmlFor="courtroom">Courtroom Number</label>
          <input type="text" name="courtroom" id="courtroom" placeholder="Courtroom Number..." />
        </div>

        <div>
          <label htmlFor="appearanceType">Type of Appearance</label>
          <input type="text" name="appearanceType" id="appearanceType" placeholder="Type of Appearance..." />
        </div>

        <div>
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

        <div>
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
        <label htmlFor="message">Instructions (for each of the accused)</label><br />
        <span className={styles.instructionsSublabel}><em>Provide instructions such as adjourn for disclosure, adjourn for instruction, and adjourn for discussions with crown.</em></span>
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