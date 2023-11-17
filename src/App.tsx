import { Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Drawer from "./components/UI/Drawer/Drawer";
import { Preferences } from "@capacitor/preferences";
import React, { useContext, useEffect, useState } from "react";
import Intro from "./components/Intro/Intro";
import { INTRO_KEY, url } from "./utils/utils";
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
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
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
import { StatusBar } from '@capacitor/status-bar';
import axios from "axios";
import { Device } from "@capacitor/device";
import { errorResponse } from "./utils/errorResponse";
import { logout } from "./utils/logout";
/* Pages, Screens & Components */
setupIonicReact();

const App: React.FC = () => {
  const {user, isAuthed, route, navigate, screenStack, pullStack,updateSavedData,refresh } =
    useContext(UserContext);
  const [introSeen, setIntroSeen] = useState<boolean>(true);
  const [showBackAlert, setShowBackAlert] = useState<boolean>(false);
  const nullEntry: any[] = [];
  const [notifications, setnotifications] = useState(nullEntry);
  const registerToken = async(token:any)=>{
    if(token){
      try {
        const findTokens:any = await axios.get(`${url}/api/firebase-token`);
        const info: any = await Device.getId();
        const platform: any = await Device.getInfo();
        const filterDevice = findTokens.data.map((dev:any)=>{
         return dev.deviceId;
        })
        const filterToken = findTokens.data.map((dev:any)=>{
         return dev.token;
        })
    
        if(!filterDevice.includes(info.identifier) && !filterToken.includes(token)){
          await axios.post(`${url}/api/firebase-token`,{
            token:token,
            deviceId:info && info.identifier?info.identifier:'Not Provided',
            platform:platform && platform.operatingSystem?platform.operatingSystem:'UNKNOWN'
          }); 
        }
      } catch (error) {
      }
    }
  } 
  const register = () => {
    PushNotifications.register();
    PushNotifications.addListener("registration", (token: Token) => {
      registerToken(token.value);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {
        setnotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: "foreground",
          },
        ]);
      }
    );
    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {
        setnotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: "action",
          },
        ]);
      }
    );
  };
  StatusBar.setOverlaysWebView({ overlay: true });
  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();  
  }, []);
  useEffect(() => {
    const updateUserData = async () => {
     try {
      const update = await axios.get(`${url}/api/clients/app/${user.client_id}`,{headers:{Authorization:user.token}});
      const {first_name,last_name,email,phone_number} = update.data.item
      const passedData = {
        ...user,
        first_name,
        last_name,
        email,
        phone_number,
      };
      updateSavedData!(passedData);
     } catch (error) {
     const {message,status} = errorResponse(error);
     if(message && status){
       if(status === 404 && message === "Client not available"){
        await logout();
        refresh!();
       }
     }
     }
    };
    if(user){
      updateUserData();
    }
  }, []);
  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            // Toast(presentIonToast,"Push Notification permission denied",informationCircleOutline)
          } else {
            // Toast(presentIonToast,"Push Notification permission granted",checkmarkCircleOutline)
            register();
          }
        });
      } else {
        register();
      }
    });
  }, []);
  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };
  const changeScreen = (screen: string) => {
    navigate!(screen, null, null);
  };
  const activities = () => {
    switch (route?.path) {
      case "Home":
           return (
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/" component={Home} />
            </IonRouterOutlet>
          </IonReactRouter>
        );
      case "shopDetails":
        return <ShopDetails />;
      case "payment":
        return isAuthed ? <Payment /> : <Login />;
      case "orderDetails":
        return <OrderDetails />;
      case "addOrder":
        return isAuthed ? <AddOrder /> : <Login />;
      case "MyShop":
        return isAuthed ? <MyShops /> : <Login />;
      case "Task":
        return isAuthed ? <Tasks /> : <Login />;
      case "task_view":
        return isAuthed ? <ViewTask /> : <Login />;
      case "Account":
        return isAuthed ? <Account /> : <Login />;
      case "Carts":
        return isAuthed ? <Carts /> : <Login />;
      case "Login":
        return <Login />;
      case "Register":
        return <Register />;
      case "ResetPassword":
        return <ResetPassword />;
    }
  };

  function ExitAlert() {
    return (
      <IonAlert
        isOpen={showBackAlert}
        header={"Please Confirm!"}
        message={"Do you really want to exit our App?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
            },
          },
          {
            text: "Exit",
            handler: () => {
              Intent.exitApp();
            },
          },
        ]}
        onDidDismiss={() => setShowBackAlert(false)}
        className="my-custom-class"
      />
    );
  }
  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      if (screenStack?.length !== 0) {
        if (screenStack![screenStack!.length - 1]?.path === "Home") {
          setShowBackAlert(true);
        } else {
          let tempo = screenStack![screenStack!.length - 2];
          pullStack!(screenStack!.length - 1);
          navigate!(tempo?.path, tempo?.id, tempo?.info);
        }
      };
    });
  });
  return (
    <IonApp>
      {!introSeen ? (
        <IonPage>
          <IonContent>
            <Intro onFinish={finishIntro} />
          </IonContent>
        </IonPage>
      ) : (
        <>
          <ExitAlert />
          {activities()}
          <Drawer changeScreen={changeScreen} route={route?.path} />
        </>
      )}
    </IonApp>
  );
};

export default App;
