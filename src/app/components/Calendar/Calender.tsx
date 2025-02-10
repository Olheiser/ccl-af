"use client"

// components/Calendar.js
import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import Month from './Month';
import { CourtAppearance } from '@/types';

import styles from "@/styles/Calendar.module.css"
  
  interface CalendarProps {
    courtAppearances: CourtAppearance[];
  }

export default function Calendar({ courtAppearances }: CalendarProps) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  const currentMonth = getMonth(monthIndex);

  function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
    return daysMatrix;
  }

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader
        monthIndex={monthIndex}
        setMonthIndex={setMonthIndex}
      />
      {/* Weekday Row */}
      <div className={styles.weekdayRow}>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
      </div>
      {/* Month Grid */}
      <div className={styles.monthGrid}>
        <Month month={currentMonth} courtAppearances={courtAppearances} />
      </div>
    </div>
  );
}