import React, { useEffect, useState } from 'react';
import { getResetPasswordLink, resetPassword } from '../redux/thunks/auth';
import { useAppDispatch } from '../redux/hooks';
import { useRouter } from 'next/router';
import { loginPath } from '../constants/routes';

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token && typeof token === 'string') {
      setResetMode(true);
    }
  }, [token]);

  const handleSendResetLink = async () => {
    setError('');
    setSuccess('');
    try {
      if (!email) {
        setError('Please enter your email.');
        return;
      }
      setLoading(true);
      await dispatch(getResetPasswordLink(email)).unwrap();

      setSuccess('Please check your email to reset your password.');
      setEmail('');
    } catch (err) {
      console.error(err);
      setError(
        err?.message || 'An error occurred while sending the reset link.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');
    try {
      if (!password || !confirmPassword) {
        setError('Please fill out all fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setLoading(true);
      await dispatch(
        resetPassword({ token: token?.toString(), password })
      ).unwrap();
      setConfirmPassword('');
      setPassword('');
      setSuccess('Your password has been successfully reset.');
      setTimeout(() => {
        router.push(loginPath);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='w-full max-w-md p-8'>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          {resetMode ? 'Set your password' : 'Forgot your password?'}
        </h1>
        <p className='text-gray-600 text-center mb-6'>
          {resetMode
            ? 'Please enter your new password to continue'
            : 'Enter your email address and we’ll send you a link to reset your password.'}
        </p>

        <div>
          {resetMode ? (
            <div className='mb-4'>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  New Password
                </label>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='Confirm Password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>

                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type='password'
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='johndoe@example.com'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </>
          )}

          {error && (
            <div className='text-sm text-red-600 mt-4 w-72'>{error}</div>
          )}
          {success && (
            <div className='text-sm text-green-600 mt-4 w-72'>{success}</div>
          )}
        </div>
        {resetMode ? (
          <button
            disabled={loading}
            className='mt-6 w-full bg-[#7AB16A] text-white py-2 px-4 rounded-md hover:bg-[#4e893b]'
            onClick={handleResetPassword}
          >
            {loading ? 'Requesting...' : 'Reset Password'}
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={handleSendResetLink}
            className='mt-6 w-full bg-[#7AB16A] text-white py-2 px-4 rounded-md hover:bg-[#4e893b]'
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        )}

        <div className='mt-2'>
          <div className='flex justify-end items-center'>
            <button
              onClick={() => router.push(loginPath)}
              className='text-sm hover:underline'
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
      {/* <div className="reset-passowrd login-container flex flex-col items-center">
        {resetMode ? (
          <>
            <div className="flex mt-4 w-full max-w-sm justify-center">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input block mt-2"
              />
            </div>
            <div className="flex w-full max-w-sm justify-center">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-input block mt-2"
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 mt-4 w-72">{error}</div>
            )}
            {success && (
              <div className="text-sm text-green-600 mt-4 w-72">{success}</div>
            )}
            <button
              disabled={loading}
              className="login-button text-white bg-[#7AB16A] mt-5 font-bold"
              onClick={handleResetPassword}
            >
              {loading ? "Requesting..." : "Reset Password"}
            </button>
          </>
        ) : (
          <>
            <div className="flex mt-4 w-full max-w-sm justify-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input block"
              />
            </div>
            {error && <div className="text-sm text-red-600 mt-4">{error}</div>}
            {success && (
              <div className="text-sm text-green-600 mt-4">{success}</div>
            )}
            <button
              disabled={loading}
              className="login-button text-white bg-[#7AB16A] mt-5 font-bold"
              onClick={handleSendResetLink}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </>
        )}
      </div> */}
    </>
  );
};

export default ResetPasswordForm;
