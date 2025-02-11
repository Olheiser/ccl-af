// components/DayLabel.tsx
import { useState } from 'react';
import { CourtAppearance } from '@/types';
import styles from '@/styles/Calendar.module.css';
import Modal from './Modal';

interface DayLabelProps {
  appearance: CourtAppearance;
}

export default function DayLabel({ appearance }: DayLabelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.dayLabel} onClick={(event: React.MouseEvent) => { 
        event.stopPropagation(); 
        setIsModalOpen(true); 
    }}>
        <span>{appearance.lawyerName} in {appearance.courthouseName} at {appearance.time}</span>
      </div>
      {isModalOpen && (
        <Modal appearance={appearance} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}