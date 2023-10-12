import { Redirect, Route, Router } from "react-router-dom";
import { IonApp, IonButton, IonContent, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/shared.css";

/* Pages, Screens & Components */
import Drawer from "./components/UI/Drawer/Drawer";
import { Preferences } from "@capacitor/preferences";
import React, { useContext, useEffect, useState } from "react";
import Intro from "./components/Intro/Intro";
import {INTRO_KEY } from './utils/utils'
import { UserContext } from "./context/AuthContext";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Tasks from "./pages/Tasks/Tasks";
import MyShops from "./pages/MyShops/MyShops";
import Home from "./pages/Home/Home";
import { homeSharp, cartSharp, calendarOutline, personCircleSharp } from "ionicons/icons";
import Carts from "./pages/Carts/Carts";
import MyOrders from "./pages/MyOrders/MyOrders";
import AddOrder from "./pages/Order/AddOrder/AddOrder";
import OrderDetails from "./pages/Order/OrderDetails";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ShopDetails from "./pages/Shop/ShopDetails/ShopDetails";
import Payment from "./pages/Shop/payment/Payment";
import ViewTask from "./pages/Tasks/ViewTask";
setupIonicReact();

const App: React.FC = () => {
const {isAuthed,route, navigate} = useContext(UserContext)
const [introSeen, setIntroSeen] = useState<boolean>(true);

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);
  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };
  const changeScreen = (screen:string)=>{
    // routes?(path,screen)
    navigate!(screen,null,null)
  }
  const activities = ()=>{
  switch(route?.path){
   case  "Home":
    return(
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home}/>
          </IonRouterOutlet> 
      </IonReactRouter>
    )
   case  "Shop":
    return isAuthed?<MyShops/>:<Login/>
   case  "Task":
    return isAuthed?<MyShops/>:<Login/>
   case  "Account":
    return isAuthed?<MyShops/>:<Login/>
   case  "shopDetails":
    return <ShopDetails/>
   case  "payment":
    return <Payment/>
   case  "orderDetails":
    return <OrderDetails/>
   case  "addOrder":
    return <AddOrder/>  
  } 
  }
  return (
    <IonApp>
        {!introSeen ? (
           <IonPage>
           <IonContent>
           <Intro onFinish={finishIntro}/> 
           </IonContent>
           </IonPage> 
        ) : (
        <>
       {activities()}
       <Drawer changeScreen={changeScreen} route={route?.path}/>
       </>
        )
      }
    </IonApp>
  );
};

export default App;


