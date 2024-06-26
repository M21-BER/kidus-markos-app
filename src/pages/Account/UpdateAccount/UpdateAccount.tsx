import {
  IonModal,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useRef } from "react";
import UpdateAccountContent from "./UpdateAccountContent";
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
  const email = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const [presentIonToast] = useIonToast();
  const { updateSavedData } = useContext(UserContext);
  const modal = useRef<HTMLIonModalElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    var data: any = {
    };
    first_name.current?.value?.toString().trim() != ""  &&  (data.first_name = first_name.current?.value?.toString().trim());
    last_name.current?.value?.toString().trim() != ""  &&  (data.last_name = last_name.current?.value?.toString().trim());
    email.current?.value?.toString().trim() != ""  &&  (data.email = email.current?.value?.toString().trim());
    phone_number.current?.value?.toString().trim() != ""  &&  (data.phone_number = phone_number.current?.value?.toString().trim());
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
            ...data,
          };
          updateSavedData!(passedData);
          {/*@ts-ignore */}
          first_name.current.value = data.first_name
          {/*@ts-ignore */}
          last_name.current.value = data.last_name
          {/*@ts-ignore */}
          email.current.value = data.email
          {/*@ts-ignore */}
          phone_number.current.value = data.phone_number
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
      data.first_name ||
      data.last_name ||
      data.email ||
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

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setOpenModal(false)
  }
  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      isOpen={openModal}
      onWillDismiss={(ev) => onWillDismiss(ev)}
      initialBreakpoint={0.8}
      breakpoints={[0, 0.25, 0.8]}
      handleBehavior="cycle"
    >
      <UpdateAccountContent
        user={user}
        first_name={first_name}
        last_name={last_name}
        email={email}
        phone_number={phone_number}
        handleSubmit={handleSubmit}
      />
    </IonModal>
  );
};

export default UpdateAccount;
