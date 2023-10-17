import {
  IonCard,
  IonCardContent,
  IonChip,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { url, jsonCheck } from "../../../utils/utils";

interface Props {
  orders: any[];
  navigate:any;
}
const OrderList: React.FC<Props> = ({ orders,navigate }) => {
  if (orders.length === 0) {
    return (
      <div className="ion-text-center NDA">
        <IonText color="medium">No Order Product Available</IonText>
      </div>
    );
  } else {
    return (
      <>
        {orders.map((order, index) => (
          <IonCard
          className="home-card"
            color="warning"
            key={index}
            onClick={() => {
              navigate("orderDetails",order.product_id,null)
            }}
          >
            <IonCardContent className="ion-no-padding">
            <div className="ion-image-item">
                <IonImg
                  src={`${url}${jsonCheck(order.product_images)[0].url}`}
                  className="ion-image ion-no-margin"
                  alt="hello"
                />
              </div>
              <IonItem
                color="warning"
                lines="none"
                className="home-card-padding"
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
      </>
    );
  }
};

export default OrderList;
