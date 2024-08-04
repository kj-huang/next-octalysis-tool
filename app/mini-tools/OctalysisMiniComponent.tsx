'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useOctalysis } from '../contexts/OctalysisContext';
import OctalysisRadar from '../ui/components/OctalysisRadar';
import OctalysisValue from '../ui/components/Panels/Values/OctalysisValue';

export default function OctalysisMiniComponent() {
  const [showValue, setShowValue] = useState(false);
  const radarRef = useRef(null);
  const valueRef = useRef(null);
  const [rendererDimensions, setRendererDimensions] = useState({ width: 0, height: 0 });
  
  const searchParams = useSearchParams();
  const session = searchParams.get('session') || '';

  // Access context data
  const contextData = useOctalysis();

  useEffect(() => {
    // (Optional) Restore context data from sessionStorage
    if (typeof window !== 'undefined') {
      const savedContextData = sessionStorage.getItem(session);
      if (savedContextData) {
        // Assuming your context has a method to update its data
        const parsedData = JSON.parse(savedContextData);
        // You can implement a context update function to apply this data
        // context.updateContext(parsedData);
        console.log('Restored context data:', parsedData);
        contextData.data = parsedData.data;
      }
    }
  }, [session]);

  const toggleValueVisibility = () => {
    setShowValue((prevShowValue) => !prevShowValue);
  };

  const calculateDimensions = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setRendererDimensions({
      width: windowWidth,
      height: windowHeight,
    });
  };

  useEffect(() => {
    // Calculate dimensions initially
    calculateDimensions();

    // Recalculate dimensions on window resize
    window.addEventListener('resize', calculateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  useEffect(() => {
    // Save context data to sessionStorage
    if (typeof window !== 'undefined' && contextData) {
      sessionStorage.setItem(session, JSON.stringify(contextData));
    }
  }, [contextData, session]);



  return (
    <>
      <button
        onClick={toggleValueVisibility}
        style={{
          position: 'absolute',
          zIndex: 2,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
          fontSize: '16px',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          (e.target as HTMLElement).style.backgroundColor = '#0056b3';
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          (e.target as HTMLElement).style.backgroundColor = '#007bff';
        }}
      >
        {showValue ? 'Hide Value ' : 'Show Value Editor'}
      </button>

      <div ref={radarRef} style={{ position: 'relative' }}>
        <OctalysisRadar width={rendererDimensions.width} height={rendererDimensions.height} />
      </div>
      {showValue && (
        <div
          ref={valueRef}
          style={{
            position: 'absolute',
            width: '30%',
            left: '0px', // You can adjust the position as needed
            top: '0px', // You can adjust the position as needed
          }}
        >
          <OctalysisValue />
        </div>
      )}
    </>
  );
}
