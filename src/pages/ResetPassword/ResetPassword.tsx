import {
  IonPage,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import ResetPasswordContent from "./ResetPasswordContent";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useEffect, useRef } from "react";
import { useUser } from "../../hooks/useUser";
import Loader from "../../components/UI/Loader/Loader";
import './Reset.css'
const ResetPassword: React.FC = () => {
  const email = useRef<null | HTMLIonInputElement>(null);
  const otp = useRef<null | HTMLIonInputElement>(null);
  const newPassword = useRef<null | HTMLIonInputElement>(null);
  const repeatPassword = useRef<null | HTMLIonInputElement>(null);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentIonToast] = useIonToast();
  const {user, isAuthed} = useUser();
  // useEffect(() => {
  //   if (!isPending) {
  //     if (logged) {
  //       router.push("/app/home", "root", "replace");
  //     }
  //   }
  // }, [isPending, logged]);
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  let id = 10;
  let token = "dfhf";

  if (isAuthed) {
    return <Loader />;
  } else {
    return (
      <IonPage>
        <>
          <ToolBarMain title="Sign in" />
          <ResetPasswordContent
            email={email}
            newPassword={newPassword}
            repeatPassword={repeatPassword}
            otp={otp}
            reset={reset}
            present={present}
            dismiss={dismiss}
          />
        </>
      </IonPage>
    );
  }
};

export default ResetPassword;
