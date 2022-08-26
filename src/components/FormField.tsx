import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Controller, useController, UseControllerProps } from 'react-hook-form';

interface IFormField {
    name: string;
    placeholder?: string;
    type?: 'text' | 'select' | 'password' | 'number' | 'date' | 'radio';
    label?: string;
    isSubmitting: boolean;
    value?: string;
    leftAdornment?: string;
}

type FormFieldProps = IFormField & UseControllerProps<any>;

const FormField = ({
    name,
    placeholder,
    control,
    type = 'text',
    isSubmitting,
    value,
    leftAdornment,
}: FormFieldProps) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    if (type === 'radio') {
        return (
            <label
                htmlFor={name}
                className="flex flex-col items-center text-red-300 px-2"
            >
                <input
                    {...field}
                    type="radio"
                    className="p-3 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isSubmitting}
                    value={value}
                    id={placeholder}
                    checked={field.value === value}
                />
                {placeholder}
            </label>
        );
    }

    if (type === 'password') {
        return (
            <div className="form-control">
                <div className="relative">
                    <input
                        {...field}
                        placeholder={placeholder}
                        type={showPassword ? 'text' : 'password'}
                        className=" rounded-lg p-4 w-full my-1 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isSubmitting}
                    />
                    <div className="absolute top-5 right-4 text-purple-400 hover:text-purple-500">
                        <button className="w-6" onClick={handleShowPassword}>
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    </div>
                </div>
                <p className="text-red-300">{error?.message}</p>
            </div>
        );
    }

    if (leftAdornment) {
        return (
            <div className="form-control">
                <div className="relative">
                    <div className="absolute top-[22px] left-4 text-purple-400 hover:text-purple-500">
                        <span>{leftAdornment}</span>
                    </div>
                    <input
                        {...field}
                        placeholder={placeholder}
                        type={'text'}
                        className=" rounded-lg p-4 pl-8 w-full my-1 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isSubmitting}
                    />
                </div>
                <p className="text-red-300">{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="form-control">
            <input
                {...field}
                placeholder={placeholder}
                type={type}
                className="rounded-lg p-4 w-full my-1 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                disabled={isSubmitting}
            />
            <p className="text-red-300">{error?.message}</p>
        </div>
    );
};

export default FormField;
