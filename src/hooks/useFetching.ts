import { AxiosError } from "axios";
import { useState } from "react";

export const useFetching = (
  callback: () => Promise<void>
): [useFetch, boolean, string] => {
  const [retry, setRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetching = async () => {
    try {
      setIsLoading(true);
      setRetry(false);
      await callback();
    } catch (error: unknown) {
      const e = error as AxiosError;
      console.error(e.message);
      setError(e.message);
      setRetry(true);
      if (!retry) {
        await fetching();
      }
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
