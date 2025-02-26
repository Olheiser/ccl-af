// components/CalendarHeader.js
import dayjs from 'dayjs';
import styles from "@/styles/Calendar.module.css"
import CourthouseSelect from '../CourthouseSelect';
import { useState } from 'react';
import { findProvince } from '@/app/util/util';

interface CalendarHeaderProps {
    monthIndex: number;
    setMonthIndex: (index: number) => void;
    onCourthouseChange: (courthouse: string) => void;
    onProvinceFilterChange: (province: string) => void; // Add this prop
  }

  export default function CalendarHeader({
    monthIndex,
    setMonthIndex,
    onProvinceFilterChange, // Destructure the prop
    onCourthouseChange,
  }: CalendarHeaderProps) {

    const [province, setProvince] = useState<string>("");
    const [courthouse, setCourthouse] = useState<string>("");

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
      const newProvince = e.target.value;
      setProvince(newProvince);
      onProvinceFilterChange(newProvince);
    };

    const handleCourthouseChange = (courthouse: string) => {
      setCourthouse(courthouse);
      onCourthouseChange(courthouse); // Use the prop here
      const province = findProvince(courthouse) || "";
      const provinceElement = document.getElementById("province");
      (provinceElement as HTMLInputElement).value = province;
      setProvince(province);
      onProvinceFilterChange(province);
    };
  
    return (
      <>
      <div className={styles.filterContainer}>
        <CourthouseSelect 
          province={province || ""} 
          onProvinceChange={setProvince} 
          onCourthouseChange={handleCourthouseChange} 
          courthouse={courthouse} 
          needLabel={false}
          courtStyles={"calendarAutocomplete"}
          required={false}
        />
        <select
          name="province"
          id="province"
          onChange={handleProvinceChange}
          className={styles.provinceFilter}
        >
          <option value="">Province</option>
          <option value="AB">Alberta</option>
          <option value="BC">British Columbia</option>
          <option value="MB">Manitoba</option>
          <option value="NB">New Brunswick</option>
          <option value="NL">Newfoundland and Labrador</option>
          <option value="NS">Nova Scotia</option>
          <option value="NT">Northwest Territories</option>
          <option value="NU">Nunavut</option>
          <option value="ON">Ontario</option>
          <option value="PE">Prince Edward Island</option>
          <option value="QC">Québec</option>
          <option value="SK">Saskatchewan</option>
          <option value="YT">Yukon</option>
        </select>
      </div>
      <div className={styles.calendarHeader}>
        <button className={styles.resetButton} onClick={handleReset}>Today</button>
        <h2 className={styles.calendarTitle}>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h2>
        <div>
            <button className={styles.monthParser} onClick={handlePrevMonth}><strong>{`<`}</strong></button>
            <button className={styles.monthParser} onClick={handleNextMonth}><strong>{`>`}</strong></button>
        </div>
        
      </div>
      </>
    );
  }