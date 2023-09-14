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
import { useState } from "react";
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
        <IonContent className="ion-no-padding">
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
                    <IonIcon color="primary" icon={personOutline} />
                    <IonLabel>User:</IonLabel>
                  </div>
                <div>
                <IonText>
                    {user.first_name && user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : ""}
                  </IonText>
                </div>
                </div>

                <div>
                  <div>
                    <IonIcon color="primary" icon={callOutline} />
                    <IonLabel> Phone Number:</IonLabel>
                  </div>
                <div>
                <IonText>
                    {user.phone_number ? user.phone_number : ""}
                  </IonText>
                </div>
                </div>
                
                <div>
                  <div>
                    <IonIcon color="primary" icon={mailOutline} />
                    <IonLabel>Email:</IonLabel>
                  </div>
                 <div>
                 <IonText>Neil_Oberbrunner65@hotmail.com</IonText>
                 </div>
                </div>

                <div>
                  <div>
                    <IonIcon color="primary"icon={cartOutline} />
                    <IonLabel>Shop Count:</IonLabel>
                  </div>
                  <div>
                  <IonText>{user.shop_count ? user.shop_count : 0}</IonText>
                  </div>
                </div>

                <div>
                  <div>
                    <IonIcon color="primary" icon={briefcaseOutline} />
                    <IonLabel>Order Count:</IonLabel>
                  </div>
                 <div>
                 <IonText>{user.order_count ? user.order_count : 0}</IonText>
                 </div>
                </div>

                <div className="reset-last-div" onClick={handleDeleteAccount}>
                <div>  <IonIcon color="primary" icon={trashBinOutline} /></div>
                 <div>
                 <IonText>Delete Account</IonText>
                 </div>
                </div>
                <div
                  className="reset-last-div"
                  onClick={handleModal}
                  id="open-modal"
                >
                 <div><IonIcon color="primary" icon={createOutline} /></div>
                 <div>
                 <IonText>Update Account</IonText>
                 </div>
                </div>
                <div className="reset-last-div" onClick={handleModal}>
                   <div> <IonIcon color="primary" icon={createOutline} /></div>
                <div>
                <IonText>My Orders</IonText>
                </div>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <UpdateAccount user={user} openModal={openModal} setOpenModal={setOpenModal} />
      </IonPage>
    );
  }
};

export default Account;
