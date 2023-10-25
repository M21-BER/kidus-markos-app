import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonChip,
    IonContent,
    IonItem,
    IonLabel,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    useIonLoading,
  } from "@ionic/react";
  import React, { useContext, useEffect, useState } from "react";
  import { ToolBarMain } from "../../components/ToolBar/ToolBar";
  import MyShopsList from "./MyShopsList";
  import "./MyShopsList";
  import { UserContext } from "../../context/AuthContext";
import { failMessage, url } from "../../utils/utils";
import axios from "axios";
import { errorResponse } from "../../utils/errorResponse";
import ErrorFallBack from "../../components/error/ErrorFallBack/ErrorFallBack";
  const MyShops: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [shops, setShops] = useState<any>({data1:[],data2:[]});
    const [error, setError] = useState<any>(null);
    const [present, dismiss] = useIonLoading();
    const controller: AbortController = new AbortController();
    const {isAuthed,user,navigate,refresh,pushStack,route} = useContext(UserContext);
    useEffect(()=>{
      pushStack!({path:'MyShop',id:route?.id,info:route?.info});
    },[]);
    useEffect(()=>{
      (async () => {
        const shop:any = await getShops();
        setShops(shop);
        setLoading(false);
      })()
    },[]);
    useEffect(()=>{ 
      refresh!();
      !isAuthed && navigate!("Login",null,null);
    },[]);
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
        if(error.code !== "ERR_NETWORK"){     
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
      }else{
        setError(error.code);
      }
      }
    };
    const reload = async () => {
      setLoading(true);
      await present("Refreshing...");
      const data = await getShops();
      dismiss();
      setShops(data);
      setLoading(false);
    };
    const doRefresh = async (event: any) => {
      setLoading(true);
      const data = await getShops();
      setShops(data);
      setLoading(false);
      event.detail.complete();
    };
    if(!loading){
      if(error){
        return (
          <IonPage>
            <ToolBarMain title="Ordered Products"/>
            <IonContent>
            <ErrorFallBack error={error} reload={reload} />
            </IonContent>
            <div className="spacer_drawer"></div>
          </IonPage>
        );
      }else{
        return (
          <IonPage>
            <ToolBarMain title="Ordered Products"/>
            <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher>
              <MyShopsList shops={shops} navigate={navigate}/>
            </IonContent>
            <div className="spacer_drawer"></div>
          </IonPage>
        );
      }
    }else{
       return(
        <IonPage>
           <ToolBarMain title="Ordered Products"/>
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
        </IonPage>
       )
    }
  };
  
  export default MyShops;
  
  