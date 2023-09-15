import { IonButton, IonContent, IonIcon, IonInput, IonText,useIonToast } from '@ionic/react';
import { checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';
import React from 'react';
import { Toast } from '../../utils/CustomToast';

interface Props{
handleVerify:(e:React.FormEvent)=>void;
verify:any;  
setVerify: React.Dispatch<any>  
}
const Verify: React.FC<Props> = ({handleVerify,verify,setVerify}) => {
  const [presentIonToast] = useIonToast();
  const handleNumChange = (event:any) => {
    const v = event.detail.value
    if(v.length <= 4){
     setVerify(v) 
    }else{
      Toast(
        presentIonToast,
        "verify code must be exactly 4 digits",
        informationCircleOutline
      );
      setVerify((pre:any)=>{
       return null
      })
    }
  };
    return (
        <IonContent className="ion-padding">
        <div className="form-app">
          <div className="form-app-core form-app-core-register">
           <h3>Verify Account</h3>
            <IonText color="medium">A 4-digit code has been sent to your email address.</IonText>
            <form onSubmit={handleVerify}>
           <IonInput value={verify} name="verify" onIonInput={handleNumChange} fill='outline' labelPlacement='floating' label='Code' placeholder='****' type='number' className='ion-margin-top' required={false}></IonInput>
           <IonButton className='ion-margin-top' type='submit' expand='block'>Verify<IonIcon icon={checkmarkCircleOutline} slot='end'/> </IonButton>
           </form>
          </div>
        </div>
      </IonContent>
    );
};

export default Verify;