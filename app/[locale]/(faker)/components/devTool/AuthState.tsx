'use client';

import { useSessionStore } from '@/stores/useSessionStore';
import clsx from 'clsx/lite';
import { useState } from 'react';
import { motion } from 'framer-motion';
import LeftArrow from '../../../../components/icon/LeftArrow';
import { formatDate } from '@/lib/helpers/date/formatDate';
import Link from 'next/link';

const AuthState = () => {
  const { status, user, isAdmin, fireAuthError, isLoading, isLoggingIn } = useSessionStore((state) => ({
    status: state.status,
    user: state.user,
    isAdmin: state.isAdmin,
    fireAuthError: state.fireAuthError,
    isLoading: state.isLoading,
    isLoggingIn: state.isLoading,
  }));
  const [isShow, setIsShow] = useState(true);

  return (
    <div
      className={clsx(
        'fixed z-[99] flex py-1 gap-4 bottom-8 left-0 bg-sky-100 px-6',
        isShow ? 'min-w-max' : 'min-w-min'
      )}
    >
      <motion.div
        animate={{ x: isShow ? '0%' : '-100%', width: isShow ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className={clsx('h-4 overflow-hidden')}
      >
        <div className="flex justify-center gap-4 text-xs">
          <div>
            status:{' '}
            <span
              className={clsx(
                'font-semibold',
                status === 'anonymous' && 'text-red-500',
                status === 'authenticated' && 'text-green-500'
              )}
            >
              {status}
            </span>
          </div>
          <div>
            isAnonymous (DB):{' '}
            <span className={clsx('font-semibold', !user?.isAnonymous ? 'text-green-500' : 'text-red-500')}>
              {user ? (user.isAnonymous ? 'true' : 'false') : 'N/A'}
            </span>
          </div>
          <div>
            userId (DB):{' '}
            <span className={clsx('font-semibold', user?.id ? 'text-green-500' : 'text-red-500')}>
              {user?.id ?? 'N/A'}
            </span>
          </div>
          <div>
            userEmail (DB):{' '}
            <span className={clsx('font-semibold', user?.email ? 'text-green-500' : 'text-red-500')}>
              {user?.email ?? 'N/A'}
            </span>
          </div>
          <div>
            isAdmin:{' '}
            <span className={clsx('font-semibold', isAdmin ? 'text-green-500' : 'text-red-500')}>
              {isAdmin ? 'true' : 'false'}
            </span>
          </div>
          <div>
            isLoading:{' '}
            <span className={clsx('font-semibold', !isLoading ? 'text-green-500' : 'text-red-500')}>
              {isLoading ? 'true' : 'false'}
            </span>
          </div>
          <div>
            isLoggingIn:{' '}
            <span className={clsx('font-semibold', !isLoggingIn ? 'text-green-500' : 'text-red-500')}>
              {isLoggingIn ? 'true' : 'false'}
            </span>
          </div>
          <div>
            fireAuthError:{' '}
            <span className={clsx('font-semibold', !fireAuthError ? 'text-green-500' : 'text-red-500')}>
              {fireAuthError ?? 'null'}
            </span>
          </div>
          <div>
            lastLoggedInAt:{' '}
            <span className={clsx('font-semibold', user?.lastLoggedInAt ? 'text-green-500' : 'text-red-500')}>
              {user?.lastLoggedInAt ? formatDate(user.lastLoggedInAt, 'short') : 'Null'}
            </span>
          </div>
          <Link
            href="/faker"
            className="font-semibold text-sky-500 transition-all hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70"
          >
            Faker
          </Link>
          <Link
            href="/"
            className="font-semibold text-sky-500 transition-all hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="font-semibold text-sky-500 transition-all hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70"
          >
            Login
          </Link>
          <Link
            href="/admin"
            className="font-semibold text-sky-500 transition-all hover:underline underline-offset-1 hover:text-opacity-85 active:text-opacity-70"
          >
            Admin
          </Link>
        </div>
      </motion.div>
      <motion.button onClick={() => setIsShow((prev) => !prev)} animate={{ rotate: isShow ? 0 : 180 }}>
        <LeftArrow sizeClassName="size-4" />
      </motion.button>
    </div>
  );
};
export default AuthState;
