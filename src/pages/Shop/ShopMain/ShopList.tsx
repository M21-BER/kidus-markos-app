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
  shops: any[];
}
const ShopList: React.FC<Props> = ({ shops }) => {
  const router = useIonRouter();

  if (shops.length === 0) {
    return (
      <div className="ion-text-center NDA">
        <IonText color="medium">No Purchase Product Available</IonText>
      </div>
    );
  } else {
    return (
      <>
        {shops.map((shop, index) => (
          <IonCard
          className="home-card"
            color="warning"
            key={index}
            onClick={() => {
              router.push(`/shopDetails/${shop.s_product_id}`);
            }}
          >
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none" color="warning">
                <IonImg
                  src={`${url}${jsonCheck(shop.s_product_images)[0].url}`}
                  className="ion-image ion-margin-top"
                  alt={jsonCheck(shop.s_product_images)[0].url}
                />
              </IonItem>
              <IonItem
                color="warning"
                lines="none"
                className="ion-margin-top ion-margin-bottom">      
                 <IonLabel>
                 <IonLabel className="card-title">
                    {shop.s_product_name}
                  </IonLabel>
                 <small style={{color:"grey"}}>
                 {shop.s_product_category}
                 </small>
                 </IonLabel>
                <IonChip slot="end" color="primary">
                  {`${shop.s_product_price}.ETB`}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
      </>
    );
  }
};

export default ShopList;
