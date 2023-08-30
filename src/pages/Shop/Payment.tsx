import {IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { ToolBarDetails } from '../../components/ToolBar/ToolBar';
import { useAxios } from '../../hooks/useAxios';
import { jsonCheck, url } from '../../utils/utils';
import image1 from '../../assets/banks/01.png'
import image2 from '../../assets/banks/02.png'
import image3 from '../../assets/banks/03.png'
import image4 from '../../assets/banks/04.png'
import './Payment.css'
import { informationCircleSharp } from 'ionicons/icons';
const Payment: React.FC = () => {
    const [detail,isPending,error] = useAxios(`${url}/api/settings`);
    let bankData:[] = [];
    let banks = [image1,image2,image3,image4];
     if(!isPending){
      bankData = jsonCheck(detail[0].data).bank_option
     }
    return (
        <IonPage>
           <ToolBarDetails/>
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
                      <IonButton>Continue to payment method</IonButton>
                  </div>
                
                </div> 
              }
            </IonContent>
        </IonPage>
    );
};

export default Payment;