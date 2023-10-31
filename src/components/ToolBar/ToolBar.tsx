import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonButton,
  IonIcon,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import {
  logOutOutline,
  logInOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { logout } from "../../utils/logout";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import { Toast } from "../../utils/CustomToast";

interface Props {
  title?: string;
  defaultValue?:any;
}
export const ToolBarMain: React.FC<Props> = ({ title,defaultValue }) => {
  const [presentAlert] = useIonAlert();
  const { isAuthed, refresh,navigate,setIsAuthed } = useContext(UserContext);
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
                setIsAuthed!(false);
                navigate!("Login",null,null);
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
      navigate!("Login",null,null);
    }
  };
  return (
    <IonHeader>
      <IonToolbar color="primary"  style={{height:'80px',padding:"10px 0"}}>
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={handleUserToolBar}> 
            <IonIcon
              slot="icon-only"
              icon={isAuthed ? logOutOutline : logInOutline}
              color={"light"}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
export const ToolBarMainAddOn: React.FC<Props> = ({ title,defaultValue }) => {
  const [presentAlert] = useIonAlert();
  const { isAuthed, refresh,navigate } = useContext(UserContext);
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
                navigate!("Login",null,null);
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
      navigate!("Login",null,null)
    }
  };
  return (
    <IonHeader>
      <IonToolbar color="primary"  style={{height:'80px',padding:"10px 0"}}>
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="start" onClick={()=>{
          navigate!(defaultValue.path,defaultValue.id,defaultValue.info)
        }}>
          <IonIcon icon={arrowBackOutline}  className="back-btn"/>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton onClick={handleUserToolBar}>     
            <IonIcon
              slot="icon-only"
              icon={isAuthed ? logOutOutline : logInOutline}
              color={"light"}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
export const ToolBarDetails: React.FC<Props> = ({ title,defaultValue }) => {
  const {navigate} = useContext(UserContext);
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>{title || "KM"}</IonTitle>
        <IonButtons slot="start" onClick={()=>{
          navigate!(defaultValue.path,defaultValue.id,defaultValue.info)
        }}>
          <IonIcon icon={arrowBackOutline}  className="back-btn"/>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
