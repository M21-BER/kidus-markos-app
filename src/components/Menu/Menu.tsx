import {IonIcon, IonLabel, IonPage, IonRouterOutlet,IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import React from 'react';
import {calendarOutline, cartSharp, homeSharp, personCircleSharp } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import './Menu.css'
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import OrderDetails from '../../pages/Order/OrderDetails';
import Register from '../../pages/Register/Register';
import Settings from '../../pages/Settings/Settings';
import ShopDetails from '../../pages/Shop/ShopDetails/ShopDetails';
import Payment from '../../pages/Shop/payment/Payment';
import AddOrder from '../../pages/Order/AddOrder';
import Account from '../../pages/Account/Account';

const Menu: React.FC = () => {
  const paths:{name:string,url:string,icon:string}[] = [
    { name: 'Home', url: '/app/home', icon: homeSharp },
    { name: 'Cart', url: '/app/settings', icon: cartSharp },
    { name: 'Order', url: '/app/settings', icon: calendarOutline },
    { name: 'Account', url: '/app/account', icon: personCircleSharp },
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
            {/* ....Redirect Start.... */}
            <Redirect exact path="/" to="/app/home"/>
            <Redirect exact path="/login" to="/app/login"/>
            <Redirect exact path="/register" to="/app/register"/>
            <Redirect exact path="/account" to="/app/account"/>
            <Redirect exact path="/settings" to="/app/settings"/>
            {/* ....Redirect End.... */}
            
            <Route path="/app/home" component={Home} />
            <Route path="/app/account" render={() => <Account />} exact/>
            <Route path="/app/settings" render={() => <Settings />} exact/>
            <Route path="/app/login" render={() => <Login />} exact/>
            <Route path="/app/register" render={() => <Register />} exact/>
            <Route path="/payment" render={() => <Payment />} exact={true}/>
            <Route path="/shopDetails/:id" render={() => <ShopDetails />} exact={true}/>
            <Route path="/orderDetails/:id" render={() => <OrderDetails />} exact={true}/>
            <Route path="/addOrder/:id" render={() => <AddOrder />} exact={true}/>
        </IonRouterOutlet>
      </IonTabs>
    </IonPage>
  );
};

export default Menu;