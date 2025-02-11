"use client"

import styles from "@/styles/Appearance.module.css";
import Image from "next/image";
import EmailIcon from "../../../public/email.webp"

import { useState } from 'react';
import RequestModalProps from "./Calendar/Modal";

  interface AppearanceProps {
    appearance: {
      id: string;
      lawyerName: string;
      email: string;
      date: string;
      time: string;
      courthouseName: string;
      province: string;
      courtroomNumber?: string;  // Optional
      typeOfAppearance?: string; // Optional
      instructions?: string;     // Optional
    };
  }

  export default function Appearance({ appearance }: AppearanceProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formattedDate = new Date(`${appearance.date}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });


    return (
      <>
      <div className={styles.appearanceWrapper} onClick={() => setIsModalOpen(true)}>
        <div className={styles.appearanceText}>
          {appearance.lawyerName} needs an agent for {formattedDate} at {appearance.time} in {appearance.courthouseName}, {appearance.province}
        </div>
        <div className={styles.appearanceIcons}>
          <a href={`mailto:${appearance.email}`}>
            <Image
                width={20}
                height={20}
                src={EmailIcon}
                alt="Email counsel about this appearance"
            />
          </a>
        </div>
      </div>
      {isModalOpen && (
        <RequestModalProps appearance={appearance} onClose={() => setIsModalOpen(false)} />
      )}
      </>

    );
  }