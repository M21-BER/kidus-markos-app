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
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { Preferences } from "@capacitor/preferences";
import { CART_KEY, jsonCheck } from "../../utils/utils";
import CartsList from "./CartsList";
import "./Carts.css";
import { UserContext } from "../../context/AuthContext";
const Carts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState<any[]>([]);
  const { refresh } = useContext(UserContext);
  useIonViewWillEnter(async () => {
    const cart = await getCarts();
    setCarts(cart);
    setLoading(false);
  });

  useIonViewWillEnter(async () => {
    refresh!();
  });

  const getCarts = async () => {
    const cartE = await Preferences.get({ key: CART_KEY });
    if (cartE.value) {
      const parse: number[] = jsonCheck(cartE.value);
      return parse;
    }
    return [];
  };

  return (
    <IonPage>
      <ToolBarMain />
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
                  <IonChip slot="end" color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        <CartsList carts={carts} />
      </IonContent>
    </IonPage>
  );
};

export default Carts;
