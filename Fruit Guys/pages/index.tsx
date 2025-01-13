import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { loginPath } from '../constants/routes';

export default function Home() {
  const router = useRouter();
  const loggedIn = useAppSelector((state)=>!!state.auth.authToken);

  useEffect(() => {
    if (!loggedIn) {
      router.push(loginPath);
    } else {
      router.push('/dashboard');
    }
  }, [loggedIn, router])

  const callAPI = async () => {
    try {
      console.log("env.NODE_ENV:", process.env.NODE_ENV)
      console.log("env.BASE_URI:", process.env.BASE_URI)
      let baseUri = process.env.BASE_URI
      const res = await fetch(`${baseUri}/control/healthy`);
      const data = await res.text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div><button onClick={callAPI}>Make API call (after push)</button></div>
          <Link href="/dashboard">Go to dashboard</Link>
        </main>
      </div>
  );
}