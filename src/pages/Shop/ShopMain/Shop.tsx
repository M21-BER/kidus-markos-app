import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  useIonLoading,
  IonSearchbar,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import "../../Home/Home.css";
import "../../Home/HomeDetail.css";
import ShopList from "./ShopList";
import ShopSkeleton from "./ShopSkeleton";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import { UserContext } from "../../../context/AuthContext";


const Shop: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [present, dismiss] = useIonLoading();
  const [shopsRes, setShopsRes] = useState<any[]>([]);
  const [shopsResBar, setShopsResBar] = useState<boolean>(false);
  const [shops, setShops] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const controller: AbortController = new AbortController();
  const {navigate} = useContext(UserContext);
  const searchValue = useRef<null | HTMLIonSearchbarElement>(null);
  const getShops = async () => {
    try {
      const data = await axios(`${url}/api/shops`, {
        signal: controller.signal,
      });
      setError(null);
      return data.data;
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        setShops([]);
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
  useIonViewWillEnter(async () => {
    const shops = await getShops();
    setShops(shops);
    setLoading(false);
  });

  const doRefresh = async (event: any) => {
    setLoading(true);
    const data = await getShops();
    setShops(data);
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
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
    const res = await axios.get(`${url}/api/shops/search/${searchInput}`);
    setShopsResBar(true);
    if(res.data.items && res.data.items.length > 6){
      setShopsRes(res.data.items.slice(0,6));
    }else{
      setShopsRes(res.data.items);
    }
   } catch (error) {
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
            <IonSearchbar ref={searchValue} />
            <div className={shopsRes.length > 0?"search-bar-result on":"search-bar-result"}>
              {
                shopsRes.length > 0 && shopsRes.map((_,i)=>{
                  return(
                    <li onClick={()=>{gotoDetailsFromSearchList(_.s_product_id)}} key={i}>{_.s_product_name}</li>
                  ) 
                })
              } 
            </div>
          </form>
        </div>
        <IonContent className="_under_drawer">
          <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher>
          <ShopSkeleton loading={loading} />
          <ShopList shops={shops} navigate={navigate}/>
        </IonContent>
        <div className="spacer_drawer"></div>
      </IonPage>
    );
  }
};

export default Shop;
