import {IonPage, IonSplitPane} from '@ionic/react';
import React from 'react';
import { home, settingsSharp } from 'ionicons/icons';
import MenuContent from './MenuContent';
import MenuRouter from './MenuRouter';

const Menu: React.FC = () => {
  const paths:{name:string,url:string,icon:string}[] = [
    { name: 'Home', url: '/app/home', icon: home },
    { name: 'Settings', url: '/app/settings', icon: settingsSharp },
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