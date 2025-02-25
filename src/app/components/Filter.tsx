import { useState } from "react";
import styles from "@/styles/Filter.module.css";
import CourthouseSelect from "./CourthouseSelect";

interface FilterProps {
  onDateFilterChange: (date: string) => void;
  onProvinceFilterChange: (province: string) => void;
  onCourthouseChange: (courthouse: string) => void; // !! courthouse or courthouseName?
}

export default function Filter({ onDateFilterChange, onProvinceFilterChange, onCourthouseChange }: FilterProps) {
  const [province, setProvince] = useState<string>("");
    const [courthouse, setCourthouse] = useState<string>("");


  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    setProvince(newProvince);
    onProvinceFilterChange(newProvince);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateFilterChange(e.target.value);
  };

  const handleCourthouseChange = (courthouse: string) => {
    setCourthouse(courthouse);
    onCourthouseChange(courthouse); // Use the prop here
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.filterTitle}>Filters</h2>
      <select name="province" id="province" onChange={handleProvinceChange}>
        <option value="">Filter by Province</option>
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
        <option value="QC">Quebec</option>
        <option value="SK">Saskatchewan</option>
        <option value="YT">Yukon</option>
      </select>
      <div className={styles.filterInputWrapper}>

       <CourthouseSelect 
        province={province || ""} 
        onProvinceChange={setProvince} 
        onCourthouseChange={handleCourthouseChange} 
        courthouse={courthouse} 
      />
      </div>
      <div className={styles.filterInputWrapper}>
        <label htmlFor="date">Filter by Appearance Date</label>
        <input
          type="date"
          name="date"
          id="date"
          required
          placeholder="Filter by Appearance Date..."
          onChange={handleDateChange}
        />
      </div>
      
    </div>
  );
}