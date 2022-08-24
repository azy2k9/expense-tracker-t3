import React from 'react';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { NextPageContext } from 'next';
import { SignUpForm, SignUpSchema } from '../utils/validationSchema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import FormField from '../components/FormField';
import Layout from '../components/Layout';

const Signup = () => {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onBlur',
    });

    return (
        <Layout className="flex-col items-center justify-center">
            <h1 className="text-4xl font-bold pb-8">Sign Up</h1>
            <form
                className="flex flex-col w-full max-w-md"
                onSubmit={handleSubmit((d) => {
                    console.log('hi');
                    console.log(d);
                })}
            >
                <FormField
                    name="name"
                    placeholder="Name..."
                    isInvalid={Boolean(errors.name?.message)}
                    isSubmitting={isSubmitting}
                    control={control}
                />
                <FormField
                    name="email"
                    placeholder="Email..."
                    isInvalid={Boolean(errors.email?.message)}
                    isSubmitting={isSubmitting}
                    control={control}
                />
                <FormField
                    name="password"
                    placeholder="Password..."
                    isInvalid={Boolean(errors.password?.message)}
                    isSubmitting={isSubmitting}
                    type="password"
                    control={control}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white my-2 p-2 rounded-lg justify-right"
                >
                    Sign Up
                </button>
                <button
                    className="flex text-gray-500 bg-gray-300 p-2 my-2 rounded-lg justify-center"
                    onClick={async (e) => {
                        e.preventDefault();
                        await signIn('google', {
                            callbackUrl: '/expense',
                        });
                    }}
                >
                    <GoogleIcon size="22px" className="mr-2" />
                    <span>Sign Up with Google</span>
                </button>
                <button
                    className="flex text-white bg-blue-500 p-2 my-2 rounded-lg justify-center"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/signin');
                    }}
                >
                    Sign In
                </button>
            </form>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);

    if (session?.user) {
        return {
            redirect: {
                destination: '/expense',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

export default Signup;
