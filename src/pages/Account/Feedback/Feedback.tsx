import {
  IonModal,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useRef } from "react";
import FeedbackContent from "./FeedbackContent";
import { OverlayEventDetail } from "@ionic/core/components";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import { Toast } from "../../../utils/CustomToast";
import { errorResponse } from "../../../utils/errorResponse";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";

interface Props {
  openModal_2: boolean;
  setOpenModal_2: React.Dispatch<React.SetStateAction<boolean>>;
}
const Feedback: React.FC<Props> = ({ openModal_2, setOpenModal_2 }) => {
  const [present, dismiss] = useIonLoading();
  const full_name = useRef<null | HTMLIonInputElement>(null);
  const rating = useRef<null | HTMLIonInputElement>(null);
  const email = useRef<null | HTMLIonInputElement>(null);
  const feed_back = useRef<null | HTMLIonTextareaElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);
  const [presentIonToast] = useIonToast();
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | HTMLIonTextareaElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      full_name: full_name.current?.value?.toString().trim(),
      rating: parseFloat(`${rating.current?.value}`),
      email: email.current?.value?.toString().trim(),
      feed_back: feed_back.current?.value?.toString().trim(),
    };
    async function addFeedback() {
      await present("submitting...");
      try {
        const submit_feedback: any = await axios.post(
          `${url}/api/customer/feedback/`,
          data
        );
        dismiss();
        if (
          submit_feedback.data.status === true ||
          submit_feedback.status === 200
        ) {
          Toast(
            presentIonToast,
            'Thank you for your feedback!',
            checkmarkCircleOutline
          );
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
    if (data.full_name && data.rating && data.email && data.feed_back) {
      addFeedback(); 
    } else {
      Toast(
        presentIonToast,
        "feedback fields can not be empty",
        checkmarkCircleOutline
      );
    }
    reset(full_name);
    reset(rating);
    reset(email);
    reset(feed_back);
  };
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setOpenModal_2(false);
  }
  return (
    <IonModal
      ref={modal2}
      trigger="open-modal_2"
      isOpen={openModal_2}
      onWillDismiss={(ev) => onWillDismiss(ev)}
      initialBreakpoint={0.8}
      breakpoints={[0, 0.25, 0.8]}
      handleBehavior="cycle"
    >
      <FeedbackContent
        full_name={full_name}
        rating={rating}
        email={email}
        feed_back={feed_back}
        handleSubmit={handleSubmit}
      />
    </IonModal>
  );
};

export default Feedback;
