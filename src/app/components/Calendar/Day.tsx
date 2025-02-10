// components/Day.js
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
  
    const matchingCourtAppearances = courtAppearances.filter((appearance) => {
    return dayjs(appearance.date).isSame(day, 'day');
  });

  return (
    <div className={styles.dayCell}>
      {/* Apply the 'currentDay' class if it's today */}
      <div className={`${styles.dayNumber} ${isCurrentDay ? styles.currentDay : ''}`}>
        {day.format('DD')}
      </div>
      <div className={styles.dayLabels}>
        {matchingCourtAppearances.map((appearance) => (
          <DayLabel key={appearance.id} appearance={appearance} />
        ))}
      </div>
    </div>
  );
}