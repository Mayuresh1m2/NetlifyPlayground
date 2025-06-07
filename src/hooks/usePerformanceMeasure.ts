import { useEffect, useRef } from 'react';
import { usePerformanceContext } from '../contexts/PerformanceContext';

/**
 * A custom hook to measure the time from when a component starts its render phase
 * until it has been mounted and its initial useEffect cleanup functions would be set up.
 * This provides a measure of "time to interactive" or "initial setup complete".
 * It records the duration once when the component has mounted and its first pass of effects ran.
 *
 * @param componentName The name of the component being measured.
 */
const usePerformanceMeasure = (componentName: string): void => {
  const { recordTiming } = usePerformanceContext();

  // Record the time when this hook (and thus the component's render phase) starts.
  // useRef ensures this value is stable across re-renders and captured at the right moment.
  const mountTimeRef = useRef<number>(performance.now());

  // To ensure we only record once per mount of this hook instance.
  const hasRecordedRef = useRef<boolean>(false);

  useEffect(() => {
    // This effect runs after the component has rendered to the screen
    // and after all synchronous useLayoutEffect hooks have completed.
    if (!hasRecordedRef.current) {
      const endTime = performance.now();
      const duration = endTime - mountTimeRef.current;
      recordTiming(componentName, duration);
      hasRecordedRef.current = true; // Mark as recorded
    }
    // Dependencies:
    // - componentName: Should be stable for a given component.
    // - recordTiming: Memoized in the context provider, so it's stable.
    // This means the effect effectively runs once after mount.
  }, [componentName, recordTiming]);
};

export default usePerformanceMeasure;
