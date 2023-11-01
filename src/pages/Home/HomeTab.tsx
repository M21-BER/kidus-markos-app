import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonContent,
} from "@ionic/react";
import { cartOutline, bagAddOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Order from "../Order/OrderMain/Order";
import Shop from "../Shop/ShopMain/Shop";
interface Props{
  spacer:string;
  updateEventNow:()=>void;
}
const ShopTab: React.FC<Props> = ({spacer,updateEventNow}) => {
  return (
    <IonContent>
      <IonTabs>
        <IonTabBar slot="top">
          <IonTabButton tab="Shop" href="/shop">
            <IonIcon icon={cartOutline} />
            <IonLabel>Shop</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Order" href="/order">
            <IonIcon icon={bagAddOutline} />
            <IonLabel>Order</IonLabel>
          </IonTabButton>
        </IonTabBar>

        <IonRouterOutlet>
          <Route path="/shop" render={()=><Shop spacer={spacer} updateEventNow={updateEventNow}/>} exact />
          <Route path="/order" render={()=><Order spacer={spacer} updateEventNow={updateEventNow}/>} exact />
          <Route exact path="/">
            <Redirect to="/shop" />
          </Route>
        </IonRouterOutlet>
      </IonTabs>
    </IonContent>
  );
};
export default ShopTab;
