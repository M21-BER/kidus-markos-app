import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (url:string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const res = await axios.get(url, {
          signal: controller.signal,
        });
        if (res.status !== 200) {
          throw new Error("could not fetch the data for that resource");
        }
        setIsPending(false);
        setData(res.data);
        setError(null);
      } catch (error:any) {
        if (error.name !== "CanceledError") {
          setIsPending(false);
          setData(null);
          setError(error);
        }
      }
    }
    setTimeout(() => {
      getData();
    }, 4000);

    return () => controller.abort();
  }, [url]);

  return [data, isPending, error];
};

export { useAxios };
