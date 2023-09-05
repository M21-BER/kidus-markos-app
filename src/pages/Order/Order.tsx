import {
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonRouter,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import React, {useState } from "react";
import "../Home/Home.css";
import axios from "axios";
import { jsonCheck, url } from "../../utils/utils";
import Home_Skeleton from "../Home/Home_Skeleton";
import "../Home/HomeDetail.css";
import ErrorFallBack from "../../components/error/ErrorFallBack/ErrorFallBack";
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
        if(error.response){
          if(error.response.data){
             if(error.response.data.error){
                if(error.response.data.error.message){
                   setError(error.response.data.error.message)
              }
             }
          }
  
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

  if(error){
 return(
 <IonPage>
  <ErrorFallBack error={error}/>
</IonPage>
)
  }else{
    return (
      <IonPage>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            <IonRefresherContent />
          </IonRefresher>
          {loading &&
            [...Array(10)].map((_, index) => (
              <Home_Skeleton key={index} index={index} />
            ))}
          {orders.map((order, index) => (
            <IonCard
              color="warning"
              key={index}
              onClick={() => {
                router.push(`/orderDetails/${order.product_id}`)
               }}
            >
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none" color="warning">
                  <IonImg
                    src={`${url}${jsonCheck(order.product_images)[0].url}`}
                    className="ion-image ion-margin-top"
                    alt="hello"
                  />
                </IonItem>
                <IonItem
                  color="warning"
                  lines="none"
                  className="ion-margin-top ion-margin-bottom"
                >
                  <IonLabel>
                    <IonLabel className="card-title">
                      {order.product_name}
                    </IonLabel>
                    <p>{order.product_category}</p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}>
                    {order.product_code}
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="card-modal">
            <IonIcon icon={cartOutline} />
          </IonFabButton>
        </IonFab>
      </IonPage>
    );
  }
};

export default Shop;
