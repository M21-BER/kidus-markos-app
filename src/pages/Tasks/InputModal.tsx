import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonSelect, IonSelectOption, IonToolbar, useIonToast } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core';
import { useRef, useState } from 'react';
import { addCircleOutline, checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';
import { Toast } from '../../utils/CustomToast';
import axios from 'axios';
import { failMessage, url } from '../../utils/utils';
import { errorResponse } from '../../utils/errorResponse';
interface Props{
modal:React.RefObject<HTMLIonModalElement>
onWillDismiss:(ev: CustomEvent<OverlayEventDetail>)=>void
openModal: boolean
setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
setTaskStatus:React.Dispatch<any>
confirm: ()=>void;
taskStatus:any;
}

const InputModal: React.FC<Props> = ({setTaskStatus,taskStatus,modal,onWillDismiss,openModal,setOpenModal,confirm}) => {
  const length = useRef<null | HTMLIonInputElement>(null);
  const width = useRef<null | HTMLIonInputElement>(null);
  const hight = useRef<null | HTMLIonInputElement>(null);
  const select = useRef<null | HTMLIonSelectElement>(null);
  const [finalAccessories,setFinalAccessories] = useState<any[]>([]);
  const [presentIonToast] = useIonToast();
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
   if(length.current?.value && width.current?.value && hight.current?.value && select.current?.value){
    let accessories =  [
      ...finalAccessories
    ];
    accessories.push({
      accessoryID:finalAccessories.length,
      type: select.current?.value?.toString().trim(),
      length: parseFloat(length.current?.value?.toString().trim()),
      width: parseFloat(width.current?.value?.toString().trim()),
      hight: parseFloat(hight.current?.value?.toString().trim())
    })
    setFinalAccessories(accessories); 
    let stringifiedAccessories = JSON.stringify(accessories);
    try {
     await axios.patch(`${url}/api/tasks/client/${taskStatus.task_id}`,{accessories:stringifiedAccessories},{
      headers: {
        Authorization: taskStatus.token,
      },
     });
     Toast(presentIonToast,"Accessories added successfully",checkmarkCircleOutline)
    } catch (error) {
     const {message,status} = errorResponse(error);
      if(message && status){
        Toast(presentIonToast,message,informationCircleOutline)
      }else{
        Toast(presentIonToast,failMessage,informationCircleOutline)
      } 
    }
    length.current ? (length.current.value = "") : "";
    width.current ? (width.current.value = "") : "";
    hight.current ? (hight.current.value = "") : "";
    select.current ? (select.current.value = "") : "";
   }else{
   Toast(presentIonToast,"please fill the fields",informationCircleOutline)
   }
  }

  return (
        <IonModal 
        initialBreakpoint={0.9}
        breakpoints={[0, 0.65, 0.9]}
        handleBehavior="cycle"
        className='modal-task'
        ref={modal}
        trigger="open-modal-insert-acc"
        isOpen={openModal}
        onWillDismiss={(ev) => onWillDismiss(ev)}>
       <IonHeader>
         <IonToolbar color="primary">
           <IonButtons slot="start">
             <IonButton onClick={() =>{
                setTaskStatus(null);
                setOpenModal(false);
                }}>Cancel</IonButton>
           </IonButtons>
           <IonButtons slot="end">
             <IonButton strong={true} onClick={() => confirm()}>
               Done
             </IonButton>
           </IonButtons>
         </IonToolbar>
       </IonHeader>
         <IonContent>
           <div className="insert-accessories-container">
           <div className="form-app">
        <div className="form-app-core">
          <h3>
            <span>Task Accessories</span>
          </h3>
          <form onSubmit={handleSubmit} className='my_accessories'>
          <IonList>
          <IonItem lines='none'>
          <IonSelect ref={select} interface="popover" placeholder="Select Accessory">
          <IonSelectOption value="oven">Oven</IonSelectOption>
          <IonSelectOption value="stove">Stove</IonSelectOption>
          <IonSelectOption value="fridge">Fridge</IonSelectOption>
          <IonSelectOption value="microwave">Microwave</IonSelectOption>
          </IonSelect>
          </IonItem>
          </IonList>
           <div>
           <IonInput
              ref={length}
              name="length"
              fill="outline"
              placeholder="L"
              type="number"
              step='any'
              min="1"
              className="ion-margin-top ion-text-center"
              required={false}
            ></IonInput>
            <IonInput
              ref={hight}
              name="hight"
              fill="outline"
              placeholder="H"
              type="number"
              step='any'
              min="1"
              className="ion-margin-top ion-text-center"
              required={false}
            ></IonInput>
            <IonInput
              ref={width}
              name="width"
              fill="outline"
              placeholder="W"
              type="number"
              step='any'
              min="1"
              className="ion-margin-top ion-text-center"
              required={false}
            ></IonInput></div>  
            <IonButton className="ion-margin-top" type="submit" expand="block">
              <span>Add Accessory</span>
              <IonIcon icon={addCircleOutline} slot="end" />
            </IonButton>
          </form>
        </div>
      </div>
           </div>
         </IonContent>
         </IonModal>
    );
};

export default InputModal;