// components/DayModal.tsx
import { useState } from 'react';
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';
import { formatDate } from '@/app/util/util';
import { formatTimeTo12Hour } from '@/app/util/util';

interface DayModalProps {
  appearances: CourtAppearance[];
  onClose: () => void;
}

export default function DayModal({ appearances, onClose }: DayModalProps) {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const handleOverlayClick = () => {
    onClose(); // Calls handleCloseAllModals, closing everything
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2 className={styles.dayModalHeader}>Appearance Requests on {formatDate(appearances[0].date)}</h2>
        {appearances.map((appearance) => (
          <div key={appearance.id} className={styles.accordion}>
            <div
              className={styles.accordionHeader}
              onClick={() => handleAccordionClick(appearance.id!)}
            >
              <span>
                {appearance.lawyerName} in {appearance.courthouseName} at {appearance.time} ▿
              </span>
            </div>
            {openAccordionId === appearance.id && (
              <div className={styles.accordionContent}>
                <p><strong>Courthouse:</strong> {appearance.courthouseName}, {appearance.province}</p>
                {appearance.courtroomNumber &&<p><strong>Courtroom:</strong> {appearance.courtroomNumber}</p>}
                <p><strong>Appearance Date:</strong> {formatDate(appearance.date)} at {formatTimeTo12Hour(appearance.time)}</p>
                <p><strong>Requesting Lawyer:</strong> {appearance.lawyerName}</p>
                <p><strong>Requesting Lawyer&apos;s Email:</strong> <a className={styles.modalEmail} href={`mailto:${appearance.email}`}>{appearance.email}</a></p>
                {appearance.phone && <p><strong>Requesting Lawyer&apos;s Phone Number:</strong> {appearance.phone}</p>}
                <p><strong>Preferred Contact Method:</strong> {appearance.contactMethod}</p>
                {appearance.typeOfAppearance && <p><strong>Type of Appearance:</strong> {appearance.typeOfAppearance}</p>}
                {appearance.accusedStatus && <p><strong>Will the Accused be Present?</strong> {appearance.accusedStatus}</p>}
                {appearance.designationStatus && <p><strong>Has a Designation Been Filed With the Court?</strong> {appearance.designationStatus}</p>}
                {appearance.instructions && <p><strong>Instructions:</strong> {appearance.instructions}</p>}
                <div className={styles.modalEmailContainer}>
                  <a href={`mailto:${appearance.email}`}>
                    <span className={styles.modalEmailButton}>Email {appearance.lawyerName}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}