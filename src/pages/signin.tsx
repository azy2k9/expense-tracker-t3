import React, { useState } from 'react';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { NextPageContext } from 'next';
import { SigninForm, SigninSchema } from '../utils/validationSchema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import FormField from '../components/FormField';

const Signin = () => {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SigninForm>({
        resolver: zodResolver(SigninSchema),
        mode: 'onBlur',
    });

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold pb-8">Sign In</h1>
            <form
                className="flex flex-col w-full max-w-md"
                onSubmit={handleSubmit((d) => {
                    console.log({ email: d.email, password: d.password });
                })}
            >
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
                    Sign in
                </button>
                <button
                    className="flex text-gray-500 bg-gray-300 p-2 my-2 rounded-lg justify-center"
                    onClick={async () => {
                        await signIn('google', {
                            callbackUrl: '/expense',
                        });
                    }}
                >
                    <GoogleIcon size="22px" className="mr-2" />
                    <span>Sign in with Google</span>
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
        </div>
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

export default Signin;
