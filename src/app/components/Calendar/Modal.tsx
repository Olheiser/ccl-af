// components/Modal.tsx
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';
import { formatDate, formatTimeTo12Hour, getCourtroomWithPrefix } from '@/app/util/util';

interface ModalProps {
  appearance: CourtAppearance; // Use the CourtAppearance type
  
  onClose: () => void;
}

export default function Modal({ appearance, onClose }: ModalProps) {

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h3>{appearance.lawyerName} in {appearance.courthouseName} at {formatTimeTo12Hour(appearance.time)}</h3> {/* Use caseName instead of title */}
        <p><strong>Courthouse:</strong> {appearance.courthouseName}, {appearance.province}</p>
        {appearance.courtroomNumber && <p><strong>Courtroom:</strong> {getCourtroomWithPrefix(appearance.courtroomNumber)}</p>}
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
    </div>
  );
}