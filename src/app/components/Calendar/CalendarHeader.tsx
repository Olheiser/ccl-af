// components/CalendarHeader.js
import dayjs from 'dayjs';
import styles from "@/styles/Calendar.module.css"
import CourthouseSelect from '../CourthouseSelect';
import { useState } from 'react';
import { findProvince } from '@/app/util/util';
import { StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
  province: string;
}

const calendarAutoCompleteStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    padding: '1px 5px 1px 0', // Match padding
    borderRadius: '5px', // Match border radius
    border: '1px solid #ccc', // Match border color
    fontSize: '14px', // Match font size
    marginBottom: '12px', // Match margin bottom
    width: '100%', // Match width
    boxSizing: 'border-box', // Match box sizing
    marginTop: '3px', // Match margin top
    backgroundColor: '#ffffff', // Match background color
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)', // Match box shadow
    fontFamily: '"Optima Nova LT", sans-serif', // Match font family
    color: '#333333', // Match text color
    '&:focus': {
      borderColor: '#888', // Match focus border color
      outline: 'none', // Remove default outline
      boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.15)', // Match focus box shadow
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif', // Match font family
    color: state.isFocused ? '#ffffff' : '#333333', // Match text color on hover
    fontSize: '14px', // Match font size
    backgroundColor: state.isSelected
      ? '#f0f0f0' // Background color for selected option
      : state.isFocused
      ? '#007bff' // Background color for hovered option
      : '#ffffff', // Default background color
    '&:active': {
      backgroundColor: '#0056b3', // Background color when the option is clicked
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif', // Match font family
    color: '#000000', // Match text color
    fontSize: '14px', // Match font size
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif', // Match font family
    color: '#333333', // Match placeholder color
    fontSize: '14px', // Match font size
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif', // Match font family
    color: '#000000', // Match text color
    fontSize: '14px', // Match font size
    borderRadius: '5px', // Match border radius
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)', // Match box shadow
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#333333', // Match dropdown indicator color
    '&:hover': {
      color: '#888', // Match hover color
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#333333', // Match separator color
  }),
};

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
          styles={calendarAutoCompleteStyles}
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