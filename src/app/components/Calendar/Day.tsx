// components/Day.js
"use client"

import DayModal from './DayModal';
import { useState } from 'react';

import dayjs, {Dayjs } from 'dayjs';
import DayLabel from './DayLabel';
import { CourtAppearance } from '@/types';
import styles from "@/styles/Calendar.module.css"


  
  interface DayProps {
    day: Dayjs;
    courtAppearances: CourtAppearance[];
  }

export default function Day({ day, courtAppearances }: DayProps) {
    const isCurrentDay = day.isSame(dayjs(), 'day');
    const isPastDay = day.isBefore(dayjs(), 'day'); // Check if the day is in the past

    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  
    const matchingCourtAppearances = courtAppearances.filter((appearance) => {
    return dayjs(appearance.date).isSame(day, 'day');
  });

  const handleDayClick = () => {
    if (matchingCourtAppearances.length > 0) {
      setIsDayModalOpen(true);
    }
  };

  return (
    <>
    <div className={styles.dayCell}  onClick={handleDayClick}>
      {/* Apply the 'currentDay' class if it's today */}
      <div className={`${styles.dayNumber} ${isCurrentDay ? styles.currentDay : ''} ${isPastDay ? styles.pastDay : ''}`}>
        {day.format('DD')}
      </div>
      <div className={styles.dayLabels}>
          {matchingCourtAppearances.length > 2 ? (
            <div className={styles.dayLabel} onClick={handleDayClick}>
              <span>{matchingCourtAppearances.length} Requests</span>
            </div>
          ) : (
            matchingCourtAppearances.map((appearance) => (
              <DayLabel key={appearance.id} appearance={appearance} />
            ))
          )}
        </div>
    </div>
    {isDayModalOpen && (
        <DayModal
          appearances={matchingCourtAppearances}
          onClose={() => setIsDayModalOpen(false)}
        />
      )}
    </>
  );
}