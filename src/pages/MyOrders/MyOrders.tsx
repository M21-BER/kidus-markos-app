import { IonAvatar, IonCard, IonCardContent, IonChip, IonContent, IonItem, IonLabel, IonPage, IonSkeletonText, useIonViewWillEnter } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import {failMessage, url } from '../../utils/utils';
import MyOrdersList from './MyOrdersList';
import './MyOrders.css'
import axios from 'axios';
const MyOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const controller: AbortController = new AbortController();

  useIonViewWillEnter(async () => {
    const cart = await getOrders();
    setOrders(cart);
    setLoading(false);
  });

  const getOrders = async () => {
    try {
      const data = await axios(`${url}/api/shops`, {
        signal: controller.signal,
      });
      setError(null);
      return data.data;
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          setError(error.response.data.error.message);
        } else {
          setError(failMessage);
        }
      }
    }
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