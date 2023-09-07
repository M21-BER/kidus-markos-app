import {IonPage, useIonLoading, useIonRouter,useIonToast } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import LoginContent from './LoginContent';
import {ToolBarMain} from '../../components/ToolBar/ToolBar';
import { useEffect, useRef } from "react";
import axios from 'axios';
import { login_key, url } from '../../utils/utils';
import { errorResponse } from '../../utils/errorResponse';
import { checkmarkCircleOutline, closeCircleOutline, informationCircleOutline } from 'ionicons/icons';
import { useUser } from '../../hooks/useUser';
import Loader from '../../components/UI/Loader/Loader';

const  Login: React.FC  = () => {
   const clientIdentity = useRef<null | HTMLIonInputElement>(null);
   const password = useRef<null | HTMLIonInputElement>(null);
   const router = useIonRouter(); 
   const [present, dismiss] = useIonLoading();
   const [presentToast] = useIonToast(); 

   const [user,logged,isPending] = useUser();
   useEffect(()=>{
    if(!isPending){
      if(logged){
     router.push('/app/home','root','replace')
      }
   }
   },[isPending,logged])
   
  const handleSubmit = async (event:any)=>{
  event.preventDefault();

  const data :any = {
  clientIdentity: clientIdentity.current?.value,
  password:password.current?.value
  }
  async function login(){
  try {
  await present('Logging in...');
  const login = await axios.post(`${url}/api/clients/login`,data); 
  dismiss(); 
  if(login.data.status === "true" || login.status === 200){
  if(login.data.client && login.data.token){
  const userData = {
    ...login.data.client,
    token: login.data.token,
    logged:true,
  }
  Preferences.set({ key: login_key, value: JSON.stringify(userData)});
  presentToast({
    message: login.data.message,
    duration: 3000,
    position: "bottom",
    icon:checkmarkCircleOutline,
  });
  router.push('/', 'root','replace');
  }else{
  throw new Error("Oops, something went wrong. Please try again")
  }
  }else{
  throw new Error("Oops, something went wrong. Please try again")
  } 
  } catch (error) {
  dismiss();
  const {message,status} = errorResponse(error)
  if(message && status){
  presentToast({
  message: message,
  duration: 3000,
  position: "bottom",
  icon:closeCircleOutline,

  });
  }else{
  presentToast({
  message: "Oops, something went wrong. Please try again",
  duration: 3000,
  position: "bottom",
  icon:closeCircleOutline,

  });
  }

  }
  }
  if(data.clientIdentity && data.password){
  login();
  }else{
  presentToast({
  message: "user credentials can not be empty.",
  duration: 3000,
  position: "bottom",
  icon:informationCircleOutline,
  });
  }
  }
  if(isPending){
    return (
     <Loader/>
    ) 
 }else{
  return (
    <IonPage>
          <>
            <ToolBarMain title="Sign in"/>
              <LoginContent 
              handleSubmit={handleSubmit}
              clientIdentity={clientIdentity} 
              password={password}
              />
          </>
        </IonPage>
    
  );

 }
};

export default  Login;