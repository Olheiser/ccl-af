// components/Modal.tsx
import styles from '@/styles/Calendar.module.css';
import { CourtAppearance } from '@/types';

interface ModalProps {
  appearance: CourtAppearance; // Use the CourtAppearance type
  onClose: () => void;
}

export default function Modal({ appearance, onClose }: ModalProps) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h3>{appearance.caseName}</h3> {/* Use caseName instead of title */}
        <p><strong>Date:</strong> {new Date(appearance.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appearance.time}</p>
        <p><strong>Location:</strong> {appearance.location}</p>
        <p><strong>Details:</strong> {appearance.details}</p>
      </div>
    </div>
  );
}