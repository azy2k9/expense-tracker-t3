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
                        placeholder="Password..."
                        type={showPassword ? 'text' : 'password'}
                        className=" rounded-lg p-4 w-full my-1 focus:border-green-600 focus:ring-green-600"
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={isSubmitting}
                    />
                    <div
                        onClick={handleShowPassword}
                        className="absolute w-6 top-5 right-4"
                    >
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </div>
                </div>
                <p className="text-red-600">{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="form-control">
            <input
                {...field}
                placeholder={placeholder}
                type={type}
                className="rounded-lg p-4 w-full my-1 focus:border-green-600 focus:ring-green-600"
                aria-invalid={isInvalid ? 'true' : 'false'}
                disabled={isSubmitting}
            />
            <p className="text-red-600">{error?.message}</p>
        </div>
    );
};

export default FormField;
