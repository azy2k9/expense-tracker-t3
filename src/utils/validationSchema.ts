import z from 'zod';

export const SigninSchema = z.object({
    password: z
        .string({ required_error: 'Password is required' })
        .min(3, 'Password must contain at least 3 characters'),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({
            message: 'Email is invalid',
        }),
});

export type SigninForm = z.infer<typeof SigninSchema>;

export const RegisterSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({ message: 'Email must be valid' }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(4, 'Password must be at least 4 characters')
        .max(50, 'Password cannot be more than 50 characters')
        .regex(/[a-z]/, 'Password must contain a lowercase character')
        .regex(/\d/, 'Password must contain a numeric character'),
    confirmPassword: z.string({
        required_error: 'Password confirmation is required',
    }),
    name: z
        .string({
            required_error: 'Name is required',
        })
        .min(4, 'Name must at least 4 characters')
        .max(50, 'Name cannot be more than 50 characters'),
    image: z.string().url('Image URL must be a valid URL'),
});

export type RegsiterForm = z.infer<typeof RegisterSchema>;

export const ExpenseFormSchema = z.object({
    name: z.string({ required_error: 'Name of expense must be specified' }),
    price: z
        .number({ required_error: 'Price of expense must be specified' })
        .gt(0, 'Price must be greated than 0')
        .positive('Price must be positive number'),
    type: z.string({ required_error: 'Type of expense must be specified' }),
    date: z.date({
        required_error: 'Date for expense is must be specified',
        invalid_type_error: 'Date must be valid',
    }),
});

export type ExpenseForm = z.infer<typeof ExpenseFormSchema>;
