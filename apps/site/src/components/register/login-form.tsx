import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsApple } from 'react-icons/bs';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useToasts } from 'react-toast-notifications';
import { ThemeContext } from '../../context/ThemeContext';
import { FormLoader } from '../lib/loader';

const LoginForm = () => {
  const { lostPasswordHandler } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { addToast } = useToasts();

  // React.useEffect(() => {
  //   if (data) {
  //     localSave('UserData', {
  //       accessToken: data?.user?.accessToken,
  //       login_at: new Date(),
  //       // expires one day after login
  //       expires_in: new Date(new Date().getTime() + 86400000),
  //       message: 'Successfully user logged in',
  //     });
  //     router.push(
  //       router.query?.callbackUrl
  //         ? (router.query?.callbackUrl as string)
  //         : '/dashboard',
  //     );
  //   }
  // }, [data]);

  const onSubmitHandler = async (data: any) => {
    // const local = localGet('user_login_info');

    // await Axios({
    //   method: 'post',
    //   url: `/users/login`,
    //   data: {
    //     email: data.email,
    //     password: data.password,
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200 || res.status === 201) {
    //       /* ------------------------- localStorage data save ------------------------- */
    //       localSave('UserData', {
    //         ...res.data,
    //         login_at: new Date(),
    //         // expires one day after login
    //         expires_in: new Date(new Date().getTime() + 86400000),
    //       });
    //       /* -------------------------- user logged in popup ------------------------- */
    //       addToast(res.data.message, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       });
    //       router.replace('/dashboard');
    //       setTimeout(() => {
    //         reset();
    //       }, 600);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response.data) {
    //       addToast(error.response.data.message, {
    //         appearance: 'error',
    //         autoDismiss: true,
    //       });
    //     } else {
    //       addToast(error.message, {
    //         appearance: 'error',
    //         autoDismiss: true,
    //       });
    //     }
    //   });

    // if (data.remember) {
    //   localSave('user_login_info', data);
    // }
    // if (data.remember === false && local) {
    //   localRemove('user_login_info');
    // }
    setIsLoading(true);
    signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: true,
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
      <div className="mb-6 text-center">
        <h3 className="mb-4 text-2xl text-themeDarker">Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-6">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="Username"
          >
            Username
          </label>
          <input
            id="Username"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.email ? '!border-red-500' : 'border-gray'
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="email"
            {...register('email', { required: true })}
            placeholder="Enter Your Username"
          />
          {errors?.email && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.password ? '!border-red-500' : 'border-gray'
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="password"
            {...register('password', { required: true })}
            placeholder="Enter Your Password"
          />
          {errors?.password && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="w-full md:w-1/2">
            <label className="relative inline-flex items-center">
              <input
                className="checked:bg-red-500 w-4 h-4"
                {...register('remember')}
                type="checkbox"
              />
              <span className="ml-3 text-sm text-themeDarker font-normal">
                Remember me
              </span>
            </label>
          </div>
          <div className="w-full md:w-auto mt-1">
            <button
              className="inline-block text-sm font-normal text-themePrimary hover:text-green-600 hover:underline"
              type="button"
              onClick={lostPasswordHandler}
            >
              Lost password?
            </button>
          </div>
        </div>
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
            isLoading ? 'bg-themeDarkerAlt' : 'bg-themePrimary'
          } rounded-md hover:bg-black`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : 'Login'}
          {isLoading && <FormLoader />}
        </button>
        <p className="text-center flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-deep font-normal">Not a Member?</span>
          <Link href="/sign-up">
            <a className="inline-block text-sm font-normal text-themePrimary hover:text-green-600 hover:underline">
              Create Account
            </a>
          </Link>
        </p>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        {/* GitHub Login */}
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out w-full text-base text-white font-normal text-center leading-6 rounded-md bg-black hover:opacity-70`}
          onClick={() => signIn('github')}
        >
          <FaGithub className="text-2xl" /> Sign in
        </button>
        {/* Google Login */}
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out w-full text-base text-white font-normal text-center leading-6 rounded-md bg-black hover:opacity-70`}
          onClick={() => signIn('google')}
        >
          <FcGoogle className="text-2xl" /> Sign in
        </button>
        {/* Facebook Login */}
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out w-full text-base text-white font-normal text-center leading-6 rounded-md bg-black hover:opacity-70`}
          onClick={() => signIn('facebook')}
        >
          <FaFacebook className="text-2xl" /> Sign in
        </button>
        {/* Linkedin Login */}
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out w-full text-base text-white font-normal text-center leading-6 rounded-md bg-black hover:opacity-70`}
          onClick={() => signIn('linkedin')}
        >
          <FaLinkedin className="text-2xl" /> Sign in
        </button>
        {/* Apple login */}
        <button
          className={`!py-3 px-7 flex gap-2 col-span-2 justify-center items-center transition-all duration-300 ease-in-out w-full text-base text-white font-normal text-center leading-6 rounded-md bg-black hover:opacity-70`}
          onClick={() => signIn('apple')}
        >
          <BsApple className="text-2xl" /> Sign in
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
