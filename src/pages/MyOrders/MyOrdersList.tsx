import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import React, { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
interface Props {
  orders: any[];
}
const MyOrdersList: React.FC<Props> = ({ orders }) => {
  const { refresh } = useContext(UserContext);
  useIonViewWillEnter(() => {
    refresh!();
  });
  if (orders.length === 0) {
    return (
      <div className="ion-text-center NDA">
        <IonText color="medium">No available product order</IonText>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <IonButton color="primary" expand="block" className="ion-text-center">
            Batch Shop
          </IonButton>
        </div>
        {orders.map((order, index) => (
          <IonCard key={index} onClick={() => {}}>
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonIcon icon={cartOutline} />
                </IonAvatar>
                <IonLabel>
                  {order.name}
                  <p>{order.mode}</p>
                </IonLabel>
                <IonChip slot="end" color={"primary"}>
                  {order.price}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </>
    );
  }
};

export default MyOrdersList;
