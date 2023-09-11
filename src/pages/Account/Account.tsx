import {
  IonContent,
  IonPage,
  useIonRouter,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
  IonButton,
  useIonAlert,
} from "@ionic/react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import "./Account.css";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import {
  briefcaseOutline,
  callOutline,
  cartOutline,
  createOutline,
  mailOutline,
  personOutline,
  trashBinOutline,
} from "ionicons/icons";
import UpdateAccount from "./UpdateAccount/UpdateAccount";
import { logout } from "../../utils/logout";

const Account: any = () => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDeleteAccount = () => {
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
    });
  };
  const handleModal = () => {
    setOpenModal(true);
  };
  const { user, isAuthed } = useUser();
  if (!isAuthed) {
    return <Loader />;
  } else {
    return (
      <IonPage>
        <ToolBarMain />
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle color="medium" className="ion-text-center">
                My Profile
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList className="account-list">
                <div>
                  <div>
                    <IonIcon icon={personOutline} />
                    <IonLabel>User:</IonLabel>
                  </div>
                  <IonText>
                    {user.first_name && user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : ""}
                  </IonText>
                </div>
                <div>
                  <div>
                    <IonIcon icon={callOutline} />
                    <IonLabel> Phone Number:</IonLabel>
                  </div>
                  <IonText>
                    {user.phone_number ? user.phone_number : ""}
                  </IonText>
                </div>
                <div>
                  <div>
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Email:</IonLabel>
                  </div>
                  <IonText> {user.email ? user.email : ""}</IonText>
                </div>
                <div>
                  <div>
                    <IonIcon icon={cartOutline} />
                    <IonLabel>Shop Count:</IonLabel>
                  </div>
                  <IonText>{user.shop_count ? user.shop_count : 0}</IonText>
                </div>
                <div>
                  <div>
                    <IonIcon icon={briefcaseOutline} />
                    <IonLabel>Order Count:</IonLabel>
                  </div>
                  <IonText>{user.order_count ? user.order_count : 0}</IonText>
                </div>
                <div className="reset-last-div" onClick={handleDeleteAccount}>
                  <IonIcon icon={trashBinOutline} />
                  <IonText>Delete Account</IonText>
                </div>
                <div
                  className="reset-last-div"
                  onClick={handleModal}
                  id="open-modal"
                >
                  <IonIcon icon={createOutline} />
                  <IonText>Update Account</IonText>
                </div>
                <div className="reset-last-div" onClick={handleModal}>
                  <IonIcon icon={createOutline} />
                  <IonText>My Orders</IonText>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <UpdateAccount openModal={openModal} setOpenModal={setOpenModal} />
      </IonPage>
    );
  }
};

export default Account;
