import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Home from "../../pages/Home/Home";
import Settings from "../../pages/Settings/Settings";

const MenuRouter:React.FC = ()=>{
  return(
    <IonRouterOutlet id="main">
        <Route path="/app/home" component={Home} />
        <Route path="/app/settings" component={Settings} exact/>
        <Route path="/app" exact><Redirect to="/app/home"/></Route>
    </IonRouterOutlet>
  )
}

export default MenuRouter;