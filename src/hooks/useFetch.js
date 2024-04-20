import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 5 * 60 * 1000; // 5mins

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }

    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storageKey);

      if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

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
  }, [url, options, storageKey]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;
