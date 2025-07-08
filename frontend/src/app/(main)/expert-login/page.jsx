'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const expertLogin = () => {

  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post(`http://localhost:5000/expert/authenticate`, values)
        .then((result) => {
          toast.success('Login Successful')
          localStorage.setItem('token', result.data.token);
          router.push('/expert/profile');
        }).catch((err) => {
          toast.error('Login Failed')
          console.log(err);
        });

    }
  })
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <div className="h-screen bg-black py-20 p-4 md:p-20 lg:p-32" style={{color:'#111'}}>
        <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{color:'#111'}}>Welcome Back!</h2>
            <p className="text-gray-700 mb-6" style={{color:'#111'}}>Please login to your account</p>
            <form onSubmit={loginForm.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                  style={{color:'#111'}}
                >
                Email
                </label>
                <input
                  className="shadow appearance-none border border-black border-solid rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  style={{color:'#111', background:'#fff'}}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                  style={{color:'#111'}}
                >
                Password
                </label>
                <input
                  className="shadow appearance-none border border-black border-solid rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  style={{color:'#111', background:'#fff'}}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className='text-center'>
              <p className="mt-2 text-sm text-black">
            Don't have an account yet?
            <a
              className="text-blue-800 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-600"
              href="/expert-signup"
            >
              Sign up here
            </a>
          </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default expertLogin;