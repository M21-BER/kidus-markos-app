import {IonPage, useIonRouter } from '@ionic/react';

import React, { useRef } from 'react';
import {ToolBarMain} from '../../components/ToolBar/ToolBar';
import RegisterContent from './RegisterContent';
const Register: React.FC = () => {
   const router = useIonRouter();
   const first_name = useRef<null | HTMLIonInputElement>(null);
   const last_name = useRef<null | HTMLIonInputElement>(null);
   const gender = useRef<null | HTMLIonRadioGroupElement>(null);
   const email = useRef<null | HTMLIonInputElement>(null);
   const phone_number = useRef<null | HTMLIonInputElement>(null);
   const password = useRef<null | HTMLIonInputElement>(null);
   const reset = ()=>{
   
   } 
   const handleSubmit = (event:React.FormEvent)=>{
     event.preventDefault();
    //  router.goBack();  
   
   
       //  (async()=>{
    //   try {
      // const data:object = {
      //   first_name:first_name.current?.value,
      //   last_name:last_name.current?.value,
      //   gender:gender.current?.value,
      //   email:email.current?.value,
      //   phone_number:phone_number.current?.value,
      //   password:password.current?.value,
      // }
    //    const login = axios.get(`${url}/clients/login`,data); 
    //    dismiss(); 
    //    router.push('/app', 'root')
    //   } catch (error) {
    //    dismiss();
    //   }
    //  })()
    
   }
    return (
      <IonPage>
            <ToolBarMain title='Sign up'/>
            <RegisterContent 
             first_name={first_name} 
             last_name={last_name} 
             gender={gender} 
             email={email} 
             phone_number={phone_number} 
             password={password} 
             handleSubmit={handleSubmit}/>
       </IonPage>
    );
};

export default Register;
