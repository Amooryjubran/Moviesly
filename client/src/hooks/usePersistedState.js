import { useState, useEffect, useRef } from "react";
const usePersistedState = (name, defaultValue) => {
  const nameRef = useRef(name);
  const [value, setValue] = useState(() => {
    return sessionStorage.getItem(nameRef.current)
      ? JSON.parse(sessionStorage.getItem(nameRef.current))
      : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(nameRef.current, JSON.stringify(value));
  });

  return [value, setValue];
};

export default usePersistedState;
