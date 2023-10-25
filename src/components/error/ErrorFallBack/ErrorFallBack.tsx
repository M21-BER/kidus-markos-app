import {earthOutline, sadOutline } from "ionicons/icons";
import "./ErrorFallBack.css";
import { IonButton, IonContent, IonIcon } from '@ionic/react';

interface Props {
  error:any;
  reload:()=>void;
  className?:string;
}
const ErrorFallBack: React.FC<Props> = ({error,reload,className =""}) => {
  
  return (
      <IonContent className="ion-padding">
      <div className={`ErrorFallBack ${className}`}>
        <h1><span>{error === "ERR_NETWORK"?<IonIcon icon={earthOutline}/>:<IonIcon icon={sadOutline}/>}</span><span>Opps..</span></h1>
        <p>{error === "ERR_NETWORK"?"There was an error connecting. please check your internet connection and try again.":"We were unable to retrieve the data you requested. Please try again later."}</p>
        <IonButton onClick={reload}>
          Reload
        </IonButton>
      </div>
      </IonContent>
  );
};

export default ErrorFallBack;