"use client";

import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

type TAppFormInput = {
  name: string;
  type: "password" | "number" | "text" | "date" | "url" | "file" | "email";
  placeholder: string;
  icon: string;
  register: UseFormRegister<any>;
  required?: true | false;
  disabled?: boolean;
  error?: any;
};

const AppFormInput = ({
  name,
  type,
  placeholder,
  icon,
  register,
  required,
  error,
  disabled,
}: TAppFormInput) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={`w-[100%] ${error ? "mb-1" : "mb-4"}`}>
      <div className="relative">
        <input
          {...register(name, {
            ...(required && { required: true }),
            ...(type === "number" && { valueAsNumber: true }),
          })}
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          disabled={disabled}
          placeholder={placeholder}
          className={`input-box ${error && "border-red"}`}
        />
        <i className={`fi ${icon} input-icon ${error && "text-red"}`}></i>

        {type === "password" ? (
          <i
            className={`fi  ${
              !passwordVisible ? "fi-rr-eye-crossed" : "fi-rr-eye"
            } input-icon left-[auto] right-4 cursor-pointer`}
            onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          ></i>
        ) : (
          ""
        )}
      </div>
      {error && (
        <p className="text-sm text-red my-1">
          <span className="capitalize text-sm">{placeholder}</span> is required.
        </p>
      )}
    </div>
  );
};

export default AppFormInput;
