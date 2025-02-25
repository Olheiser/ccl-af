import React, { useState } from "react";
import Select from "react-select";
import { courthouses } from "../util/courthouses";

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
};

const CourthouseSelect = ({
  province,
  courthouse,
  onCourthouseChange,
}: CourthouseSelectProps) => {
  const [selectedCourthouse, setSelectedCourthouse] = useState<CourthouseOption | null>(null);

  // Filter courthouses based on the selected province
  const filteredCourthouses = province
    ? courthouses.filter((c) => c.province === province)
    : courthouses;

  const options: CourthouseOption[] = filteredCourthouses.map((c) => ({
    label: `${c.courthouseName}`,
    value: c.courthouseName,
    province: c.province,
  }));

  const handleChange = (selectedOption: CourthouseOption | null) => {
    if (selectedOption) {
      // Update both the courthouse and province states
      setSelectedCourthouse(selectedOption);
      onCourthouseChange(selectedOption.value); // Update the courthouse
    } else {
      // Reset both states if no option is selected
      setSelectedCourthouse(null);
      onCourthouseChange("");
    }
  };

  return (
    <div>
      <label htmlFor="courthouse">Courthouse Name</label>
      <Select
        id="courthouse"
        name="courthouse"
        options={options}
        value={selectedCourthouse}
        onChange={handleChange}
        placeholder="Select a courthouse..."
      />
      <input
        type="hidden"
        name="courthouse"
        value={courthouse}
      />
    </div>
  );
};

export default CourthouseSelect;