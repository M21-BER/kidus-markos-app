import {IonPage, IonSplitPane} from '@ionic/react';
import React from 'react';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import MenuContent from './MenuContent';
import MenuRouter from './MenuRouter';

const Menu: React.FC = () => {
  const paths:{name:string,url:string,icon:string}[] = [
    { name: 'Home', url: '/app/home', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: newspaperOutline },
  ];
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <MenuContent paths={paths}/>
        <MenuRouter/>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;