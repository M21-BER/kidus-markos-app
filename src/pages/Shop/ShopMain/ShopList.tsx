import {
  IonCard,
  IonCardContent,
  IonChip,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { url, jsonCheck } from "../../../utils/utils";
interface Props {
  shops: any[];
  navigate:any;
}
const ShopList: React.FC<Props> = ({ shops,navigate }) => {

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
              navigate("shopDetails",shop.s_product_id,null)
            }}
          >
            <IonCardContent className="ion-no-padding">
              <div className="ion-image-item">
                <IonImg
                  src={`${url}${jsonCheck(shop.s_product_images)[0].url}`}
                  className="ion-image ion-no-margin"
                  alt={jsonCheck(shop.s_product_images)[0].url}
                />
              </div>
              <IonItem
                color="warning"
                lines="none"
                className="home-card-padding">
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
