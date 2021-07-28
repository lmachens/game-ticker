import { useCallback, useEffect, useState } from 'react';

// https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFetch<T extends (...args: any[]) => Promise<any>>(
  func: T,
  {
    refreshInterval,
    skipInitialRequest,
    invalidateOn,
  }: {
    refreshInterval?: number;
    skipInitialRequest?: boolean;
    invalidateOn?: React.DependencyList;
  } = {}
): {
  data: Awaited<ReturnType<T>> | null;
  errorMessage: string | null;
  refresh: (...args: Parameters<T>) => Promise<void>;
} {
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setErrorMessage(null);
      await func().then((result) => {
        setData(result);
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'An error occurred');
      setData(null);
    }
  }, invalidateOn || []);

  useEffect(() => {
    if (!skipInitialRequest) {
      refresh();
    }
  }, [refresh, skipInitialRequest]);

  useEffect(() => {
    if (!refreshInterval) {
      return;
    }
    const intervalId = setInterval(refresh, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [refresh, refreshInterval]);

  return { data, errorMessage, refresh };
}

export default useFetch;
