import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import ShopList from "./ShopList";
import ShopSkeleton from "./ShopSkeleton";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const controller: AbortController = new AbortController();
  const getShops = async () => {
    try {
      const data = await axios(`${url}/api/shops`, {
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
    const shops = await getShops();
    setShops(shops);
    setLoading(false);
  });

  const doRefresh = async (event: any) => {
    const data = await getShops();
    setShops(data);
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
          <ShopSkeleton loading={loading} />
          <ShopList shops={shops} />
        </IonContent>
      </IonPage>
    );
  }
};

export default Shop;
