// components/Modal.tsx
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';

interface RequestModalProps {
  appearance: CourtAppearance; // Use the CourtAppearance type
  
  onClose: () => void;
}

export default function RequestModal({ appearance, onClose }: RequestModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h3>{appearance.lawyerName} in {appearance.courthouseName} at {appearance.time}</h3> {/* Use caseName instead of title */}
        <p><strong>Location:</strong> {appearance.courthouseName}, {appearance.province}</p>
        <p><strong>Courtroom:</strong> {appearance.courtroomNumber}</p>
        <p><strong>Date:</strong> {new Date(appearance.date).toLocaleDateString()} at {appearance.time}</p>
        <p><strong>Counsel:</strong> {appearance.lawyerName}</p>
        <p><strong>Email:</strong> <a className={styles.modalEmail} href={`mailto:${appearance.email}`}>{appearance.email}</a></p>
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
    </div>
  );
}