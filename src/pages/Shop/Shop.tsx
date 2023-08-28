import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "./Shop.css";
import axios from "axios";
import { url } from "../../utils/utils";
import Shop_Skeleton from "./Shop_Skeleton";
const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);
  const controller: AbortController = new AbortController();
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  const getProducts = async () => {
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
    const products = await getProducts();
    setProducts(products);
    setLoading(false);
  });
  // useIonViewWillLeave(() => {
  //   controller.abort();
  // });
  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setProducts([]);
            showToast({
              message: "All users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: any) => {
    const data = await getProducts();
    setProducts(data);
    event.detail.complete();
  };

  return (
    <IonPage ref={page}>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>
        {loading &&
          [...Array(10)].map((_, index) => (
            <Shop_Skeleton key={index} index={index} />
          ))}
        {products.map((product, index) => (
          <IonCard
            key={index}
            onClick={() => {
              console.log("clicked");
            }}
          >
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonImg
                  src={`${url}${JSON.parse(product.s_product_images)[0].url}`}
                  className="ion-image ion-margin-top"
                  alt="hello"
                />
              </IonItem>
              <IonItem
                lines="none"
                className="ion-margin-top ion-margin-bottom"
              >
                <IonLabel>
                  <IonLabel className="card-title">
                    {product.s_product_name}
                  </IonLabel>
                  <p>{product.s_product_category}</p>
                </IonLabel>
                <IonChip slot="end" color={"primary"}>
                  {`${product.s_product_price}.ETB`}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>

      <IonModal
        ref={cardModal}
        trigger="card-modal"
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar color={"success"}>
            <IonButtons slot="start">
              <IonButton onClick={() => cardModal.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>Card Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>My card modal</p>
        </IonContent>
      </IonModal>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="card-modal">
          <IonIcon icon={cartOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Shop;
