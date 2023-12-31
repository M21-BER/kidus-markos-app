import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonLoading,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import OrderList from "./OrderList";
import OrderSkeleton from "./OrderSkeleton";
import { UserContext } from "../../../context/AuthContext";
import { errorResponse } from "../../../utils/errorResponse";
interface Props{
  spacer:string;
  updateEventNow:()=>void 
 }
const Order: React.FC<Props> = ({spacer,updateEventNow}) => {
  const [error, setError] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const controller: AbortController = new AbortController();
  const [present, dismiss] = useIonLoading();
  const {navigate,loaded,fetchLoaded} = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(loaded.orders.loaded?false:true);
  let err = '';
  const getOrders = async () => {
    try {
      const data = await axios(`${url}/api/products`, {
        signal: controller.signal,
      });
      setError(null)
      return data.data;
    } catch (error: any) {
      setOrders([]);
      if(error.code !== "ERR_NETWORK"){
      if (error.name !== "CanceledError") {
        const {message,status} = errorResponse(error);
        if (message && status) {
          err = message;
          setError(message);
        } else {
          err = failMessage;
          setError(failMessage);
        }
      }}else{
        setError(error.code);
        err = error.code;
      }
    }
  };
  useEffect( () => {
   const fetchOrder = async () => {
    const ordersRes = await getOrders();
    setOrders(ordersRes);
    if(ordersRes && ordersRes.length !== 0){
    fetchLoaded!('orders',{loaded:true,data:ordersRes?ordersRes:[],error:err});
    }
    setLoading(false);
  }
  if(!loaded.orders.loaded){    
    fetchOrder()
  }else{
    setOrders(loaded.orders.data);
    if(loaded.orders.error){
      setError(loaded.orders.error);
      }
  }
  },[]);
  const doRefresh = async (event: any) => {
    setLoading(true);
    updateEventNow();
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
    updateEventNow();
    await present("Refreshing...");
    const data = await getOrders();
    dismiss();
    setOrders(data);
    setLoading(false);
  };
  if(!loading){
  if (error) {
    return (
      <IonPage>
     <ErrorFallBack error={error} reload={reload} />
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher>
          <OrderList orders={orders} navigate={navigate} />
        </IonContent>
        <div className="spacer_drawer" style={{height:`${spacer}`}}></div>
      </IonPage>
    );
  }
}else{
  return (
    <IonPage>
      <IonContent>
        <OrderSkeleton loading={loading} />
      </IonContent>
      <div className="spacer_drawer" style={{height:`${spacer}`}}></div>
    </IonPage>
  );
}
};

export default Order;
