// components/DayModal.tsx
import { useState } from 'react';
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';

interface DayModalProps {
  appearances: CourtAppearance[];
  onClose: () => void;
}

export default function DayModal({ appearances, onClose }: DayModalProps) {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const formattedDate = new Date(`${appearances[0].date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOverlayClick = () => {
    onClose(); // Calls handleCloseAllModals, closing everything
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2 className={styles.dayModalHeader}>Appearance Requests on {formattedDate}</h2>
        {appearances.map((appearance) => (
          <div key={appearance.id} className={styles.accordion}>
            <div
              className={styles.accordionHeader}
              onClick={() => handleAccordionClick(appearance.id)}
            >
              <span>
                {appearance.lawyerName} in {appearance.courthouseName} at {appearance.time} ▿
              </span>
            </div>
            {openAccordionId === appearance.id && (
              <div className={styles.accordionContent}>
                <p><strong>Location:</strong> {appearance.courthouseName}, {appearance.province}</p>
                <p><strong>Courtroom:</strong> {appearance.courtroomNumber}</p>
                <p><strong>Date:</strong> {new Date(appearance.date).toLocaleDateString()} at {appearance.time}</p>
                <p><strong>Counsel:</strong> {appearance.lawyerName}</p>
                <p><strong>Email:</strong> <a className={styles.modalEmail} href={`mailto:${appearance.email}`}>{appearance.email}</a></p>
                {appearance.typeOfAppearance && <p><strong>Type of Appearance:</strong> {appearance.typeOfAppearance}</p>}
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