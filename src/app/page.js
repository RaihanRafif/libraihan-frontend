'use client'

import { useEffect } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard when the component mounts
    router.push('/dashboard');
  }); // Empty dependency array ensures this effect runs only once

  return (
    <main className={styles.main}>
      {/* You can add content here if needed */}
    </main>
  );
}
