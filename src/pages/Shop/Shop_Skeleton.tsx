import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonChip,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from "@ionic/react";
import React from "react";
interface Props {
  index: number;
}
const Shop_Skeleton: React.FC<Props> = ({ index }) => {
  return (
    <IonCard key={index}>
      <IonCardContent className="ion-no-padding">
        <IonItem lines="none">
          <IonSkeletonText className="ion-image ion-margin-top" />
        </IonItem>
        <IonItem lines="none" className="ion-margin-top ion-margin-bottom">
          <IonLabel>
            <IonLabel className="card-title">
              <IonSkeletonText animated style={{ width: "150px" }} />
            </IonLabel>
            <p>
              <IonSkeletonText />
            </p>
          </IonLabel>
          <IonChip slot="end" color={"primary"}></IonChip>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Shop_Skeleton;
