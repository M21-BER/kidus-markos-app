import {IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import {trashBinOutline } from "ionicons/icons";

import HomeTab from "./HomeTab";

const Home:React.FC = ()=>{
  const clearList = ()=>{}
    return (
  <>
    <IonHeader>
      <IonToolbar color={'success'}>
        <IonButtons slot="start">
        <IonMenuButton />
        </IonButtons>
         <IonTitle>List</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={clearList}>
            <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

    <IonToolbar color={'success'}>
      <IonSearchbar />
    </IonToolbar>
    </IonHeader>
    <HomeTab/> 
  </>

    )
}
export default Home;