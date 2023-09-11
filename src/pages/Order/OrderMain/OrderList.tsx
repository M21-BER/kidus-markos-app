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
}
const OrderList: React.FC<Props> = ({ orders }) => {
  const router = useIonRouter();

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
            color="warning"
            key={index}
            onClick={() => {
              router.push(`/orderDetails/${order.product_id}`);
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
      </>
    );
  }
};

export default OrderList;
