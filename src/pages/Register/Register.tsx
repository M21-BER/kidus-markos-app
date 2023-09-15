import {
  IonPage,
  useIonRouter,
  useIonLoading,
  useIonToast,
} from "@ionic/react";

import React, { useRef, useEffect, useContext } from "react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import RegisterContent from "./RegisterContent";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Toast } from "../../utils/CustomToast";
import { failMessage, url } from "../../utils/utils";
import { errorResponse } from "../../utils/errorResponse";
const Register: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const first_name = useRef<null | HTMLIonInputElement>(null);
  const last_name = useRef<null | HTMLIonInputElement>(null);
  const gender = useRef<null | HTMLIonRadioGroupElement>(null);
  const email = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const [presentIonToast] = useIonToast();
  const { isAuthed } = useContext(UserContext);

  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      first_name: first_name.current?.value,
      last_name: last_name.current?.value,
      gender: gender.current?.value,
      email: email.current?.value,
      phone_number: phone_number.current?.value,
      password: password.current?.value,
    };
    const sign_up = async () => {
      try {
        await present("Signing...");
        const sign = await axios.get(`${url}/clients/signup`, data);
        dismiss();
        if (sign.data.status === "true" || sign.status === 200) {
          if (sign.data.client && sign.data.token) {
            Toast(presentIonToast, sign.data.message, checkmarkCircleOutline);
            // router.push("/login", "root", "replace");
          } else {
            throw new Error(failMessage);
          }
        } else {
          throw new Error(failMessage);
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
    };
    if (
      data.first_name &&
      data.last_name &&
      data.gender &&
      data.email &&
      data.phone_number &&
      data.password
    ) {
      sign_up();
    } else {
      Toast(
        presentIonToast,
        "user registration filed can not be empty",
        informationCircleOutline
      );
    }
    reset(data.first_name);
    reset(data.last_number);
    reset(data.gender);
    reset(data.email);
    reset(data.phone_number);
    reset(data.password);
  };

  useEffect(() => {
    if (isAuthed) {
      router.goBack();
    }
  }, [isAuthed]);
  return (
    <IonPage>
      <ToolBarMain title="Sign up" />
      <RegisterContent
        first_name={first_name}
        last_name={last_name}
        gender={gender}
        email={email}
        phone_number={phone_number}
        password={password}
        handleSubmit={handleSubmit}
      />
    </IonPage>
  );
};

export default Register;
