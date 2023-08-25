import {useIonLoading, useIonRouter } from '@ionic/react';

import { useEffect, useState } from 'react';
import Intro from '../../components/Intro/Intro';
import { Preferences } from '@capacitor/preferences';
import LoginContent from './LoginContent';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useRef } from "react";
import axios from 'axios';
import { url } from '../../utils/utils';
const INTRO_KEY = 'intro-seen';


const  Login: React.FC = () => {

   const clientIdentity = useRef<null | HTMLIonInputElement>(null);
   const password = useRef<null | HTMLIonInputElement>(null);
   const router = useIonRouter(); 
   
   const [introSeen,setIntroSeen] = useState(true);
   const [present, dismiss] = useIonLoading();
   useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);

  
   const handleSubmit = async (event:any)=>{
    event.preventDefault();
    await present('Logging in...');
    //  (async()=>{
    //   try {
    //    const data :object = {
    //     clientIdentity: clientIdentity.current?.value,
    //     password:password.current?.value
    //    }
    //    const login = axios.get(`${url}/clients/login`,data); 
    //    dismiss(); 
    //    router.push('/app', 'root')
    //   } catch (error) {
    //    dismiss();
    //   }
    //  })()
    setTimeout(async () => {
      dismiss();
      console.log(clientIdentity.current?.value);
      console.log(password.current?.value);
      router.push('/app', 'root');
    }, 2000);
   }
   const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

    return (
        <>
        {
            !introSeen?<Intro onFinish={finishIntro}/>:(  
            <>
              <ToolBar backButton={false}/>
               <LoginContent 
               handleSubmit={handleSubmit}
               clientIdentity={clientIdentity} 
               password={password}
               />
               
            </>)
            
        }
        </>
      
    );
};

export default  Login;




