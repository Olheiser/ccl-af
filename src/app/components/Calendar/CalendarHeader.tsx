// components/CalendarHeader.js
import dayjs from 'dayjs';
import styles from "@/styles/Calendar.module.css"

interface CalendarHeaderProps {
    monthIndex: number;
    setMonthIndex: (index: number) => void;
  }

export default function CalendarHeader({ monthIndex, setMonthIndex }: CalendarHeaderProps) {
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  return (
    <div className={styles.calendarHeader}>
      <button onClick={handleReset}>Today</button>
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h2>
      <div>
        <button onClick={handlePrevMonth}><strong>{`<`}</strong></button>
        <button onClick={handleNextMonth}><strong>{`>`}</strong></button>
      </div>
    </div>
  );
}