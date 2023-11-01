import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { Preferences } from "@capacitor/preferences";
import { CART_KEY, jsonCheck } from "../../utils/utils";
import CartsList from "./CartsList";
import "./Carts.css";
import { UserContext } from "../../context/AuthContext";
import {checkmarkCircleOutline, closeCircleOutline, informationCircleOutline } from "ionicons/icons";
import { Toast } from "../../utils/CustomToast";
const Carts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState<any[]>([]);
  const {isAuthed ,navigate,pushStack,route} = useContext(UserContext);
  const [presentAlert] = useIonAlert();
  const [presentIonToast] = useIonToast();
  const getCarts = async () => {
    const cartE = await Preferences.get({ key: CART_KEY });
    if (cartE.value) {
      const parse: number[] = jsonCheck(cartE.value);
      return parse;
    }
    return [];
  };
  useEffect(()=>{
    pushStack!({path:'Carts',id:route?.id,info:route?.info});
  },[]);
  useEffect(()=>{ 
    !isAuthed && navigate!("Login",null,null);
  },[]);
  useEffect(()=>{ 
    (async()=>{
      const cart = await getCarts();
    setCarts(cart);
    setLoading(false);
    })()
  },[]);

  const clearCarts = async () => {
    presentAlert({
      header: "Clear Cart",
      message: "Are you sure you want to clear cart?",
      backdropDismiss: false,
      keyboardClose: true,
      animated: true,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
               try {
                 await Preferences.remove({ key: CART_KEY });
                 setCarts([]);
                 setLoading(false);
                Toast(
                  presentIonToast,
                  "Cart Cleared Successfully",
                  checkmarkCircleOutline
                );
               } catch (error) {
                Toast(
                  presentIonToast,
                  "Clearing Cart failed, please try again later!",
                  informationCircleOutline
                );
               }
          },
        },
      ],
    });
  };
  const doRefresh = async (event: any) => {
    setLoading(true);
    const data = await getCarts();
    setCarts(data);
    setLoading(false);
    event.detail.complete();
  };
  const shopNow = (id:any)=>{
    navigate!("shopDetails",id,"Carts")
  }
  return (
    <IonPage>
      <ToolBarMain title="My Carts"/>
      <IonCard className="ion-no-margin">
              <IonCardContent>
              <div className='km-btns'>
               <IonButton disabled={carts.length === 0?true:false} onClick={clearCarts} color='primary' className='ion-text-center'><IonIcon slot="start" icon={closeCircleOutline}/> Clear</IonButton>
             </div>
              </IonCardContent>
            </IonCard>
      <IonContent>
        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" style={{ width: "45px" }} color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher> 
        <CartsList shopNow={shopNow} carts={carts} />
      </IonContent>
    </IonPage>
  );
};

export default Carts;

