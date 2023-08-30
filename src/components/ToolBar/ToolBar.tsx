import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonButton, IonIcon, IonSearchbar,} from "@ionic/react"
import { trashBinOutline } from "ionicons/icons";
interface Props{
  title?:string;
}
export const ToolBarMain:React.FC<Props> = ({title})=> {
  return (
    <IonHeader>
      <IonToolbar color="primary">
       <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={()=>{}}>
            <IonIcon
              slot="icon-only"
              icon={trashBinOutline}
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
          <IonBackButton  defaultHref="/app">
          </IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

  )
}







  
  





