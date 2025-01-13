import React, { useEffect, useState } from 'react';
import { setAuthToken, setRefreshToken } from '../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logIn, requestOtp } from '../redux/thunks/auth';
import { useRouter } from 'next/router';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { forgetPasswordPath } from '../constants/routes';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(Array(5).fill(''));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const loggedIn = useAppSelector((state) => !!state.auth.authToken);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isOtpRequested && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isOtpRequested, timer]);

  const handleRequestOtp = async () => {
    try {
      if (!phoneNumber) {
        setError('Please enter your phone number.');
        return;
      }

      setOtpLoading(true);
      await dispatch(requestOtp({ phoneNumber })).unwrap();
      setError('');
      setSuccessMessage('OTP sent successfully!');
      setIsOtpRequested(true);
      setTimer(30);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to request OTP.');
      setSuccessMessage('');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (isPhoneLogin) {
        if (!phoneNumber || otp.includes('')) {
          setError('Please fill in all fields (phone number and OTP).');
          return;
        }
        const otpCode = otp.join('');
        const response = await dispatch(
          logIn({ phoneNumber, loginCode: otpCode })
        ).unwrap();
        dispatch(setAuthToken(response.accessToken));
        dispatch(setRefreshToken(response.refreshToken));
      } else {
        if (!email || !password) {
          setError('Please fill in all fields (email and password).');
          return;
        }
        const response = await dispatch(logIn({ email, password })).unwrap();
        dispatch(setAuthToken(response.accessToken));
        dispatch(setRefreshToken(response.refreshToken));
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during login.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='w-full max-w-md p-8'>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          Login to your account
        </h1>
        <p className='text-gray-600 text-center mb-6'>
          {isPhoneLogin
            ? 'Enter your phone number to generate OTP'
            : 'Enter your email below to login to your account'}
        </p>

        {!isPhoneLogin && (
          <>
            <div className='mb-4'>
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
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <div className='flex justify-between items-center'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <button
                  onClick={() => router.push(forgetPasswordPath)}
                  className='text-sm hover:underline'
                >
                  Forgot your password?
                </button>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                id='password'
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
          </>
        )}
        {isPhoneLogin && (
          <>
            <input
              type='text'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
              pattern='[0-9]*'
              placeholder='(123) 456-7890'
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {isOtpRequested && (
              <div className='otp-container flex justify-center gap-2 mt-2'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type='text'
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className='otp-box w-9 h-9 text-center border border-gray-300 rounded-md mt-2'
                  />
                ))}
              </div>
            )}
          </>
        )}
        <div className='mb-6'>
          {error && (
            <div className='text-sm text-red-600 mt-4 w-72'>{error}</div>
          )}
          {successMessage && (
            <div
              className='text-sm text-green-600 mt-4'
              style={{ maxWidth: '280px' }}
            >
              {successMessage}
            </div>
          )}
        </div>

        {((isPhoneLogin && !otp.includes('')) || !isPhoneLogin) && (
          <button
            onClick={handleLogin}
            className='w-full bg-[#7AB16A] text-white py-2 px-4 rounded-md hover:bg-[#4e893b]'
          >
            Login
          </button>
        )}
        {isPhoneLogin && timer === 0 && otp.includes('') && (
          <button
            className='w-full bg-[#7AB16A] text-white py-2 px-4 rounded-md hover:bg-[#4e893b]'
            onClick={handleRequestOtp}
            disabled={otpLoading}
          >
            {otpLoading
              ? 'Requesting OTP...'
              : isOtpRequested
              ? 'Resend OTP'
              : 'Request OTP'}
          </button>
        )}
        {timer > 0 && (
          <div className='text-sm mt-2'>
            {`You can request a new OTP in ${timer} seconds.`}
          </div>
        )}
        {/* <div className='flex items-center justify-center my-7'>
          <div className='border-t border-gray-300 flex-grow'></div>
          <span className='mx-4 text-gray-500 text-sm'>Or continue with</span>
          <div className='border-t border-gray-300 flex-grow'></div>
        </div> */}
        {/* <button
          onClick={() => {
            setSuccessMessage('');
            setError('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setTimer(0);
            setIsOtpRequested(false);
            setOtp(Array(5).fill(''));
            setIsPhoneLogin(!isPhoneLogin);
          }}
          className='flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm  bg-white hover:bg-gray-50'
        >
          {isPhoneLogin
            ? 'Login with Email & Password'
            : 'Login with Phone Number'}
        </button> */}
      </div>
    </>
  );
};

export default LoginForm;
