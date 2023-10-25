import {
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
  const Home_Skeleton: React.FC<Props> = ({ index }) => {
    return (
      <IonCard key={index}  className="home-card">
              <IonCardContent className="ion-no-padding">
              <div className="ion-image-item">
                <IonSkeletonText className="ion-no-margin" animated style={{ width: "100%",height: "100%" }} />
              </div>
   
          <IonItem lines="none" className="ion-margin-top ion-margin-bottom">
            <IonLabel>
              <IonLabel className="card-title">
                <IonSkeletonText animated style={{ width: "150px"}} />
              </IonLabel>
              <p>
                <IonSkeletonText />
              </p>
            </IonLabel>
            <IonChip style={{ width: "60px"}}  slot="end" color={"primary"}></IonChip>
          </IonItem>
        </IonCardContent>
      </IonCard>
    );
  };
  
  export default Home_Skeleton;
  