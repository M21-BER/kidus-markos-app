import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonItem,
  useIonRouter,
  useIonAlert,
} from "@ionic/react";
import { logOutOutline, logInOutline } from "ionicons/icons";
import { logout } from "../../utils/logout";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/AuthContext";

interface Props {
  title?: string;
}
export const ToolBarMain: React.FC<Props> = ({ title }) => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const { isAuthed } = useContext(UserContext);
  const handleUserToolBar = () => {
    if (isAuthed) {
      presentAlert({
        header: "Sign out!",
        message: "Are you sure you want to sign out?",
        backdropDismiss: false,
        keyboardClose: true,
        animated: true,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "OK",
            role: "confirm",
            handler: () => {
              logout();
            },
          },
        ],
        // onDidDismiss: (e: CustomEvent) => {
        //   // setRoleMessage(`Dismissed with role: ${e.detail.role}`)
        // },
      });
    } else {
      router.push("/app/login", "root", "replace");
    }
  };
  const searchValue = useRef<null | HTMLIonSearchbarElement>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchValue.current?.value);
  };
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="end">
          {isAuthed ? "Sign out" : "Sign in"}
          <IonButton onClick={handleUserToolBar}>
            <IonIcon
              slot="icon-only"
              icon={isAuthed ? logOutOutline : logInOutline}
              color={"light"}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonToolbar color="primary">
        <IonItem color="primary">
          <form onSubmit={handleSearch}>
            <IonSearchbar ref={searchValue} />
          </form>
        </IonItem>
      </IonToolbar>
    </IonHeader>
  );
};
export const ToolBarDetails: React.FC<Props> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/"></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
