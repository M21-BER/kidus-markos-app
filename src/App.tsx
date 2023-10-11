import { Route } from "react-router-dom";
import { IonApp, IonContent, IonPage, IonRouterOutlet, setupIonicReact } from "@ionic/react";
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
import Menu from "./components/Menu/Menu";
import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import Intro from "./components/Intro/Intro";
import {INTRO_KEY } from './utils/utils'
setupIonicReact();

const App: React.FC = () => {

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
  return (
    <IonApp>
        {!introSeen ? (
           <IonPage>
           <IonContent>
           <Intro onFinish={finishIntro}/> 
           </IonContent>
           </IonPage> 
        ) : (
           <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/register" render={() => <Menu />} />
          <Route exact path="/reset" render={() => <Menu />} />
          <Route exact path="/login" render={() => <Menu />} />
          <Route exact path="/account" render={() => <Menu />} />
          <Route exact path="/settings" render={() => <Menu />} />
          <Route exact path="/shopDetails/:id" render={() => <Menu />} />
          <Route exact path="/orderDetails/:id" render={() => <Menu />} />
          <Route exact path="/addOrder/:id" render={() => <Menu />} />
          <Route exact path="/payment/:id" render={() => <Menu />} />
          <Route exact path="/myshops" render={() => <Menu />} />
          <Route exact path="/carts" render={() => <Menu />} />
          <Route exact path="/tasks" render={() => <Menu />} />
          <Route exact path="/task_view/:id" render={() => <Menu />} />
          <Route exact path="/myOrders" render={() => <Menu />} />
          <Route path="/" render={() => <Menu />} />
        </IonRouterOutlet>
      </IonReactRouter>
        )
      }
     
    </IonApp>
  );
};

export default App;


