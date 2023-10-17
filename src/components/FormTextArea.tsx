export interface FormTextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  customCssClasses?: {
    formTextAreaContainer?: string;
  };
  rows?: number;
  cols?: number;
  required?: boolean;
}

const FormTextArea = ({
  id,
  label,
  customCssClasses,
  rows,
  cols,
  required,
  onChange,
}: FormTextAreaProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // if (validation) {
    //   setInputValid(validation(value));
    // }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={customCssClasses?.formTextAreaContainer}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          required={required}
          rows={rows || 4}
          cols={cols || 50}
          name={id}
          id={id}
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:py-1.5 sm:text-sm sm:leading-6"
          defaultValue={""}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default FormTextArea;
