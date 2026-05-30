import { useEffect, useState } from 'react';

/**
 * Reusable React hook that debounces any state value.
 * Useful for limiting API fetch calls on text input events.
 * @param value The reactive value to track.
 * @param delay Milliseconds to wait before updating the debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export default useDebounce;
