import { useCallback, useState } from 'react';

export type UseCounterOptions = {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
};

/**
 * Hook de compteur borné.
 * La logique est isolée dans un hook pour pouvoir être testée
 * indépendamment de tout composant.
 */
export function useCounter({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => {
    setCount((c) => Math.min(c + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((c) => Math.max(c - step, min));
  }, [step, min]);

  const reset = useCallback(() => setCount(initial), [initial]);

  return {
    count,
    increment,
    decrement,
    reset,
    canIncrement: count < max,
    canDecrement: count > min,
  };
}
