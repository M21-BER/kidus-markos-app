import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';

const Settings: React.FC = () => {

  return (
    <IonPage>
       <ToolBarMain/>
      <IonContent className="ion-padding">
        UI goes here...
      </IonContent>
    </IonPage>
  );
};

export default Settings;