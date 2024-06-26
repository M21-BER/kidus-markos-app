import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonLoading,
  IonSearchbar,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import React, {useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import ShopList from "./ShopList";
import ShopSkeleton from "./ShopSkeleton";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import { UserContext } from "../../../context/AuthContext";
import { errorResponse } from "../../../utils/errorResponse";

interface Props{
 spacer:string 
 updateEventNow:()=>void
}

const Shop: React.FC<Props>= ({spacer,updateEventNow}) => {
  const [present, dismiss] = useIonLoading();
  const [shopsRes, setShopsRes] = useState<any[]>([]);
  const [shopsResBar, setShopsResBar] = useState<boolean>(false);
  const [shops, setShops] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const {navigate,loaded,fetchLoaded} = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(loaded.shops.loaded?false:true);
  const controller: AbortController = new AbortController();
  const searchValue = useRef<null | HTMLIonSearchbarElement>(null);
  let err = '';
  const getShops = async () => {
    try {
      const data = await axios(`${url}/api/shops`, {
        signal: controller.signal,
      });
      setError(null);
      return data.data;
    } catch (error: any) {
      setShops([]);
     if(error.code !== "ERR_NETWORK"){
      if (error.name !== "CanceledError") {
        const {message,status}= errorResponse(error)
        if (message && status) {
          err = message;
          setError(message);
        } else {
          err = failMessage;
          setError(failMessage);
        }
      }
    }else{
      err = error.code;
      setError(error.code);
    }
  }
  };
  useEffect(() => {
   const fetchShops = async () => {
    const shopsRes = await getShops();
    setShops(shopsRes?shopsRes:[]);
    if(shopsRes && shopsRes.length !== 0){
      fetchLoaded!('shops',{loaded:true,data:shopsRes?shopsRes:[],error:err});
    }
    setLoading(false);

  }
  if(!loaded.shops.loaded){    
    fetchShops()
  }else{
    setShops(loaded.shops.data);
    if(loaded.shops.error){
    setError(loaded.shops.error);
    }
  }
  },[]);

  const doRefresh = async (event: any) => {
    setLoading(true);
    updateEventNow();
    const data = await getShops();
    setShops(data);
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
    updateEventNow();
    await present("Refreshing...");
    const data = await getShops();
    dismiss();
    setShops(data);
    setLoading(false);
  };

  const handleSearch = async(e: React.FormEvent) => {
  e.preventDefault();
  const searchInput = searchValue.current?.value;
  if(searchInput){
   try {
    await present("Searching...");
    const res = await axios.get(`${url}/api/shops/search/${searchInput}`);
    setShopsResBar(true);
    dismiss();
    if(res.data.items && res.data.items.length > 6){
      setShopsRes(res.data.items.slice(0,6));
    }else{
      setShopsRes(res.data.items);
    }
   } catch (error) {
    dismiss();
    setShopsRes([]);
    
   }
  }
  };
  const closeSearchBar = ()=>{
    setShopsResBar(false);
    setShopsRes([]);
  }
  const gotoDetailsFromSearchList = (id:any)=>{
    navigate!("shopDetails",id,null)
  }
  if(!loading){  
  if (error) {
    return (
      <IonPage>
        <ErrorFallBack error={error} reload={reload} />
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        {shopsResBar && (<div onClick={closeSearchBar} className="shopsResBar--backdrop"></div>)}
        <div  className="search-bar">
          <form onSubmit={handleSearch}>
            <IonSearchbar ref={searchValue}  />
            {
              shopsResBar &&  <div className={shopsRes.length > 0?"search-bar-result on":"search-bar-result on"}>
              {
                shopsRes.length > 0 ?shopsRes.map((_,i)=>{
                  return(
                    <li onClick={()=>{gotoDetailsFromSearchList(_.s_product_id)}} key={i}>{_.s_product_name}</li>
                  ) 
                }):<li style={{textAlign:'center'}}><IonText color='medium'>No product found</IonText></li>
              } 
            </div>
            }
           
          </form>
        </div>
        <IonContent className="_under_drawer">
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher>
          <ShopList shops={shops} navigate={navigate}/>
        </IonContent>
        <div className="spacer_drawer" style={{height:`${spacer}`}}></div>
      </IonPage>
    );
  }
}else{
  return (
    <IonPage>
      <div  className="search-bar">
        <form>
        <IonSkeletonText animated style={{ width: "100%",height:'100%'}} />
        </form>
      </div>
      <IonContent className="_under_drawer">
        <ShopSkeleton loading={loading} />
      </IonContent>
      <div className="spacer_drawer" style={{height:`${spacer}`}}></div>
    </IonPage>
  );
}
};

export default Shop;
