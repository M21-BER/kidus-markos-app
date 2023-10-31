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
interface Props{
  spacer:string 
 }
const Order: React.FC<Props> = ({spacer}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const controller: AbortController = new AbortController();
  const [present, dismiss] = useIonLoading();
  const {navigate} = useContext(UserContext)
  const getOrders = async () => {
    try {
      const data = await axios(`${url}/api/products`, {
        signal: controller.signal,
      });
      setError(null)
      return data.data;
    } catch (error: any) {
      if(error.code !== "ERR_NETWORK"){
      if (error.name !== "CanceledError") {
        setOrders([]);
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
      }}else{
        setError(error.code);
      }
    }
  };
  useEffect( () => {
   (async () => {
    const orders = await getOrders();
    setOrders(orders);
    setLoading(false);
  })()
  });
  const doRefresh = async (event: any) => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
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
