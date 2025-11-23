import React from "react";
import Select, { SingleValue } from "react-select";
import { useField, useFormikContext } from "formik";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  name: string;
  options: Option[];
  className?: string;
  value?: SingleValue<Option>;
  isDisabled?: boolean;
  onChange?: (
    selectedOption: SingleValue<Option>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => void;
}

const FormikCustomSearchDropdown: React.FC<CustomSelectProps> = ({
  label,
  options,
  className,
  onChange,
  isDisabled = false,
  value,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (option: SingleValue<Option>) => {
    setFieldValue(props.name, option ? (option as Option).value : "");
    if (onChange) {
      onChange(option, setFieldValue);
    }
  };
  
  const selectedOption =options &&  options.find((option) => option.value === field.value);
  return (
    <div>
      {label && <label>{label}</label>}
      <Select
        {...field}
        {...props}
        options={options}
        className={className}
        onChange={handleChange}
        onBlur={() => field.onBlur({ target: { name: props.name } })}
        isDisabled={isDisabled}
        value={selectedOption || value || null}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "45px", 
            fontSize: "16px", 
            zIndex: 999
          }),
        }}
      />   
    </div>
  );
};
export default FormikCustomSearchDropdown;