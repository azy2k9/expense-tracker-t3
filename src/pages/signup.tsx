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
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
  });

  return (
    <Layout
      className="flex-col items-center justify-center"
      loading={isSubmitting}
    >
      <h1 className="text-4xl font-bold pb-8">Sign Up</h1>
      <form
        className="flex flex-col w-full max-w-md"
        onSubmit={handleSubmit(() => {
          console.log('hi');
        })}
      >
        <FormField name="name" placeholder="Name..." control={control} />
        <FormField name="email" placeholder="Email..." control={control} />
        <FormField
          name="password"
          placeholder="Password..."
          type="password"
          control={control}
        />
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <button
          className="btn btn-primary"
          onClick={async (e) => {
            e.preventDefault();
            await signIn('google', {
              callbackUrl: '/expenses',
            });
          }}
        >
          <GoogleIcon size="22px" className="mr-2" />
          <span>Sign Up with Google</span>
        </button>
        <button
          className="btn btn-primary"
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

export default Signup;
