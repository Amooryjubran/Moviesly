import { useCallback, useState } from "react";

export const usePost = ({ url, inputs, setInputs }) => {
  const [postMethod, setPostMethod] = useState({
    data: null,
    error: null,
    isLoading: false,
  });
  const PostApi = useCallback(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => setInputs(data));
  }, [inputs]);

  return [postMethod, PostApi];
};
