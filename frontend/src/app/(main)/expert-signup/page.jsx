'use client';
import axios from 'axios';
import { useFormik } from 'formik';
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

const expertSignup = () => {

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      const { name, email, password } = values;
      axios.post(`http://localhost:5000/expert/add`, { name, email, password })
        .then((result) => {
          toast.success("User Created Successfully");
          resetForm();
        }).catch((err) => {
          console.log(err);
          toast.error("User Creation Failed");
        });
    },
    validationSchema: SignupSchema,
  })
  return (
    <div>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
              alt=""
            />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up for an account
            </h2>
            <form className="space-y-6" method="POST" onSubmit={signupForm.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 relative">
                  <input
                    name="name"
                    type="text"
                    id='name'
                    onChange={signupForm.handleChange}
                    value={signupForm.values.name}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black"
                  />
                </div>
                {signupForm.touched.name && signupForm.errors.name && (
                  <div className="text-red-500 text-xs mt-1">{signupForm.errors.name}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email-address"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black"
                  />
                </div>
                {signupForm.touched.email && signupForm.errors.email && (
                  <div className="text-red-500 text-xs mt-1">{signupForm.errors.email}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    autoComplete="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black"
                  />
                </div>
                {signupForm.touched.password && signupForm.errors.password && (
                  <div className="text-red-500 text-xs mt-1">{signupForm.errors.password}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirm-password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.confirmPassword}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-black"
                  />
                </div>
                {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">{signupForm.errors.confirmPassword}</div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default expertSignup;