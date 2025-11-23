import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSearchDropdownProps {
  options: Option[];
  value: SingleValue<Option> | null;
  onChange: (selectedOption: SingleValue<Option>) => void;
  className?: string;
  defaultValue?: SingleValue<Option>;
  isDisabled?:boolean | string
}

const CustomSearchDropdown: React.FC<CustomSearchDropdownProps> = ({
  options,
  value,
  onChange,
  className,
  defaultValue,
  isDisabled
}) => {
  
  const handleChange = (option: SingleValue<Option>) => {
    onChange(option);
  };

  return (
    <Select
      options={options}
      value={value || defaultValue || null}
      onChange={handleChange}
      className={className}
      isClearable
      defaultValue={defaultValue}
      styles={{
        control: (provided) => ({
          ...provided,
          minHeight: "10px", 
          fontSize: "16px", 
        }),
      }}
     isDisabled={isDisabled === "disabled" ? true : false}
    />
  );
};

export default CustomSearchDropdown