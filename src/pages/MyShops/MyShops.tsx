import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonChip,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
    IonSkeletonText,
    useIonAlert,
    useIonToast,
    useIonViewWillEnter,
  } from "@ionic/react";
  import React, { useContext, useState } from "react";
  import { ToolBarMain } from "../../components/ToolBar/ToolBar";
  import { Preferences } from "@capacitor/preferences";
  import MyShopsList from "./MyShopsList";
  import "./Carts.css";
  import { UserContext } from "../../context/AuthContext";
  import { Toast } from "../../utils/CustomToast";
  const MyShops: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [shops, setShops] = useState<any[]>([]);
    const { refresh } = useContext(UserContext);
    const [presentAlert] = useIonAlert();
    const [presentIonToast] = useIonToast();
    useIonViewWillEnter(async () => {
      const shop = await getShops();
      setShops(shop);
      setLoading(false);
    });
  
    useIonViewWillEnter(async () => {
      refresh!();
    });
  
    const getShops = async () => {
    //   const shopE = await Preferences.get({ key: CART_KEY });
    //   if (cartE.value) {
    //     const parse: number[] = jsonCheck(cartE.value);
    //     return parse;
    //   }
      return [];
    };
    return (
      <IonPage>
        <ToolBarMain title="Ordered Products"/>
        <IonContent>
          {loading &&
            [...Array(10)].map((_, index) => (
              <IonCard key={index}>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonSkeletonText />
                    </IonAvatar>
                    <IonLabel>
                      <IonSkeletonText animated style={{ width: "150px" }} />
                      <p>
                        <IonSkeletonText />
                      </p>
                    </IonLabel>
                    <IonChip slot="end" style={{ width: "45px" }} color={"primary"}></IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
  
          <MyShopsList shops={shops} />
        </IonContent>
      </IonPage>
    );
  };
  
  export default MyShops;
  
  