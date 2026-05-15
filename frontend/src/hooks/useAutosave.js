// src/hooks/useAutosave.js

import { useEffect } from 'react';

function useAutosave(
  data,
  callback,
  delay = 3000
) {

  useEffect(() => {

    const timer = setTimeout(() => {
      callback(data);
    }, delay);

    return () => clearTimeout(timer);

  }, [data, callback, delay]);

}

export default useAutosave;