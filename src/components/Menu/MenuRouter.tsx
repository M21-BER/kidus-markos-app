import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Home from "../../pages/Home/Home";
import Settings from "../../pages/Settings/Settings";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ShopDetails from "../../pages/Shop/ShopDetails";
import OrderDetails from "../../pages/Order/OrderDetails";

const MenuRouter:React.FC = ()=>{
  return(
    <IonRouterOutlet id="main">
        <Route path="/app/settings" component={Settings} exact/>
        <Route path="/app/login" component={Login} exact/>
        <Route path="/app/register" component={Register} exact/>
        {/* ....Redirect.... */}
        <Route path="/app" exact><Redirect to="/app/home"/></Route>
        <Route path="/login" exact><Redirect to="/app/login"/></Route>
        <Route path="/register" exact><Redirect to="/app/register"/></Route>
        <Route path="/s_details/:id" exact><Redirect to="/app/shops/details/:id"/></Route>
        <Route path="/o_details/:id" exact><Redirect to="/app/orders/details/:id"/></Route>
        {/* ....Last.... */}
        <Route path="/app/home" component={Home} />
        <Route path="/app/shops/details/:id" component={ShopDetails} />
        <Route path="/app/orders/details/:id" component={OrderDetails} />
    </IonRouterOutlet>
  )
}

export default MenuRouter;