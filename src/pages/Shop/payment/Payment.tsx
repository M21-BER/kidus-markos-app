import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonIcon, IonImg, IonInput, IonItem, IonModal, IonPage, IonText, useIonLoading, useIonToast } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ToolBarDetails } from '../../../components/ToolBar/ToolBar';
import { useAxios } from '../../../hooks/useAxios';
import { failMessage, jsonCheck, url } from '../../../utils/utils';
import image1 from '../../../assets/banks/01.png'
import image2 from '../../../assets/banks/02.png'
import image3 from '../../../assets/banks/03.png'
import image4 from '../../../assets/banks/04.png'
import './Payment.css'
import {checkmarkCircleOutline, informationCircleSharp, navigate } from 'ionicons/icons';
import ErrorFallBack from '../../../components/error/ErrorFallBack/ErrorFallBack';
import { OverlayEventDetail } from '@ionic/core';
import { Toast } from '../../../utils/CustomToast';
import { errorResponse } from '../../../utils/errorResponse';
import axios from 'axios';
import { UserContext } from '../../../context/AuthContext';
import ImageComponent from '../../../components/UI/Image';
import sample_payment from '../../../assets/sample_payment.jpg'
import LoaderUI from '../../../components/UI/Loader/LoaderUI';
const Payment: React.FC = () => {
    const {user,shopPayment,shopColor,route,navigate,pushStack} = useContext(UserContext);
    const id: any = {id:route?.id};
    const paymentId: any = route?.info.paymentId;
    const backPath: any = route?.info.path;
    const paid: any = route?.info.paid;
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/settings`);
    let bankData:[] = [];
    let banks = [image1,image2,image3,image4];
    const [presentIonToast] = useIonToast();
    const modal = useRef<HTMLIonModalElement>(null);
    const transaction = useRef<HTMLIonInputElement>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModal1, setOpenModal1] = useState<boolean>(false);
    const [present, dismiss] = useIonLoading();
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
      setOpenModal1(false); 
     }
    const handleModal1 = ()=>{
      setOpenModal(false); 
      setOpenModal1(true); 
     }
    const handle_transaction_submit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const transaction_code = transaction.current?.value;
      if(transaction_code){
        await present("validating wait...");
        try {
        const paymentRes = await axios.patch(`${url}/api/payment/client/${paymentId}`,{transaction_code},{
            headers:{
              Authorization:user.token
            }
           });
         dismiss();
         if(paymentRes.data.status){
          navigate!("MyShop",null,null);
          Toast(presentIonToast,"Thank you for your service, we are validating your purchase, we will notify you soon.",checkmarkCircleOutline,5000)
          }else{
            throw new Error(failMessage)
         }
        } catch (error) {
          dismiss();
          console.log(error);
          
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
    useEffect(()=>{
      pushStack!({path:'payment',id:route?.id,info:route?.info});
    },[]);
    if(!isPending){
     if(error){
      return (
        <IonPage>
           <ToolBarDetails defaultValue={{path:backPath,id:id.id,info:null}} title="Proceed to Payment"/>
          <ErrorFallBack className='m_error_top' error={error} reload={reload} />
        </IonPage>
      );
     }else{
    return (
        <IonPage>
            <ToolBarDetails defaultValue={{path:backPath,id:id.id,info:null}} title="Proceed to Payment"/>
            <IonContent className="ion-padding">
              {
                !isPending && <div className='payment-details'>
                   <div className='payment-desc'>
                    <IonText><IonIcon color='primary' icon={informationCircleSharp}/> Transfer the amount to one of the banks listed below to complete the purchase.</IonText>
                   </div>
                   <div className='shop-payment-details'>
                     <table>
                      <tbody>
                      <tr className='span-tr'>
                      <td colSpan={2}>Shop payment details</td>
                      </tr>
                      <tr>
                      <th>Product</th>
                      <td>{shopPayment?shopPayment.s_product_name:"unavailable"}</td>
                      </tr>
                      <tr>
                      <th>Price</th>
                      <td>{shopPayment?`${shopPayment.s_product_price}.ETB`:"unavailable"}</td>
                      </tr>
                      <tr>
                      <th>Category</th>
                      <td>{shopPayment?`${shopPayment.s_product_category}`:"unavailable"}</td>
                      </tr>
                      <tr>
                      <th>Color</th>
                      <td><div className='shop-payment-details-color' style={{background:`${shopColor}`}}></div></td>
                      </tr>
                      <tr>
                      <th>Delivery</th>
                      <td>within 3 to 5 days</td>
                      </tr>
                      </tbody>
                     </table>
                   </div>
                  <div>
                   {
                    bankData.map((item:any,index:number)=>{
                      return (
                    <IonCard key={index} className='ion-margin-bottom gopHolder'>
                    <IonCardHeader  className='ion-no-padding payment-card-header' color='primary'><IonCardTitle>{item.name}</IonCardTitle></IonCardHeader>
                      <IonCardContent className='ion-no-padding gop'>
                      <div className='card-con'>
                      <div> <img src={banks[index]} alt={item.name}/></div>
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
   <IonButton fill='outline' id="open-modal-sample-payment" onClick={handleModal1} expand='block' className='ion-margin-bottom'>Get tips on How</IonButton>
   <IonButton expand='block' id="open-modal-payment" onClick={handleModal} disabled={paid}>{paid?"Payment Submitted":"Continue to payment method"}</IonButton>
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
      <IonModal 
        ref={modal}
        className='modal-task'  
        trigger="open-modal-sample-payment" 
        isOpen={openModal1}
        onWillDismiss={(ev) => onWillDismiss(ev)}
        initialBreakpoint={0.8}
        breakpoints={[0, 0.25, 0.8]}
        handleBehavior="cycle"
        >
         <IonContent className='ion-padding'>
              <h3 style={{textAlign:'center',marginBottom:'30px'}}>
                <span>Payment Tips</span>
              </h3>
            <div  className='sample-payment_transaction'>
            <div className="payment-tip">
            <IonText color="medium"><IonChip>1.</IonChip> First transfer required fee</IonText>
            <IonText color="medium"><IonChip>2.</IonChip> After transfer you will see 12 digit transaction code on the payment receipt</IonText>
            <IonText color="medium"><IonChip>3.</IonChip> Click proceed to payment & enter 12 digit code </IonText>
            </div>
            <div className='sample-payment-image'>
            <ImageComponent
              src={sample_payment}
              hash="L3Q0swSO~qe800xJD*bv00,[n5Xm"
              label="sample payment tag"
              notServer={true}
              />
            </div>  
            </div>    
         </IonContent>
      </IonModal>
                  </div>
                
                </div> 
              }
            </IonContent>
            <div className="spacer_drawer"></div>
        </IonPage>
    );
  }
}else{
  return (
    <IonPage>
    <ToolBarDetails defaultValue={{path:backPath,id:id.id,info:null}} title="Proceed to Payment"/>
      <IonContent>
       <LoaderUI/>
      </IonContent>
    </IonPage>
  );
}
};

export default Payment;