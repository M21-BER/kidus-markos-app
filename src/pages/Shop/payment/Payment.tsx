import {IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonModal, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { ToolBarDetails } from '../../../components/ToolBar/ToolBar';
import { useAxios } from '../../../hooks/useAxios';
import { jsonCheck, url } from '../../../utils/utils';
import image1 from '../../../assets/banks/01.png'
import image2 from '../../../assets/banks/02.png'
import image3 from '../../../assets/banks/03.png'
import image4 from '../../../assets/banks/04.png'
import './Payment.css'
import { informationCircleSharp } from 'ionicons/icons';
import ErrorFallBack from '../../../components/error/ErrorFallBack/ErrorFallBack';
import { OverlayEventDetail } from '@ionic/core';

const Payment: React.FC = () => {
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/settings`);
    let bankData:[] = [];
    let banks = [image1,image2,image3,image4];
    const modal = useRef<HTMLIonModalElement>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
     if(!isPending){
      bankData = jsonCheck(detail[0].data).bank_option
     }
     const reload = ()=>{
      setUpdate(true);
     }
     function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      setOpenModal(false); 
    }
    const handleModal = ()=>{
      setOpenModal(true); 
     }
     if(error){
      return (
        <IonPage>
          <ToolBarDetails defaultValue={`/shopDetails/9`} title="Proceed to Payment"/>
          <ErrorFallBack className='m_error_top' error={error} reload={reload} />
        </IonPage>
      );
     }else{
    return (
        <IonPage>
           <ToolBarDetails title="Proceed to Payment"/>
            <IonContent className="ion-padding">
              {
                !isPending && <div className='payment-details'>
                  <div><IonTitle className='ion-text-center ion-margin-bottom ion-margin-top'>Payment</IonTitle></div>
                   <div className='payment-desc'>
                    <p><IonIcon color='primary' icon={informationCircleSharp}/> Transfer the amount to the banks listed below to complete the purchase</p>
                   </div>
                  <div>
                   {
                    bankData.map((item:any,index:number)=>{
                      return (
                        <IonCard key={index} className='ion-margin-bottom gopHolder'>
                        <IonCardHeader color='primary'><IonCardTitle>{item.name}</IonCardTitle></IonCardHeader>

                      <IonCardContent className='ion-no-padding gop'>
                      <div className='card-con'>
                      <img src={banks[index]} alt={item.name}/>
                        <div>
                        <p> {item.acc}</p>
                        <p>{item.holder}</p>
                        </div>
                       </div>
                      </IonCardContent>
                    </IonCard>
                      )   
                    })
                   }
                  </div>  
                  <div  className='ctpm'>
                      <IonButton id="open-modal-payment"  onClick={handleModal}>Continue to payment method</IonButton>
                  </div>
                
                </div> 
              }
        <IonModal 
        className='modal-task'  
        isOpen={openModal}
        onWillDismiss={(ev) => onWillDismiss(ev)}
        ref={modal}
        trigger="open-modal-payment" 
        initialBreakpoint={1} breakpoints={[0, 1]}>
        <div className="block">Block of Content</div>
        </IonModal>
            </IonContent>
        </IonPage>
    );
  }
};

export default Payment;