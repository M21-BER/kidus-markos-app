//10000
import {
  IonPage,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import LoginContent from "./LoginContent";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { login_key, url, failMessage } from "../../utils/utils";
import { errorResponse } from "../../utils/errorResponse";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Toast } from "../../utils/CustomToast";
import { UserContext } from "../../context/AuthContext";

const Login: React.FC = () => {
  const clientIdentity = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentIonToast] = useIonToast();
  const { isAuthed,refresh } = useContext(UserContext);
  useEffect(() => {
    if (isAuthed) {
      router.goBack();
    }
  }, [isAuthed]);

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
        if (login.data.status === true || login.status === 200) {
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
          if (status === 404) {
            reset(clientIdentity);
            reset(password);
          }
          if (status === 422) {
            reset(password);
          }
          Toast(presentIonToast, message, closeCircleOutline);
        } else {
          reset(clientIdentity);
          reset(password);
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
  };

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
};

export default Login;
