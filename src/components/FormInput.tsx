import { useState, HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export interface FormInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  customCssClasses?: {
    formInputContainer?: string;
  };
  required?: boolean;
  validation?: (value: string) => boolean;
  invalidMessage?: string;
  message?: string;
  type?: HTMLInputTypeAttribute;
  ariaDescribedBy?: string;
}

const FormInput = ({
  id,
  label,
  placeholder,
  customCssClasses,
  required,
  validation,
  invalidMessage,
  message,
  value,
  onChange,
  type,
}: FormInputProps) => {
  const [inputValid, setInputValid] = useState(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validation) {
      setInputValid(validation(value));
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={customCssClasses?.formInputContainer}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label || id}
      </label>
      <div className="mt-2">
        <input
          type={type || "text"}
          name={id}
          id={id}
          className={twMerge(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6",
            !inputValid && "ring-red-600"
          )}
          placeholder={placeholder}
          aria-describedby={"ariaDescribedBy"}
          required={required}
          value={value}
          onChange={handleOnChange}
        />
      </div>
      {message && inputValid && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {message}
        </p>
      )}
      {!inputValid && invalidMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {invalidMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
