"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

const LoginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values
      );

      if (data.token) {
        localStorage.setItem("token", data.token); // save token locally
        toast.success("Login successful!");
        router.push("/"); // navigate to homepage
      }
    } catch (err: any) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 font-sans">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl mt-12">
        {/* Logo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
          <Image src="/afnodokan.png" alt="Logo" width={64} height={64} />
        </div>

        {/* Header */}
        <div className="bg-indigo-700 pt-16 pb-8 text-center rounded-t-3xl">
          <h1 className="text-white text-2xl font-extrabold tracking-[4px]">
            LOGIN
          </h1>
          <p className="text-slate-300 font-bold text-sm mt-2">
            Namaskar 🙏 Welcome back
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await handleLogin(values);
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
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-base outline-none transition
                             focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="password"
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don&apos;t have an account?{" "}
                <a
                  href="register"
                  className="text-indigo-600 font-extrabold hover:underline"
                >
                  Create Account
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
