import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useRef } from "react";
import RegisterContent from "./UpdateAccountContent";
import { OverlayEventDetail } from "@ionic/core/components";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import { Toast } from "../../../utils/CustomToast";
import { errorResponse } from "../../../utils/errorResponse";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { UserContext } from "../../../context/AuthContext";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
}
const UpdateAccount: React.FC<Props> = ({ openModal, setOpenModal, user }) => {
  const [present, dismiss] = useIonLoading();
  const first_name = useRef<null | HTMLIonInputElement>(null);
  const last_name = useRef<null | HTMLIonInputElement>(null);
  const gender = useRef<null | HTMLIonRadioGroupElement>(null);
  const email = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const [presentIonToast] = useIonToast();
  const { updateSavedData } = useContext(UserContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      first_name: first_name.current?.value,
      last_name: last_name.current?.value,
      gender: gender.current?.value,
      email: email.current?.value,
      phone_number: phone_number.current?.value,
    };
    async function updateNow() {
      await present("updating...");
      try {
        const update: any = await axios.patch(
          `${url}/api/clients/${user.client_id}`,
          data,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        dismiss();
        if (update.data.status === true || update.status === 200) {
          const passedData = {
            ...user,
            ...update.data.updatedItem,
          };
          updateSavedData!(passedData);
          Toast(presentIonToast, update.data.message, checkmarkCircleOutline);
        }
      } catch (error) {
        dismiss();
        const { message, status } = errorResponse(error);
        if (message && status) {
          Toast(presentIonToast, message, closeCircleOutline);
        } else {
          Toast(presentIonToast, failMessage, closeCircleOutline);
        }
      }
    }
    if (
      data.first_name &&
      data.last_name &&
      data.gender &&
      data.email &&
      data.phone_number
    ) {
      updateNow();
    } else {
      Toast(
        presentIonToast,
        "update fields can not be empty",
        checkmarkCircleOutline
      );
    }
  };
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);


  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setOpenModal(false)
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
        </IonToolbar>
      </IonHeader>
      <RegisterContent
        user={user}
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
