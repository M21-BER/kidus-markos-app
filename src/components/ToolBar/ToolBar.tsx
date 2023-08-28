import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonButton, IonIcon, IonSearchbar,} from "@ionic/react"
import { trashBinOutline } from "ionicons/icons";
interface Props{
  backButton:boolean;
  backHref?:string;
  title?:string;
}
const ToolBar:React.FC<Props> = ({backButton,backHref,title})=> {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
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
      {/* {
     backButton &&  <IonButtons slot='end'>
     <IonBackButton defaultHref={backHref}></IonBackButton>
    </IonButtons>
     } */}
      <IonToolbar color="primary">
        <IonSearchbar />
      </IonToolbar>
    </IonHeader>

  )
}

export default ToolBar









  
  





