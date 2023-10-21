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

export const SignUpSchema = z.object({
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
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(4, 'Name must at least 4 characters')
    .max(50, 'Name cannot be more than 50 characters'),
  image: z.string().url('Image URL must be a valid URL').optional(),
});

export type SignUpForm = z.infer<typeof SignUpSchema>;

export const ExpenseFormSchema = z.object({
  name: z.string({ required_error: 'Name of expense must be specified' }),
  price: z
    .string({ required_error: 'Price of expense must be specified' })
    .regex(
      /^\d{1,9}.?\d{0,2}$/,
      'Price can only be numbers up to 2 decimal places'
    ),

  type: z.enum(['EXPENSE', 'INCOME'], {
    required_error: 'Type of expense must be specified',
  }),
  date: z.string({
    required_error: 'Date for expense is must be specified',
  }),
  listId: z.string(),
});

export type ExpenseForm = z.infer<typeof ExpenseFormSchema>;

export const ExpenseListFormSchema = z.object({
  name: z.string({ required_error: 'Name of list must be specified' }),
  created_at: z.string(),
  updated_at: z.string(),
  userId: z.string(),
  expenses: z.array(ExpenseFormSchema.optional()),
});

export type ExpenseListForm = z.infer<typeof ExpenseListFormSchema>;
