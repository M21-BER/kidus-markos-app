import {
  IonPage,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import LoginContent from "./LoginContent";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useEffect, useRef } from "react";
import axios from "axios";
import { login_key, url, failMessage } from "../../utils/utils";
import { errorResponse } from "../../utils/errorResponse";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
// import { useUser } from "../../hooks/useUser";
// import Loader from "../../components/UI/Loader/Loader";
import { Toast } from "../../utils/CustomToast";

const Login: React.FC = () => {
  const clientIdentity = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentIonToast] = useIonToast();

  // const [user, logged, isPending] = useUser();
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
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data: any = {
      clientIdentity: clientIdentity.current?.value,
      password: password.current?.value,
    };
    async function login() {
      try {
        await present("Logging in...");
        const login = await axios.post(`${url}/api/clients/login`, data);
        dismiss();
        if (login.data.status === "true" || login.status === 200) {
          if (login.data.client && login.data.token) {
            const userData = {
              ...login.data.client,
              token: login.data.token,
              logged: true,
            };
            Preferences.set({
              key: login_key,
              value: JSON.stringify(userData),
            });
            Toast(presentIonToast, login.data.message, checkmarkCircleOutline);
            router.push("/", "root", "replace");
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
    }
    if (data.clientIdentity && data.password) {
      login();
    } else {
      Toast(
        presentIonToast,
        "user credentials can not be empty",
        informationCircleOutline
      );
    }
    reset(clientIdentity);
    reset(password);
  };

  // if (isPending) {
  //   return <Loader />;
  // } else {
  return (
    <IonPage>
      <>
        <ToolBarMain title="Sign in" />
        <LoginContent
          handleSubmit={handleSubmit}
          clientIdentity={clientIdentity}
          password={password}
        />
      </>
    </IonPage>
  );
  // }
};

export default Login;
