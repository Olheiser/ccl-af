// components/DayLabel.tsx
//import { useState } from 'react';
import { CourtAppearance } from '@/types';
import styles from '@/styles/Calendar.module.css';
import { formatTimeTo12Hour, getCourtroomWithPrefix } from '@/app/util/util';
//import Modal from './Modal';

/*
interface DayLabelProps {
  appearance: CourtAppearance;
}*/
interface DayLabelProps {
  appearance: CourtAppearance;
  onOpenModal: (appearance: CourtAppearance) => void; // Add this prop
}

export default function DayLabel({ appearance, onOpenModal }: DayLabelProps) {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Stop event propagation
    onOpenModal(appearance); // Notify the parent to open the modal
  };

  return (
    <div className={styles.dayLabel} onClick={handleClick}>
      <span>{appearance.lawyerName} in {appearance.courthouseName} {getCourtroomWithPrefix(appearance.courtroomNumber)} at {formatTimeTo12Hour(appearance.time)}</span>
    </div>
  );
}