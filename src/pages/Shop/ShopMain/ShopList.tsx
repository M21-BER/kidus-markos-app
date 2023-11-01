import {
  IonCard,
  IonCardContent,
  IonChip,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {jsonCheck } from "../../../utils/utils";
import ImageComponent from "../../../components/UI/Image";
interface Props {
  shops: any[];
  navigate:any;
}
const ShopList: React.FC<Props> = ({ shops,navigate }) => {

  if (shops.length === 0) {
    return (
      <div className="ion-text-center NDA">
        <IonText color="medium">No shop product found</IonText>
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
              navigate("shopDetails",shop.s_product_id,"Home")
            }}
          >
            <IonCardContent className="ion-no-padding">
              <div className="ion-image-item">
                 <ImageComponent
                 src={`${jsonCheck(shop.s_product_images)[0].url}`}
                 hash={jsonCheck(shop.s_product_images)[0].hash}
                 label={shop.s_product_name}
                 className="ion-image ion-no-margin"
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
