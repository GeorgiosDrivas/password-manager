'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { SignupSchemaType, signupSchema } from '@/schemas/signupSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  UserPlus,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const watchedPassword = watch('password', '');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    let strength = 0;
    if (watchedPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchedPassword)) strength += 25;
    if (/[0-9]/.test(watchedPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(watchedPassword)) strength += 25;
    setPasswordStrength(strength);
  }, [watchedPassword]);

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Strong';
    return 'Very Strong';
  };

  const handleSignup = async (data: SignupSchemaType) => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError('root', {
          type: 'manual',
          message: errorData.message || 'Failed to create account. Please try again.',
        });
        return;
      }

      router.push('/?registered=true');
    } catch {
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-white/20 dark:border-slate-800/50 overflow-hidden">
          <div className="px-8 pt-10 pb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25"
            >
              <UserPlus className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Secure your encrypted vault
            </p>
          </div>

          <div className="px-8 pb-8">
            <AnimatePresence>
              {errors.root && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {errors.root.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
              <input
                {...register('name')}
                placeholder="Full Name"
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10 outline-none transition-all text-slate-800 dark:text-slate-200 font-medium"
              />

              <input
                {...register('username')}
                placeholder="Username"
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10 outline-none transition-all text-slate-800 dark:text-slate-200 font-medium"
              />

              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl outline-none transition-all duration-200 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 text-slate-800 dark:text-slate-200 font-medium"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {watchedPassword && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Password strength</span>
                    <span className="font-medium text-emerald-500">{getStrengthLabel()}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      style={{ width: `${passwordStrength}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                    />
                  </div>

                  <ul className="text-xs text-slate-500 mt-3 space-y-1">
                    <li className="flex items-center gap-1">
                      {watchedPassword.length >= 8 ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-slate-400" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-1">
                      {/[A-Z]/.test(watchedPassword) ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-slate-400" />
                      )}
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-1">
                      {/[0-9]/.test(watchedPassword) ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-slate-400" />
                      )}
                      One number
                    </li>
                  </ul>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="cursor-pointer w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                href="/"
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
