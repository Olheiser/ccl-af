// components/Day.js
"use client"

import DayModal from './DayModal';
import { useState } from 'react';

import dayjs, {Dayjs } from 'dayjs';
import DayLabel from './DayLabel';
import { CourtAppearance } from '@/types';
import styles from "@/styles/Calendar.module.css"
import Modal from './Modal';


  
  interface DayProps {
    day: Dayjs;
    courtAppearances: CourtAppearance[];
  }

export default function Day({ day, courtAppearances }: DayProps) {
    const isCurrentDay = day.isSame(dayjs(), 'day');
    const isPastDay = day.isBefore(dayjs(), 'day'); // Check if the day is in the past

    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [openModalAppearance, setOpenModalAppearance] = useState<CourtAppearance | null>(null); 
  
    const matchingCourtAppearances = courtAppearances.filter((appearance) => {
    return dayjs(appearance.date).isSame(day, 'day');
  });

  const handleDayClick = () => {
    if (matchingCourtAppearances.length > 0) {
      setIsDayModalOpen(true);
    }
  };

  const handleOpenModal = (appearance: CourtAppearance) => {
    setOpenModalAppearance(appearance); // Open the modal for the specific appearance
  };

  const handleCloseModal = () => {
    setOpenModalAppearance(null); // Close the modal
  };

  return (
    <>
      <div className={styles.dayCell}>
        {/* Apply the 'currentDay' class if it's today */}
        <div
          className={`${styles.dayNumber} ${isCurrentDay ? styles.currentDay : ''} ${
            isPastDay ? styles.pastDay : ''
          }`}
        >
          {day.format('DD')}
        </div>
        {/* Grouped Requests */}
        <div className={styles.dayLabels}>
          {matchingCourtAppearances.length > 2 ? (
            <div className={styles.dayLabel} onClick={handleDayClick}>
              <span>{matchingCourtAppearances.length} Requests</span>
            </div>
          ) : (
            matchingCourtAppearances.map((appearance) => (
              <DayLabel
                key={appearance.id}
                appearance={appearance}
                onOpenModal={handleOpenModal} // Pass the handler to DayLabel
              />
            ))
          )}
        </div>
      </div>
      {/* Grouped Requests */}
      {isDayModalOpen && (
        <DayModal
          appearances={matchingCourtAppearances}
          onClose={() => setIsDayModalOpen(false)}
        />
      )}
      {openModalAppearance && (
        <Modal
          appearance={openModalAppearance}
          onClose={handleCloseModal} // Close the modal
        />
      )}
    </>
  );
}