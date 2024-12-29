// you cannot write top-level async code inside hooks

import { useCallback, useEffect, useState } from "react"
// and you should i use other hoooks to do that(eg. useEffect)
const useHTTPS = ( ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    console.log(requestConfig)
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      console.log(data);
      // applyData trigger a rerender inside of the component which this hooks is being used 
      applyData(data);


    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHTTPS;