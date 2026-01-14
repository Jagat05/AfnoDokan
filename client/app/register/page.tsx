"use client";

import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 font-sans">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl mt-12">
        {/* Logo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
          <Image
            src="/afnodokan.png"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        {/* Header */}
        <div className="bg-indigo-700 pt-16 pb-8 text-center rounded-t-3xl">
          <h1 className="text-white text-2xl font-extrabold tracking-[4px]">
            Register
          </h1>
          <p className="text-slate-300 font-bold text-sm mt-2">
            New User ? No Worries Do Register !!
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values); // connect API here
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="px-8 py-10">
              {/* Username */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white text-base
                           bg-linear-to-r from-indigo-500 to-indigo-700
                           shadow-lg shadow-indigo-500/30
                           transition-all duration-300
                           hover:-translate-y-0.5 hover:shadow-xl
                           active:scale-95
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Register
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Have an account ?{" "}
                <a
                  href="login"
                  className="text-indigo-600 font-extrabold hover:underline"
                >
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
