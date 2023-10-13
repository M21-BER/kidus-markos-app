import { Route } from "react-router-dom";
import { IonAlert, IonApp, IonContent, IonPage, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import MyShops from "./pages/MyShopOrders/MyShops";
import Home from "./pages/Home/Home";
import Carts from "./pages/Carts/Carts";
import AddOrder from "./pages/Order/AddOrder/AddOrder";
import OrderDetails from "./pages/Order/OrderDetails";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ShopDetails from "./pages/Shop/ShopDetails/ShopDetails";
import Payment from "./pages/Shop/payment/Payment";
import ViewTask from "./pages/Tasks/ViewTask";
import { App as Intent } from "@capacitor/app";
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
setupIonicReact();

const App: React.FC = () => {
const {isAuthed,route, navigate,screenStack,pullStack} = useContext(UserContext)
const [introSeen, setIntroSeen] = useState<boolean>(true);
const [showBackAlert, setShowBackAlert] = useState<boolean>(false);
  
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
    );
   case  "shopDetails":
    return <ShopDetails/>;
   case  "payment":
    return <Payment/>;
   case  "orderDetails":
    return <OrderDetails/>;
   case  "addOrder":
    return <AddOrder/>; 
   case  "MyShop":
    return isAuthed?<MyShops/>:<Login/> 
   case  "Task":
    return isAuthed?<Tasks/>:<Login/>
   case  "task_view":
    return <ViewTask/>;   
   case  "Account":
    return isAuthed?<Account/>:<Login/>; 
   case  "Carts":
    return isAuthed?<Carts/>:<Login/>; 
   case  "Login":
    return <Login/>; 
   case  "Register":
    return <Register/>; 
   case  "ResetPassword":
    return <ResetPassword/>; 
  } 
  }
  
  function ExitAlert(){
    return (
      <IonAlert
      isOpen={showBackAlert}
      header={'Please Confirm!'}
      message={'Do you really want to exit our App?'}
      buttons={[
        {
          text: 'Exit',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Cancel',
          handler: () => {
            Intent.exitApp();
          }
        }
      ]}
      onDidDismiss={() => setShowBackAlert(false)}
      className='my-custom-class'
    />
    )
  }
   document.addEventListener('ionBackButton', (ev: any) => {
  ev.detail.register(-1, () => {
  if(screenStack?.length !== 0){
    if (screenStack![screenStack!.length-1]?.path === 'Home') {
      setShowBackAlert(true);
    }else{
     let tempo = screenStack![screenStack!.length-2] 
     pullStack!(screenStack!.length-1); 
     navigate!(tempo?.path,tempo?.id,tempo?.info); 
    } 
  }
  });
});
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
       <ExitAlert/> 
       {activities()}
       <Drawer changeScreen={changeScreen} route={route?.path}/>
       </>
        )
      }
    </IonApp>
  );
};

export default App;


