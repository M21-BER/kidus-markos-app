import {
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import axios from "axios";
import { failMessage, jsonCheck, url } from "../../../utils/utils";
import Home_Skeleton from "../../Home/Home_Skeleton";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import OrderList from "./OrderList";
import OrderSkeleton from "./OrderSkeleton";
const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const controller: AbortController = new AbortController();
  const router = useIonRouter();
  const getOrders = async () => {
    try {
      const data = await axios(`${url}/api/products`, {
        signal: controller.signal,
      });
      return data.data;
    } catch (error: any) {
      if (error.name !== "CanceledError") {
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
    const data = await getOrders();
    setOrders(data);
    event.detail.complete();
  };

  if (error) {
    return (
      <IonPage>
        <ErrorFallBack error={error} />
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            <IonRefresherContent />
          </IonRefresher>
          <OrderSkeleton loading={loading} />
          <OrderList orders={orders} />
        </IonContent>
      </IonPage>
    );
  }
};

export default Shop;
