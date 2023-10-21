import React from 'react';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { NextPageContext } from 'next';
import { SigninForm, SigninSchema } from '../utils/validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import FormField from '../components/FormField';
import Layout from '../components/Layout';

const Signin = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
    mode: 'onBlur',
  });

  return (
    <Layout
      className="flex-col items-center justify-center"
      loading={isSubmitting}
    >
      <h1 className="dark:text-white text-green-500 text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center p-4">
        Sign In
      </h1>
      <form
        className="flex flex-col w-full max-w-md"
        onSubmit={handleSubmit((d) => {
          console.log({ email: d.email, password: d.password });
        })}
      >
        <FormField name="email" placeholder="Email..." control={control} />
        <FormField
          name="password"
          placeholder="Password..."
          type="password"
          control={control}
        />
        <button
          type="submit"
          className="btn btn-primary my-2 p-2 rounded-lg justify-right"
        >
          Sign in
        </button>
        <button
          className="btn btn-primary flex p-2 my-2 rounded-lg justify-center"
          onClick={async (e) => {
            e.preventDefault();
            await signIn('google', {
              callbackUrl: '/expenses',
            });
          }}
        >
          <GoogleIcon size="22px" className="mr-2" />
          <span>Sign in with Google</span>
        </button>
        {/* Disable the sign up functionality for now */}
        {/* <button
                    className="flex text-white bg-green-400 hover:bg-green-500 p-2 my-2 rounded-lg justify-center"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/signup');
                    }}
                >
                    Sign Up
                </button> */}
      </form>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: '/expenses',
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
