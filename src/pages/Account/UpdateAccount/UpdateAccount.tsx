import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";
import RegisterContent from "./UpdateAccountContent";
import { OverlayEventDetail } from "@ionic/core/components";
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateAccount: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const first_name = useRef<null | HTMLIonInputElement>(null);
  const last_name = useRef<null | HTMLIonInputElement>(null);
  const gender = useRef<null | HTMLIonRadioGroupElement>(null);
  const email = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const handleSubmit = (event: React.FormEvent) => {
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
  };
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
    }
  }
  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      isOpen={openModal}
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => setOpenModal(false)}>Cancel</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <RegisterContent
        first_name={first_name}
        last_name={last_name}
        gender={gender}
        email={email}
        phone_number={phone_number}
        password={password}
        handleSubmit={handleSubmit}
      />
    </IonModal>
  );
};

export default UpdateAccount;
