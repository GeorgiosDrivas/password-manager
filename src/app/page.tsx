"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { loginSchema, LoginSchemaType } from "../schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  User,
  AlertCircle,
  Loader2,
  Fingerprint,
  KeyRound,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin =
    (setLoading: (value: boolean) => void) => async (data: LoginSchemaType) => {
      try {
        setLoading(true);
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
          callbackUrl: "/dashboard/items",
        });

        if (!res?.ok) {
          setLoading(false);
          setError("root", {
            type: "manual",
            message: res?.error || "Invalid credentials",
          });
          return;
        }

        router.push("/dashboard/items");
      } catch (error) {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-white/20 dark:border-slate-800/50 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-10 pb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 relative"
            >
              <Shield className="w-10 h-10 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-emerald-400/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Password Manager
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Secure access to your encrypted vault
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            {/* Error Alert */}
            <AnimatePresence mode="wait">
              {errors.root && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                    {errors.root.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit(handleLogin(() => {}))}
              className="space-y-5"
            >
              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <input
                    {...register("username")}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 text-slate-800 dark:text-slate-200 font-medium"
                    placeholder="Enter your username"
                  />
                  <AnimatePresence>
                    {errors.username && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -bottom-6 left-1 text-xs text-red-500 font-medium flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.username.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 text-slate-800 dark:text-slate-200 font-medium"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      animate={{ rotate: showPassword ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -bottom-6 left-1 text-xs text-red-500 font-medium flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-8 relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-emerald-500/40 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group"
              >
                Create account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
