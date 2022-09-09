type Props = {
  type?: React.HTMLInputTypeAttribute;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  value?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  small?: boolean;
  right?: boolean;
};

const Input = ({
  type = "text",
  inputMode,
  value,
  onChange,
  onBlur,
  onKeyPress,
  placeholder,
  min,
  max,
  small,
  right,
}: Props) => {
  return (
    <input
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      min={min}
      max={max}
      className={
        (right ? "text-right " : "") +
        (small ? "h-8 " : "h-12 px-5 ") +
        "h-12 w-full flex-1 rounded-lg border-2 border-gray bg-white"
      }
    />
  );
};

export default Input;
