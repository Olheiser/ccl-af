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
  styles?: StylesConfig<OptionType, false>;
};

const CourthouseSelect = ({
  province,
  courthouse,
  onProvinceChange,
  onCourthouseChange,
  needLabel,
  courtStyles,
  required = false,
  styles: customeStylesProp,
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
        styles={customeStylesProp}
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