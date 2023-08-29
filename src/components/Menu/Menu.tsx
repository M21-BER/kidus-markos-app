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







// import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonSplitPane, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
// import React from 'react';
// import { gift, home, peopleCircle, person, search, settingsSharp } from 'ionicons/icons';
// import MenuContent from './MenuContent';
// import MenuRouter from './MenuRouter';
// import { Route } from 'react-router';
// import Tab1 from '../../pages/Settings/Tab1';
// import './Menu.css'
// const Menu: React.FC = () => {
//   const paths:{name:string,url:string,icon:string}[] = [
//     { name: 'Home', url: '/app/home', icon: home },
//     { name: 'Settings', url: '/app/settings', icon: settingsSharp },
//   ];
//   return (
//     <IonPage>
//     <IonTabs>
//      <IonTabBar slot="bottom">
//     <IonTabButton tab="home" layout="icon-top">
//       <IonIcon icon={search}></IonIcon>
//       <IonLabel>Explore</IonLabel>
//     </IonTabButton>
//     <IonTabButton tab="wishlists"  layout="icon-top">
//       <IonIcon icon={gift}></IonIcon>
//       <IonLabel>Wishlists</IonLabel>
//     </IonTabButton>
//     <IonTabButton tab="groups"  layout="icon-top">
//       <IonIcon icon={peopleCircle}></IonIcon>
//       <IonLabel>Groups</IonLabel>
//     </IonTabButton>
//     <IonTabButton tab="account"  layout="icon-top">
//       <IonIcon icon={person}></IonIcon>
//       <IonLabel>person</IonLabel>
//     </IonTabButton>
//   </IonTabBar>
//      <IonRouterOutlet>
//         <Route path="/app/settings/tab1" component={Tab1} />
//         <Route path="/app/settings/tab2" component={Tab1} />
//       </IonRouterOutlet>
//    </IonTabs>
//     </IonPage>
//   );
// };

// export default Menu;