import axios from "axios";
import { useState, useEffect } from "react";
import { failMessage } from "../utils/utils";
import { errorResponse } from "../utils/errorResponse";

const useAxios = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const reload = ()=>{
    setUpdate(!update)
  }
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
      } catch (error: any) {
        if(error.code !== "ERR_NETWORK"){
        if (error.name !== "CanceledError") {
          const {message,status} = errorResponse(error)
          if (message && status) {
            setError(message);
            setIsPending(false);
            setData(null);
          } else {
            setError(failMessage);
            setIsPending(false);
            setData(null);
          }
        }
       }else{
          setError(error.code);
          setIsPending(false);
          setData(null);
        }
      }
    }
    getData();
    return () => controller.abort();
  }, [url, update]);

  return [data, isPending, error, reload];
};

export { useAxios };
