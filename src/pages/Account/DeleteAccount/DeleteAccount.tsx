import { IonButton, IonContent, IonIcon, IonInput, IonModal, IonTextarea } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { OverlayEventDetail } from "@ionic/core/components";
import React, { useRef, useState } from 'react';
import { Keyboard } from "@capacitor/keyboard";
interface Props {
    openModal_3: boolean;
    setOpenModal_3: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteAccount:(e:React.FormEvent)=>void;
    password:React.MutableRefObject<HTMLIonInputElement | null>;
  }
const DeleteAccount: React.FC<Props> = ({password,openModal_3,setOpenModal_3,handleDeleteAccount}) => {
    const modal3 = useRef<HTMLIonModalElement>(null);
    const [size,setSize] = useState({initialBreakpoint:0.5,breakpoints:[0, 0.25, 0.5]})
    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        setOpenModal_3(false)
      }
      Keyboard.addListener('keyboardDidShow', info => {
        setSize({initialBreakpoint:0.9,breakpoints:[0, 0.25, 0.9]})
      });
      
      Keyboard.addListener('keyboardDidHide', () => {
      setSize({initialBreakpoint:0.5,breakpoints:[0, 0.25, 0.5]})
      });
    return (
        <IonModal
          ref={modal3}
          trigger="open-modal_3"
          isOpen={openModal_3}
          onWillDismiss={(ev) => onWillDismiss(ev)}
          initialBreakpoint={size.initialBreakpoint}
           breakpoints={size.breakpoints}
          handleBehavior="cycle"
          >
             <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core">
          <h3 style={{marginBottom:'40px'}}>
            <span>Enter Password to Delete Account</span>
          </h3>
          <form onSubmit={handleDeleteAccount}>
            <IonInput
              ref={password}
              name="password"
              fill="outline"
              placeholder="Enter Password "
              type="text"
              className="ion-margin-top ion-text-center"
              required={false}
            ></IonInput>
            <IonButton  className="ion-margin-top" type="submit" expand="block">
              <span>Proceed</span>
              <IonIcon icon={trashBinOutline} slot="start" />
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
          </IonModal>
    );
};

export default DeleteAccount;