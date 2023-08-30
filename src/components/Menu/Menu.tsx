import {IonIcon, IonLabel, IonPage, IonRouterOutlet,IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import React from 'react';
import {calendarOutline, cartSharp, homeSharp, settingsSharp } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import './Menu.css'
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import OrderDetails from '../../pages/Order/OrderDetails';
import Register from '../../pages/Register/Register';
import Settings from '../../pages/Settings/Settings';
import ShopDetails from '../../pages/Shop/ShopDetails';
import Payment from '../../pages/Shop/Payment';
import AddOrder from '../../pages/Order/AddOrder';

const Menu: React.FC = () => {
  const paths:{name:string,url:string,icon:string}[] = [
    { name: 'Home', url: '/app/home', icon: homeSharp },
    { name: 'Cart', url: '/app/settings', icon: cartSharp },
    { name: 'Order', url: '/app/settings', icon: calendarOutline },
    { name: 'Settings', url: '/app/settings', icon: settingsSharp },
  ];
  return (
    <IonPage>
      <IonTabs>
        <IonTabBar slot="bottom" color='warning'>
          {
            paths.map((item,index)=>{
              return (
                <IonTabButton key={index} tab={item.name} href={item.url} layout="icon-top">
                  <IonIcon icon={item.icon} size='small'></IonIcon>
                  <IonLabel>{item.name}</IonLabel>
               </IonTabButton>
              )
            })
          } 
        </IonTabBar>
        <IonRouterOutlet>
            <Route path="/app/settings" component={Settings} exact/>
            <Route path="/app/login" component={Login} exact/>
            <Route path="/app/register" component={Register} exact/>
            {/* ....Redirect.... */}
            <Route path="/app" exact><Redirect to="/app/home"/></Route>
            <Route path="/login" exact><Redirect to="/app/login"/></Route>
            <Route path="/register" exact><Redirect to="/app/register"/></Route>
            {/* ....Last.... */}
            <Route   path="/app/home" component={Home} />
            <Route  exact path="/app/home/shop/details/payment" component={Payment} />
            <Route  exact path="/app/home/shops/details/:id" component={ShopDetails} />
            <Route  exact path="/app/home/orders/addOrder/:id" component={AddOrder} />
            <Route  exact path="/app/home/orders/details/:id" component={OrderDetails} />
        </IonRouterOutlet>
      </IonTabs>
    </IonPage>
  );
};

export default Menu;