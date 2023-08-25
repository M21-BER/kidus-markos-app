import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabs, IonContent } from "@ionic/react"
import { cartOutline,bagAddOutline } from "ionicons/icons"
import { Route, Redirect } from "react-router"
import Order from "../Order/Order"
import Shop from "../Shop/Shop"

const ShopTab:React.FC = ()=>{
    return (
      <IonContent>
      <IonTabs>
       <IonTabBar slot="top">
          <IonTabButton tab="tab1" href="/app/home/shop">
            <IonIcon icon={cartOutline} />
            <IonLabel>Shop</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/app/home/order">
            <IonIcon icon={bagAddOutline} />
            <IonLabel>Order</IonLabel>
          </IonTabButton>
        </IonTabBar>

      <IonRouterOutlet>
        <Route path="/app/home/shop" component={Shop} exact/>
        <Route path="/app/home/order" component={Order} exact/>
        <Route exact path="/app/home"><Redirect to="/app/home/shop"/></Route>
      </IonRouterOutlet>
      </IonTabs>
      </IonContent> 
    )
 }
 export default ShopTab