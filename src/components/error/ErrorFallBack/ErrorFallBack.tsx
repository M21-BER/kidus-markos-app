import { globeOutline } from "ionicons/icons";
import "./ErrorFallBack.css";
import { IonButton, IonContent, IonIcon } from '@ionic/react';
interface Props {
  error:any
}
const ErrorFallBack: React.FC<Props> = ({error} ) => {
  return (
      <IonContent className="ion-padding">
      <div className="ErrorFallBack">
        <h1><span>Error!!</span><span><IonIcon icon={globeOutline}/></span></h1>
        <p>{error}</p>
        <IonButton className="mt-4" onClick={()=>{console.log("try")}}>
          Reload Page
        </IonButton>
      </div>
      </IonContent>
  );
};

export default ErrorFallBack;