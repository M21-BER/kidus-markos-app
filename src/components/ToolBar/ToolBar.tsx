import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonSearchbar,} from "@ionic/react"
import { logOutOutline,logInOutline } from "ionicons/icons";
interface Props{
  title?:string;
}
export const ToolBarMain:React.FC<Props> = ({title})=> {
  const logged =  false;
  return (
    <IonHeader>
      <IonToolbar color="primary">
       <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={()=>{}}>
            <IonIcon
              slot="icon-only"
              icon={logged?logOutOutline:logInOutline}
              color={"light"}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonToolbar color="primary">
        <IonSearchbar />
      </IonToolbar>
    </IonHeader>

  )
}
export const ToolBarDetails:React.FC<Props> = ({title})=> {
  return (
    <IonHeader>
      <IonToolbar color="primary">
       <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton  defaultHref="/">
          </IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

  )
}







  
  





