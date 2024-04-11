import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
        if (axios.isCancel(error)) {
          return;
        }

        setError('There was a problem. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
