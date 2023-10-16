import {
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import "./Account.css";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import {
  briefcaseOutline,
  callOutline,
  cartOutline,
  createOutline,
  informationCircleOutline,
  mailOutline,
  personOutline,
  trashBinOutline,
} from "ionicons/icons";
import UpdateAccount from "./UpdateAccount/UpdateAccount";
import { UserContext } from "../../context/AuthContext";
import { errorResponse } from "../../utils/errorResponse";
import { Toast } from "../../utils/CustomToast";
import { failMessage, url } from "../../utils/utils";
import axios from "axios";
import { logout } from "../../utils/logout";
import Feedback from "./Feedback/Feedback";

const Account: any = () => {
  const {isAuthed, user, wait, refresh,navigate,pushStack,route } = useContext(UserContext);
  const [presentAlert] = useIonAlert();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal_2, setOpenModal_2] = useState<boolean>(false);
  const [presentIonToast] = useIonToast();
  const handleDeleteAccount = () => {
    presentAlert({
      header: "Delete Account",
      message: "Are you sure you want to delete your account?",
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
            try {
              const deleteAccount = await axios.delete(
                `${url}/api/clients/app/${user.client_id}`,
                {
                  headers: {
                    Authorization: user.token,
                  },
                }
              );
              if (
                deleteAccount.data.status == true ||
                deleteAccount.status == 200
              ) {
                await logout();
                refresh!();
                navigate!("Home",null,null);
                Toast(
                  presentIonToast,
                  deleteAccount.data.message,
                  informationCircleOutline
                );
              }
            } catch (error) {
              const { message, status } = errorResponse(error);
              if (message && status) {
                Toast(presentIonToast, message, informationCircleOutline);
              } else {
                Toast(presentIonToast, failMessage, informationCircleOutline);
              }
            }
          },
        },
      ],
    });
  };
  const handleModal = () => {
    setOpenModal(true);
  };
  const handleModal_2 = () => {
    setOpenModal_2(true);
  };
  useEffect(()=>{
    pushStack!({path:'Account',id:route?.id,info:route?.info});
  },[]);
  useEffect(()=>{
    !isAuthed && navigate!("Login",null,null);
  },[])
  if (wait) {
    return  <IonPage>  <ToolBarMain title="My Account"/><Loader /></IonPage> ;
  } else {
    return (
      <IonPage>
        <ToolBarMain title="My Account"/>
        <IonContent className="ion-no-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle color="medium" className="ion-text-center">
                 Account & Settings
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
                    <IonIcon color="primary" icon={cartOutline} />
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
                  <div>
                    <IonIcon color="primary" icon={trashBinOutline} />
                  </div>
                  <div>
                    <IonText>Delete Account</IonText>
                  </div>
                </div>
                <div
                  className="reset-last-div"
                  onClick={handleModal}
                  id="open-modal"
                >
                  <div>
                    <IonIcon color="primary" icon={createOutline} />
                  </div>
                  <div>
                    <IonText>Update Account</IonText>
                  </div>
                </div>
                <div
                  className="reset-last-div"
                  onClick={handleModal_2}
                  id="open-modal_2"
                >
                  <div>
                    <IonIcon color="primary" icon={createOutline} />
                  </div>
                  <div>
                    <IonText>Feedback</IonText>
                  </div>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <UpdateAccount
          user={user}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <Feedback openModal_2={openModal_2} setOpenModal_2={setOpenModal_2} />
        <div className="spacer_drawer"></div>
      </IonPage>
    );
  }
};

export default Account;
