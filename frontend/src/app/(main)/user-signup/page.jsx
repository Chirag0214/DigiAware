'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Nmae is required'),
  email: Yup.string().email('Invalid email').required('email is requried'),
  password: Yup.string()
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lower case')
    .matches(/[A-Z]/, 'Password must contain a upper case')
    .matches(/\W/, 'Password must contain a special  character')
    .min(8, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password must match'),
})

const Signup = () => {
const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios.post(`http://localhost:5000/user/add`, values)
        .then((result) => {
          toast.success("User Created Successfully");
          resetForm();
          router.push('/user-login')

        }).catch((err) => {
          console.log(err);
          toast.error("User Creation Failed");
        });
    },
    validationSchema: SignupSchema,
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{width: '100vw', background: '#000'}}>
      <div className="w-full flex flex-col items-center mb-6 mt-8">
        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-wide uppercase drop-shadow-lg">Create Your Account</span>
      </div>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-white dark:border-neutral-700 p-6 sm:p-10 flex flex-col justify-center" style={{color:'#111', minHeight: 600}}>
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white" style={{color:'#111'}}>
            Sign up
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400" style={{color:'#111'}}>
            Already have an account?
            <a
              className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              href="/user-login"
              style={{color:'#1976d2'}}
            >
              Login here
            </a>
          </p>
        </div>
        <div>
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-neutral-400" style={{color:'#111'}}>
        Are you expert?
        <a
          className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
          href="/expert-login"
          style={{color:'#1976d2'}}
        >
          Login here
        </a>
        </p>
          </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <svg
              className="w-4 h-auto"
              width={46}
              height={47}
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Sign up with Google
          </button>
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            Or
          </div>
          {/* Form */}
          <form onSubmit={signupForm.handleSubmit}>
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 dark:text-gray-900"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter your name'
                    onChange={signupForm.handleChange}
                    value={signupForm.values.name}

                    className="py-2.5 sm:py-3 px-4 block w-full border border-black border-solid rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    style={{color:'#111', background:'#fff'}}

                    aria-describedby="name-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (signupForm.errors.name && signupForm.touched.name) && (
                    <p className='text-xs text-red-600 mt-2'>
                      {signupForm.errors.name}
                    </p>
                  )
                }
              </div>
              {/* End Form Group */}
              {/* Form Group */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 dark:text-gray-900"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter your email'
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-black border-solid rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    style={{color:'#111', background:'#fff'}}

                    aria-describedby="email-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (signupForm.errors.email && signupForm.touched.email) && (
                    <p className='text-xs text-red-600 mt-2'>
                      {signupForm.errors.email}
                    </p>
                  )
                }
              </div>
              {/* End Form Group */}
              {/* Form Group */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter your password'
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-black border-solid rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    style={{color:'#111', background:'#fff'}}

                    aria-describedby="password-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (signupForm.errors.password && signupForm.touched.password) && (
                    <p className='text-xs text-red-600 mt-2'>
                      {signupForm.errors.password}
                    </p>
                  )
                }
              </div>
              {/* End Form Group */}
              {/* Form Group */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm mb-2 dark:text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Enter your confirm password'
                    onChange={signupForm.handleChange}
                    value={signupForm.values.confirmPassword}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-black border-solid rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    style={{color:'#111', background:'#fff'}}

                    aria-describedby="confirmPassword-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {
                  (signupForm.errors.confirmPassword && signupForm.touched.confirmPassword) && (
                    <p className='text-xs text-red-600 mt-2'>
                      {signupForm.errors.confirmPassword}
                    </p>
                  )
                }
              </div>
              {/* End Form Group */}
              {/* Checkbox */}
              <div className="flex items-center">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ms-3">
                  <label htmlFor="remember-me" className="text-sm dark:text-gray-900">
                    I accept the{" "}
                    <a
                      className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                      href="#"
                      style={{color:'#1976d2'}}
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {/* End Checkbox */}
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign up
              </button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
    </div>

  )
}

export default Signup;