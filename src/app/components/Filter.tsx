import styles from "@/styles/Filter.module.css";

export default function Filter() {
    /*const FilterComponent = ({ data, setFilteredData }) => {
    const [selectedProvince, setSelectedProvince] = useState("");

    // Handles province selection and updates filtered data
    const handleFilterChange = (event) => {
        const province = event.target.value;
        setSelectedProvince(province);

        if (province === "") {
        setFilteredData(data); // Reset filter if "All Provinces" is selected
        } else {
        const filtered = data.filter((item) => item.province === province);
        setFilteredData(filtered);
        }
    }; 
    
    <select id="provinceFilter" value={selectedProvince} onChange={handleFilterChange}>
    */
    return (
        <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Filters</h2>
            
            <select name="province" id="province">
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
                <input type="date" name="date" id="date" required placeholder="Filter by Appearance Date..."/>
            </div>
        </div>
    )
}