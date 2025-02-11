import styles from "@/styles/Filter.module.css";

interface FilterProps {
  onDateFilterChange: (date: string) => void;
  onProvinceFilterChange: (province: string) => void;
}

export default function Filter({ onDateFilterChange, onProvinceFilterChange }: FilterProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateFilterChange(e.target.value);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProvinceFilterChange(e.target.value);
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