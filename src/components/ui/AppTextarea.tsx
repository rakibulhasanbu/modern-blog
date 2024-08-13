import { UseFormRegister } from "react-hook-form";

type TAppTextarea = {
  name: string;
  value?: string;
  placeholder: string;
  icon?: string;
  maxLength?: number;
  register: UseFormRegister<any>;
  required?: true | false;
  disabled?: boolean;
  onChange?: any;
  error?: any;
};

const AppTextarea = ({
  name,
  register,
  required,
  error,
  disabled,
  placeholder,
  maxLength,
  onChange,
}: TAppTextarea) => {
  return (
    <textarea
      placeholder={placeholder}
      disabled={disabled}
      {...register(name, {
        ...(required && { required: true }),
      })}
      maxLength={maxLength}
      className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
      onChange={onChange}
    ></textarea>
  );
};

export default AppTextarea;
