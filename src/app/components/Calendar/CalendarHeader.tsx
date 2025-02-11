// components/CalendarHeader.js
import dayjs from 'dayjs';
import styles from "@/styles/Calendar.module.css"

interface CalendarHeaderProps {
    monthIndex: number;
    setMonthIndex: (index: number) => void;

    onProvinceFilterChange: (province: string) => void; // Add this prop
  }

  export default function CalendarHeader({
    monthIndex,
    setMonthIndex,
    onProvinceFilterChange, // Destructure the prop
  }: CalendarHeaderProps) {
    const handlePrevMonth = () => {
      setMonthIndex(monthIndex - 1);
    };
  
    const handleNextMonth = () => {
      setMonthIndex(monthIndex + 1);
    };
  
    const handleReset = () => {
      setMonthIndex(dayjs().month());
    };
  
    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onProvinceFilterChange(e.target.value); // Pass the selected province to the parent
    };
  
    return (
      <div className={styles.calendarHeader}>
        <button className={styles.resetButton} onClick={handleReset}>Today</button>
        <h2 className={styles.calendarTitle}>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h2>
        <div>
        <select
          name="province"
          id="province"
          onChange={handleProvinceChange}
          className={styles.provinceFilter}
        >
          <option value="">Province</option>
          <option value="AB">AB</option>
          <option value="BC">BC</option>
          <option value="MB">MC</option>
          <option value="NB">NB</option>
          <option value="NL">NL</option>
          <option value="NS">NS</option>
          <option value="NT">NT</option>
          <option value="NU">NU</option>
          <option value="ON">ON</option>
          <option value="PE">PE</option>
          <option value="QC">QC</option>
          <option value="SK">SK</option>
          <option value="YT">YT</option>
        </select>
          <button className={styles.monthParser} onClick={handlePrevMonth}><strong>{`<`}</strong></button>
          <button className={styles.monthParser} onClick={handleNextMonth}><strong>{`>`}</strong></button>
        </div>
        {/* Add the Province filter dropdown */}
        
      </div>
    );
  }