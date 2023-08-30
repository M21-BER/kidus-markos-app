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
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import React, {useState } from "react";
import axios from "axios";
import { jsonCheck, url } from "../../utils/utils";
import Home_Skeleton from "../Home/Home_Skeleton";
import "../Home/Home.css";
import "../Home/HomeDetail.css";
const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<any[]>([]);
  const controller: AbortController = new AbortController();
  const router = useIonRouter();
  const getShops = async () => {
    try {
      const data = await axios(`${url}/api/shops`, {
        signal: controller.signal,
      });
      return data.data;
    } catch (error: any) {
      if (error.name !== "CanceledError") {
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
        {shops.map((shop, index) => (
          <IonCard
          color='warning'
            key={index}
            onClick={() => {
             router.push(`/app/home/shops/details/${shop.s_product_id}`)
            }}
          >  
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none" color='warning'>
                <IonImg
                  src={`${url}${jsonCheck(shop.s_product_images)[0].url}`}
                  className="ion-image ion-margin-top"
                  alt="hello"
                />
              </IonItem>
              <IonItem
              color='warning'
                lines="none"
                className="ion-margin-top ion-margin-bottom"
              >
                <IonLabel>
                  <IonLabel className="card-title">
                    {shop.s_product_name}
                  </IonLabel>
                  <p>{shop.s_product_category}</p>
                </IonLabel>
                <IonChip slot="end" color="primary">
                  {`${shop.s_product_price}.ETB`}
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
};

export default Shop;
