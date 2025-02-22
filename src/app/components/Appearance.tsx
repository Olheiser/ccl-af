"use client"

import styles from "@/styles/Appearance.module.css";
import Image from "next/image";
import EmailIcon from "../../../public/email.webp"
import { formatDate, formatTimeTo12Hour, getCourtroomWithPrefix } from "../util/util";

import { useState } from 'react';
import RequestModalProps from "./Calendar/Modal";

  interface AppearanceProps {
    appearance: {
      id: string;
      lawyerName: string;
      email: string;
      phone: string;
      contactMethod: string;
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

    return (
      <>
      <div className={styles.appearanceWrapper} onClick={() => setIsModalOpen(true)}>
        <div className={styles.appearanceText}>
          {appearance.lawyerName} <span className={styles.appearanceBoiler}>needs an agent for</span> {formatDate(appearance.date)} <span className={styles.appearanceBoiler}>at</span> {formatTimeTo12Hour(appearance.time)} <span className={styles.appearanceBoiler}>in</span> {appearance.courthouseName} {getCourtroomWithPrefix(appearance.courtroomNumber)}<span className={styles.appearanceBoiler}>,</span> {appearance.province}
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

  