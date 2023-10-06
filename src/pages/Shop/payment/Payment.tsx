import {IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonImg, IonInput, IonItem, IonModal, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { ToolBarDetails } from '../../../components/ToolBar/ToolBar';
import { useAxios } from '../../../hooks/useAxios';
import { failMessage, jsonCheck, url } from '../../../utils/utils';
import image1 from '../../../assets/banks/01.png'
import image2 from '../../../assets/banks/02.png'
import image3 from '../../../assets/banks/03.png'
import image4 from '../../../assets/banks/04.png'
import './Payment.css'
import {checkmarkCircleOutline, informationCircleSharp } from 'ionicons/icons';
import ErrorFallBack from '../../../components/error/ErrorFallBack/ErrorFallBack';
import { OverlayEventDetail } from '@ionic/core';
import { Toast } from '../../../utils/CustomToast';
import { errorResponse } from '../../../utils/errorResponse';
import axios from 'axios';
import { UserContext } from '../../../context/AuthContext';

const Payment: React.FC = () => {
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/settings`);
    let bankData:[] = [];
    let banks = [image1,image2,image3,image4];
    const [presentIonToast] = useIonToast();
    const modal = useRef<HTMLIonModalElement>(null);
    const transaction = useRef<HTMLIonInputElement>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {user} = useContext(UserContext);
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
    const handle_transaction_submit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const transaction_code = transaction.current?.value;
      if(transaction_code){
        try {
        const paymentRes = await axios.get(`${url}/api/payment/client/${user.client_id}`,{
            headers:{
              Authorization:user.token
            }
           });
         if(paymentRes.data.status){
           if(typeof paymentRes.data.items === 'object' &&  paymentRes.data.items.length > 0){
            //  if(){
            //   paymentRes.data.items.length
            //  }
             Toast(presentIonToast,"validated successfully",checkmarkCircleOutline);
           }else{
            Toast(presentIonToast,"wait a bit longer please",checkmarkCircleOutline)
           }
           }else{
            throw new Error("server error...")
           }
        } catch (error) {
          const {message,status} = errorResponse(error);
           if(message && status){
            Toast(presentIonToast,message,informationCircleSharp)
           }else{
            Toast(presentIonToast,failMessage,informationCircleSharp)
           }
        }

      }else{
        Toast(presentIonToast,"please enter transaction code",informationCircleSharp)
      }
     }
     const handleTransactionSub = (e: any) => {
      if (e.detail.value.length > 12) {
        // @ts-ignore
        transaction.current.value = e.detail.value.toString().slice(0, 12);
        Toast(presentIonToast,"transaction code must be exactly 12 character",informationCircleSharp);
      }
    };
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
                    <IonText><IonIcon color='primary' icon={informationCircleSharp}/> Transfer the amount to one of the banks listed below to complete the purchase.</IonText>
                   </div>
                  <div>
                   {
                    bankData.map((item:any,index:number)=>{
                      return (
                    <IonCard key={index} className='ion-margin-bottom gopHolder'>
                    <IonCardHeader  className='ion-no-padding payment-card-header' color='primary'><IonCardTitle>{item.name}</IonCardTitle></IonCardHeader>
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
                      <IonButton expand='block' id="open-modal-payment" onClick={handleModal}>Continue to payment method</IonButton>
                      <IonModal 
        ref={modal}
        className='modal-task'  
        trigger="open-modal-payment" 
        isOpen={openModal}
        onWillDismiss={(ev) => onWillDismiss(ev)}
        initialBreakpoint={0.5}
        breakpoints={[0, 0.25, 0.5]}
        handleBehavior="cycle"
        >
         <IonContent className='ion-padding ion-text-center'>
         <div className="form-app-core ept-con">
              <h3>
                <span>Validate Transaction</span>
              </h3>
            <div  className='payment_transaction'>
              <form onSubmit={handle_transaction_submit} className='payment_transaction_form'>      
              <IonInput className="ionInput" onIonInput={handleTransactionSub} ref={transaction} fill='outline'  placeholder='enter payment transaction code' type='text' required={false}></IonInput>
              <IonButton className='ion-margin-top' type='submit' expand='block'>Validate <IonIcon icon={checkmarkCircleOutline} size="small" slot='start'/> </IonButton>
              </form>
            </div>    
            </div>
         </IonContent>
        </IonModal>
                  </div>
                
                </div> 
              }
            </IonContent>
        </IonPage>
    );
  }
};

export default Payment;