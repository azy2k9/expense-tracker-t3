import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';

interface IFormField {
    name: string;
    isInvalid: boolean;
    placeholder?: string;
    type?: 'text' | 'select' | 'password' | 'number' | 'date';
    label?: string;
    isSubmitting: boolean;
}

type FormFieldProps = IFormField & UseControllerProps<any>;

const FormField = ({
    isInvalid,
    name,
    placeholder,
    control,
    type = 'text',
    isSubmitting,
}: FormFieldProps) => {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    if (type === 'password') {
        return (
            <div className="form-control">
                <div className="relative">
                    <input
                        {...field}
                        placeholder={placeholder}
                        type={showPassword ? 'text' : 'password'}
                        className=" rounded-lg p-4 w-full my-1 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                        aria-invalid={isInvalid ? 'true' : 'false'}
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

    return (
        <div className="form-control">
            <input
                {...field}
                placeholder={placeholder}
                type={type}
                className="rounded-lg p-4 w-full my-1 text-purple-400 border-2 border-purple-400 focus:border-purple-500 focus:ring-purple-500"
                aria-invalid={isInvalid ? 'true' : 'false'}
                disabled={isSubmitting}
            />
            <p className="text-red-300">{error?.message}</p>
        </div>
    );
};

export default FormField;
