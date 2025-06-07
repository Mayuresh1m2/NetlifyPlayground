import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';

interface Timings {
  [componentName: string]: number | null; // Duration in ms, or null if not yet recorded
}

interface PerformanceContextType {
  timings: Timings;
  recordTiming: (componentName: string, duration: number) => void;
}

// Default context value - provides a non-null recordTiming for safety, though it won't do anything
// if used outside a provider.
const defaultPerformanceContextValue: PerformanceContextType = {
  timings: {},
  recordTiming: () => {
    console.warn('recordTiming called outside of PerformanceProvider');
  },
};

export const PerformanceContext = createContext<PerformanceContextType>(defaultPerformanceContextValue);

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [timings, setTimings] = useState<Timings>({});

  const recordTiming = useCallback((componentName: string, duration: number) => {
    setTimings(prevTimings => {
      // console.log(`PERF: ${componentName} - ${duration.toFixed(2)}ms`); // Optional: log to console
      if (prevTimings[componentName] === undefined || prevTimings[componentName] === null) { // Record only the first timing
        return {
          ...prevTimings,
          [componentName]: duration,
        };
      }
      return prevTimings; // Avoid re-recording for now, or could update/average
    });
  }, []);

  return (
    <PerformanceContext.Provider value={{ timings, recordTiming }}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Custom hook to easily access the context values
export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  // Return default if context is the initial default (meaning no provider is above)
  // This makes it safer if someone forgets the provider, though recordTiming will warn.
  return context === defaultPerformanceContextValue ? defaultPerformanceContextValue : context;
};
