'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { OctalysisProvider } from '../contexts/OctalysisContext';
import OctalysisMiniComponent from './OctalysisMiniComponent';
import { useEffect } from 'react';

const MiniTool = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
      // Check if session is already in the URL
      const session = searchParams.get('session');
      if (!session) {
          // Generate a random session string
          const sessionString = generateRandomSessionString();

          // Create a new URLSearchParams object to manipulate query parameters
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('session', sessionString);
    
          // Update the URL with the new query string
          router.replace(`${window.location.href}?${newSearchParams.toString()}`);
      }
  }, [router, searchParams]);
  const generateRandomSessionString = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <>
      <OctalysisProvider>
        <OctalysisMiniComponent />
      </OctalysisProvider>
    </>
  );
};

export default MiniTool;
