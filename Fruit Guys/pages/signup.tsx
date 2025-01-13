import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../assets/GroScale_logo.png';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentPage } from "../redux/slices/dashboard";
import{
  setAuthToken,
  setRefreshToken
} from "../redux/slices/auth"
import { logIn } from "../redux/thunks/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loggedIn = useAppSelector((state)=>!!state.auth.authToken);

  useEffect(() => {
    dispatch(setCurrentPage("login"));
  })

  const handleLogin = async () => {

    if (!email || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const onFulfilled = (response) => {
      console.log("response: ", response)
      dispatch(setAuthToken(response.accessToken));
      dispatch(setRefreshToken(response.refreshToken));
      router.push('/dashboard');
    };

    const onRejected = (error) => {
      console.log("error: ", error);
      setEmail('');
      setPassword('');
      setError(error.message);
    }

    dispatch(logIn({email, password})).unwrap().then(onFulfilled, onRejected)

    // dispatch(logIn({email, password})).then(
    //   (response) => {
    //     console.log("response: ", response)
    //     if (response.meta.requestStatus === 'rejected') {
    //       setError(response.payload);
    //     }
    //     dispatch(setAuthToken(response.payload.accessToken));
    //     dispatch(setRefreshToken(response.payload.refreshToken));
    //     router.push('/dashboard');
    //   },
    //   (error) => {
    //     console.log("error: ", error)
    //   },
    // ).catch((error) => {
    //   console.log("error: ", error);
    // })
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="basis-1/2 login-container flex flex-col items-center">
        <div>
          <Image 
            src={logo}
            alt="GroScale Logo"
            width={80}
          />
        </div>
      
        <div className="justify-left">
          <div className="flex-col items-center">
            <h1 className="text-xl mt-3">Carrier Sign Up</h1>
            <h5 className="mt-6">Account Information</h5>
            <div className="signup-container flex-col items-center">

              <div className="mt-4">
                <div >
                <h5 className="mt-6">User Id</h5>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="long-input"
                  />
                </div>

                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
                  <div>
                    <h5 className="mt-6">Password</h5>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="long-input"
                      />
                    </div>
                  </div>
                
                  <div>
                    <h5 className="mt-6">Confirm Password</h5>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="long-input"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="long-button text-white bg-gray-500 mt-5 font-bold">Create Account</button>
                </div>
              </div>
            </div>
            <div className="inline-flex mt-4">
              <input type="checkbox" name="is_read"/>
              <h5>&nbsp; I understand terms and conditions</h5>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center dark:bg-gray-800 mt-2">
          <button className="px-4 py-2 google-button border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" width={1000} height={500} loading="lazy" alt="google logo"/>
              <span>Login with Google</span>
          </button>
      </div>
      <div className="inline-flex mt-4">
        <h6 className=" text-sm">Already have an account? <Link href="/login" className="mt-4 login-link">login</Link> </h6>
      </div>
        {/* <div className="justify-left basis-2/3">
          <div className="signup-container flex-col items-center">
            <button className="long-button bg-gray-200 mt-5 font-bold">Sign in with Google</button>
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <Image className="w-12 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" width={1000} height={500} loading="lazy" alt="google logo"/>
              <span>Login with Google</span>
          </button>
          </div>
        </div> */}
      </div>
    </div>
    
  );
};

export default Login;