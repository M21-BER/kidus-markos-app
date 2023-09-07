import { IonButton, IonContent, IonPage, useIonRouter,useIonLoading} from '@ionic/react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import './Account.css'
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';
import Loader from '../../components/UI/Loader/Loader';

const Account: any = () => {
   const [user,logged,isPending] = useUser();
   const router = useIonRouter();
   const [present, dismiss] = useIonLoading();
   useEffect(()=>{
    if(!isPending){
      if(!logged){
        router.push('/app/login','root','replace')
      }
   }
   },[isPending,logged])


   
   if(isPending){
      return (
       <Loader/>
      ) 
   }else{
    return (
      <IonPage>
          <ToolBarMain/>
          <IonContent className="ion-padding">
          <IonButton
    onClick={() => {
      present({
        message: 'Dismissing after 3 seconds...',
        duration: 3000,
      });
    }}
  >
    Show Loading
  </IonButton>
          </IonContent>
      </IonPage>
  );
   }
};

export default Account;