import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useContext } from "react";
import {
  calendarOutline,
  cartSharp,
  homeSharp,
  personCircleSharp,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import "./Menu.css";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import OrderDetails from "../../pages/Order/OrderDetails";
import Register from "../../pages/Register/Register";
import ShopDetails from "../../pages/Shop/ShopDetails/ShopDetails";
import Payment from "../../pages/Shop/payment/Payment";
import AddOrder from "../../pages/Order/AddOrder/AddOrder";
import Account from "../../pages/Account/Account";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { UserContext } from "../../context/AuthContext";
import Carts from "../../pages/Carts/Carts";
import MyOrders from "../../pages/MyOrders/MyOrders";
import Tasks from "../../pages/Tasks/Tasks";

const Menu: React.FC = () => {
  const { isAuthed,wait } = useContext(UserContext);
  const paths: { name: string; url: string; icon: string }[] = [
    { name: "Home", url: "/app/home", icon: homeSharp },
    { name: "Cart", url: "/app/carts", icon: cartSharp },
    { name: "Task", url: "/app/tasks", icon: calendarOutline },
    { name: "Account", url: "/app/account", icon: personCircleSharp },
  ];
  return (
    <IonPage>
      <IonTabs>
        <IonTabBar className="bottom-tab-km" slot="bottom" color="warning">
          {paths.map((item, index) => {
            return (
              <IonTabButton
                key={index}
                tab={item.name}
                href={item.url}
                layout="icon-top"
              >
                <IonIcon icon={item.icon} size="small"></IonIcon>
                <IonLabel>{item.name}</IonLabel>
              </IonTabButton>
            );
          })}
        </IonTabBar>
        <IonRouterOutlet>
          {/* ....Redirect Start.... */}
          <Redirect exact path="/" to="/app/home" />
          <Redirect exact path="/login" to="/app/login" />
          <Redirect exact path="/register" to="/app/register" />
          <Redirect exact path="/reset" to="/app/reset" />
          <Redirect exact path="/account" to="/app/account" />
          <Redirect exact path="/carts" to="/app/carts" />
          <Redirect exact path="/tasks" to="/app/tasks" />
          <Redirect exact path="/myOrders" to="/app/myOrders" />
          {/* ....Redirect End.... */}

          <Route path="/app/home" component={Home} />
          <Route
            path="/app/account"
            render={(props) => {
              return !wait && isAuthed ? <Account {...props} /> : <Login />;
            }}
            exact
          />
          <Route path="/app/carts" render={() => <Carts />} exact />
          <Route path="/app/tasks" render={() => <Tasks />} exact />
          <Route path="/app/myOrders" render={() => <MyOrders />} exact />
          <Route path="/app/login" render={() => <Login />} exact />
          <Route path="/app/register" render={() => <Register />} exact />
          <Route path="/app/reset" render={() => <ResetPassword />} exact />
          <Route
            path="/payment"
            render={(props) => {
              return !wait && isAuthed ? <Payment /> : <Login />;
            }}
            exact={true}
          />
          <Route
            path="/shopDetails/:id"
            render={() => <ShopDetails />}
            exact={true}
          />
          <Route
            path="/orderDetails/:id"
            render={() => <OrderDetails />}
            exact={true}
          />
          <Route
            path="/addOrder/:id"
            render={() => <AddOrder />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonTabs>
    </IonPage>
  );
};

export default Menu;
