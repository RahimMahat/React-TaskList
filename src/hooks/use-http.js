import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestOptions, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestOptions.url, {
        method: requestOptions.method ? requestOptions.method : "GET",
        headers: requestOptions.headers ? requestOptions.headers : {},
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
