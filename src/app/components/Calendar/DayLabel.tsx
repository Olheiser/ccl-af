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
      <div className={styles.dayLabel} onClick={() => setIsModalOpen(true)}>
        <span>{appearance.caseName}</span>
      </div>
      {isModalOpen && (
        <Modal appearance={appearance} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}