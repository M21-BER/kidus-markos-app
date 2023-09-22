import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import OrderList from "./OrderList";
import OrderSkeleton from "./OrderSkeleton";
const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const controller: AbortController = new AbortController();
  const [present, dismiss] = useIonLoading();
  const getOrders = async () => {
    try {
      const data = await axios(`${url}/api/products`, {
        signal: controller.signal,
      });
      setError(null)
      return data.data;
    } catch (error: any) {
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
      }
    }
  };
  useIonViewWillEnter(async () => {
    const orders = await getOrders();
    setOrders(orders);
    setLoading(false);
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
          <OrderSkeleton loading={loading} />
          <OrderList orders={orders} />
        </IonContent>
      </IonPage>
    );
  }
};

export default Shop;
