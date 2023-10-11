import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonChip,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
    IonSkeletonText,
    useIonAlert,
    useIonToast,
    useIonViewWillEnter,
  } from "@ionic/react";
  import React, { useContext, useState } from "react";
  import { ToolBarMain } from "../../components/ToolBar/ToolBar";
  import { Preferences } from "@capacitor/preferences";
  import MyShopsList from "./MyShopsList";
  import "./MyShopsList";
  import { UserContext } from "../../context/AuthContext";
  import { Toast } from "../../utils/CustomToast";
import { failMessage, url } from "../../utils/utils";
import axios from "axios";
import { errorResponse } from "../../utils/errorResponse";
  const MyShops: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [shops, setShops] = useState<any>({data1:[],data2:[]});
    const [error, setError] = useState<any>(null);
    const { refresh } = useContext(UserContext);
    const controller: AbortController = new AbortController();
    const [presentAlert] = useIonAlert();
    const [presentIonToast] = useIonToast();
    const {user} = useContext(UserContext);
    useIonViewWillEnter(async () => {
      const shop:any = await getShops();
      setShops(shop);
      setLoading(false);
    });
  
    useIonViewWillEnter(async () => {
      refresh!();
    });
  
    const getShops = async () => {
      try {
        const data1 = await axios.get(`${url}/api/payment/client/:${user.client_id}`, {
          signal: controller.signal,
          headers:{
          Authorization:user.token
          }
        });   
        const data2 = await axios.get(`${url}/api/shops`, {signal: controller.signal});   
        setError(null);
        return {
          data1:data1.data.items,
          data2:data2.data
        };
      } catch (error: any) {        
        if (error.name !== "CanceledError") {
        setShops( {
          data1:[],
          data2:[]
        });
        const {message,status} = errorResponse(error); 
          if (message && status) {
            setError(message);
          } else {
            setError(failMessage);
          }
        }
      }
    };
    return (
      <IonPage>
        <ToolBarMain title="Ordered Products"/>
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
  
          <MyShopsList shops={shops} />
        </IonContent>
      </IonPage>
    );
  };
  
  export default MyShops;
  
  