// components/Month.js
import Day from './Day';
import { Dayjs } from 'dayjs'; // Import Dayjs properly
import { CourtAppearance } from '@/types';
import styles from "@/styles/Calendar.module.css"


interface MonthProps {
    month: Dayjs[][]; // A 2D array of day objects (weeks containing days)
    courtAppearances: CourtAppearance[];
  }

  export default function Month({ month, courtAppearances }: MonthProps) {
    return (
      <>
        {month.map((row, i) => (
          <div key={i} className={styles.weekRow}>
            {row.map((day, idx) => (
              <Day
                key={idx}
                day={day}
                courtAppearances={courtAppearances}
              />
            ))}
          </div>
        ))}
      </>
    );
  }