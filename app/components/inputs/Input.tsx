"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string; // id of the input
    label: string; // label to display
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>; // register function from react-hook-form
    errors: FieldErrors; // errors object from react-hook-form
    validation?: any; // optional validation rules
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text", // by default, the input type is text
    disabled,
    required,
    register,
    errors,
    validation,
}) => {
    return (
        <div className="w-full relative">
            <input
                id={id}
                disabled={disabled}
                type={type}
                {...register(id, { required, ...validation })} // register the input with the required validation
                placeholder=" "
                className={`
                    peer
                    w-full
                    p-3
                    pl-4
                    pt-7
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? "border-red-500" : "border-neutral-300"}
                    ${
                        errors[id]
                            ? "focus:border-red-500"
                            : "focus:border-black"
                    }
                `}
            />
            <label
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    left-4
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? "text-red-500" : "text-zinc-500"}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
