import {useIonRouter } from '@ionic/react';

import React from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import RegisterContent from './RegisterContent';

const Register: React.FC = () => {
   const router = useIonRouter();

   const handleSubmit = (event:React.FormEvent)=>{
     event.preventDefault();
     router.goBack();  
   }
    return (
        <>
            <ToolBar backButton={true} backHref="/"/>
            <RegisterContent handleSubmit={handleSubmit}/>
        </>
    );
};

export default Register;