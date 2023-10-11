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
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  logOutOutline,
  logInOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { logout } from "../../utils/logout";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/AuthContext";
import { Toast } from "../../utils/CustomToast";

interface Props {
  title?: string;
  defaultValue?:string;
}
export const ToolBarMain: React.FC<Props> = ({ title,defaultValue }) => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const { isAuthed, refresh,backHref,backBtn } = useContext(UserContext);
  const [presentIonToast] = useIonToast();
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
            handler: async () => {
              const status: boolean = await logout();
              if (status) {
                refresh!();
                Toast(
                  presentIonToast,
                  "Sign out successfully!",
                  checkmarkCircleOutline
                );
              } else {
                Toast(
                  presentIonToast,
                  "Sign out failed, please try again later!",
                  informationCircleOutline
                );
              }
            },
          },
        ],
      });
    } else {
      router.push("/app/login", "root");
    }
  };
  const searchValue = useRef<null | HTMLIonSearchbarElement>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchValue.current?.value);
  };
  useIonViewWillEnter(()=>{
  refresh!();
  })
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title || "KM"}</IonTitle>
         {
          backBtn && (
            <IonButtons slot="start">
            <IonBackButton defaultHref={backHref}></IonBackButton>
          </IonButtons>
          )
         }
        <IonButtons slot="end">
          <IonButton onClick={handleUserToolBar}>
          {isAuthed ? "Logout" : "Login"}     
            {/* <IonIcon
              slot="icon-only"
              icon={isAuthed ? logOutOutline : logInOutline}
              color={"light"}
            /> */}
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
export const ToolBarDetails: React.FC<Props> = ({ title,defaultValue }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton defaultHref={defaultValue?defaultValue:'/'}></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
