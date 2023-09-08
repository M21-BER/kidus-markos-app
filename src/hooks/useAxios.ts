import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (url:string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [update,setUpdate] = useState<boolean>(false);
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
        setUpdate(false)
        setData(res.data);
        setError(null);
      } catch (error:any) {
        if (error.name !== "CanceledError") {
          setIsPending(false);
          setUpdate(false)
          setData(null);
          setError(error);
        }
      }
    }
      getData();
    return () => controller.abort();
  }, [url,update]);

  return [data, isPending, error,setUpdate];
};

export { useAxios };
