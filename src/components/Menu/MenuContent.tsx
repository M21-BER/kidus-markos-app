import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonIcon, IonButton } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
interface Props{
 paths:{name:string,url:string,icon:string}[]; 
}
const MenuContent:React.FC<Props> = ({paths})=>{
  return(
    <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar color={'secondary'}>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {paths.map((item, index) => (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem detail={false} routerLink={item.url} routerDirection="none">
            <IonIcon slot="start" icon={item.icon} />
            {item.name}
          </IonItem>
        </IonMenuToggle>
      ))}

      <IonMenuToggle autoHide={false}>
        <IonButton expand="full" routerLink="/" routerDirection="root">
          <IonIcon slot="start" icon={logOutOutline} />
          Logout
        </IonButton>
      </IonMenuToggle>
    </IonContent>
  </IonMenu>
  )
}

export default MenuContent;