import { Route } from "react-router-dom";
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
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

/* Pages, Screens & Components */
import Menu from "./components/Menu/Menu";
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Menu} />
          <Route exact path="/register" component={Menu}/>
          <Route exact path="/login" component={Menu}/>
          <Route exact path="/account" component={Menu}/>
          <Route exact path="/settings" component={Menu}/>
          <Route exact path="/shopDetails/:id" component={Menu}/>
          <Route exact path="/orderDetails/:id" component={Menu}/>
          <Route exact path="/addOrder/:id" component={Menu}/>
          <Route exact path="/payment" component={Menu}/>
        </IonRouterOutlet>
      </IonReactRouter>
  </IonApp>
);

export default App;
