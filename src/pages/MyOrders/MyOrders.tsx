import { IonAvatar, IonCard, IonCardContent, IonChip, IonContent, IonItem, IonLabel, IonPage, IonSkeletonText, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import { Preferences } from '@capacitor/preferences';
import { CART_KEY, jsonCheck } from '../../utils/utils';
import MyOrdersList from './MyOrdersList';
import './MyOrders.css'
import { UserContext } from '../../context/AuthContext';
const MyOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  // const data = useContext(UserContext);
  // console.log(data);
  useIonViewWillEnter(async () => {
    const cart = await getOrders();
    setOrders(cart);
    setLoading(false);
  });

  const getOrders = async () => {
      const cartE = await Preferences.get({ key: CART_KEY });
      if (cartE.value) {
        const parse: number[] = jsonCheck(cartE.value);
        return parse;
      }
     return [];
  };

  return (
    <IonPage>
       <ToolBarMain/>
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
                    <IonSkeletonText animated style={{ width: '150px' }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color={'primary'}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

       <MyOrdersList orders={orders}/>
      </IonContent>
    </IonPage>
  );
};

export default MyOrders;