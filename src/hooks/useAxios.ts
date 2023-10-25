import axios from "axios";
import { useState, useEffect } from "react";
import { failMessage } from "../utils/utils";

const useAxios = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
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
        setUpdate(false);
        setData(res.data);
        setError(null);
      } catch (error: any) {
        if(error.code !== "ERR_NETWORK"){
        if (error.name !== "CanceledError") {
          setIsPending(false);
          setUpdate(false);
          setData(null);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
          ) {
            setError(error.response.data.error.message);
          } else {
            setError(failMessage);
          }
        }
       }else{
          setError(error.code);
        }
      }
    }
    getData();
    return () => controller.abort();
  }, [url, update]);

  return [data, isPending, error, setUpdate];
};

export { useAxios };
