import React, { useState, useEffect, useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import { courthouses } from "../util/courthouses";
import styles from '@/styles/Autocomplete.module.css';

interface OptionType {
  value: string;
  label: string;
  province: string;
}

// Define the custom styles with proper TypeScript types
const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    padding: '2px 5px 2px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '12px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '3px',
    backgroundColor: '#ffffff',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    '&:focus': {
      borderColor: '#888',
      outline: 'none',
      boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.15)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: state.isFocused ? '#ffffff' : '#333333', // Change font color on hover
    fontSize: '14px',
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
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: '"Optima Nova LT", sans-serif',
    color: '#333333',
    fontSize: '14px',
  }),
};


type CourthouseOption = {
  label: string;
  value: string;
  province: string;
};

type CourthouseSelectProps = {
  province: string;
  courthouse: string;
  onProvinceChange: (province: string) => void;
  onCourthouseChange: (courthouse: string) => void;
  needLabel: boolean;
  courtStyles: string;
  required?: boolean;
};

const CourthouseSelect = ({
  province,
  courthouse,
  onProvinceChange,
  onCourthouseChange,
  needLabel,
  courtStyles,
  required = false,
}: CourthouseSelectProps) => {
  const [selectedCourthouse, setSelectedCourthouse] = useState<CourthouseOption | null>(null);

  // Filter courthouses based on the selected province
  const filteredCourthouses = useMemo(() => {
    return province ? courthouses.filter((c) => c.province === province) : courthouses;
  }, [province]);

  const options: CourthouseOption[] = useMemo(() => {
    return filteredCourthouses.map((c) => ({
      label: `${c.courthouseName}`,
      value: c.courthouseName,
      province: c.province,
    }));
  }, [filteredCourthouses]);

  useEffect(() => {
    if (courthouse) {
      const selectedOption = options.find((option) => option.value === courthouse);
      setSelectedCourthouse(selectedOption || null);
    } else {
      setSelectedCourthouse(null); // Clear the selected courthouse if courthouse prop is empty
    }
  }, [courthouse, options]);

  const handleChange = (selectedOption: CourthouseOption | null) => {
    if (selectedOption) {
      // Update both the courthouse and province states
      setSelectedCourthouse(selectedOption);
      onProvinceChange(selectedOption.province); // Update the province
      onCourthouseChange(selectedOption.value); // Update the courthouse
    } else {
      // Reset both states if no option is selected
      setSelectedCourthouse(null);
      onProvinceChange("");
      onCourthouseChange("");
    }
  };

  return (
    <div>
      {needLabel && <label htmlFor="courthouse">Courthouse Name</label>}
      <Select
        id="courthouse"
        name="courthouse"
        options={options}
        value={selectedCourthouse}
        onChange={handleChange}
        placeholder="Select a courthouse..."
        className={styles[courtStyles]}
        isClearable={true}
        styles={customStyles}
      />
      <input
        type="hidden"
        name="courthouse"
        value={courthouse}
        required={required}
      />
    </div>
  );
};

export default CourthouseSelect;