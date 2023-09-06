import { IonButton, IonContent, IonPage, useIonRouter,useIonLoading} from '@ionic/react';
import {useContext} from 'react';
import {UserContext} from '../../context/ContextProvider'
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import './Account.css'

const Account: any = () => {
   const {user} = useContext(UserContext)
   const router = useIonRouter();
   const [present, dismiss] = useIonLoading();
   if(!user!.logged){
    return router.push('/app/login','root')
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