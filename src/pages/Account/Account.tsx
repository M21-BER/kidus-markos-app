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
  IonChip,
  useIonLoading,
} from "@ionic/react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import "./Account.css";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import {
  analyticsOutline,
  bagCheckOutline,
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
import { CART_KEY, failMessage, jsonCheck, url } from "../../utils/utils";
import axios from "axios";
import { logout } from "../../utils/logout";
import Feedback from "./Feedback/Feedback";
import { useAuthAxios } from "../../hooks/useAuthAxios";
import { Preferences } from "@capacitor/preferences";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const Account: any = () => {
  const {isAuthed, user, wait, refresh,navigate,pushStack,route } = useContext(UserContext);
  const [presentAlert] = useIonAlert();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal_2, setOpenModal_2] = useState<boolean>(false);
  const [openModal_3, setOpenModal_3] = useState<boolean>(false);
  const [presentIonToast] = useIonToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState<any[]>([]);
  const [present, dismiss] = useIonLoading();
  const password = useRef<null | HTMLIonInputElement>(null);
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleDeleteAccount = async(e:React.FormEvent) => {
    e.preventDefault();
    const passwordInput = password.current?.value;
    try {
     await present("Checking...");
     const dp:any = await axios.post(`${url}/api/clients/checkPassword`,{
      client_id:user.client_id,
      password:passwordInput
     },{headers:{Authorization:user.token}})
     dismiss();
     if(dp.data.match){
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
                await present("Deleting Account...");
                const deleteAccount = await axios.delete(
                  `${url}/api/clients/app/${user.client_id}`,
                  {
                    headers: {
                      Authorization: user.token,
                    },
                  }
                );
                dismiss();
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
                dismiss();
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
     }else{
      reset(password)
      Toast(presentIonToast, "Password Incorrect", informationCircleOutline); 
     }
    } catch (error) {
      dismiss();
      reset(password)
      Toast(presentIonToast, "checking password busy, please try again later", informationCircleOutline); 
    }
    
  };
  const handleModal = () => {
    setOpenModal(true);
  };
  const handleModal_3 = () => {
    setOpenModal_3(true);
  };
  useEffect(()=>{
    pushStack!({path:'Account',id:route?.id,info:route?.info});
  },[]);
  useEffect(()=>{
    !isAuthed && navigate!("Login",null,null);
  },[])
  const [data1, isPending1, error1] = useAuthAxios(
    `${url}/api/payment/client/${user.client_id}`,user.token
  );
  const [data2, isPending2, error2] = useAuthAxios(
    `${url}/api/tasks/client/clientIndex/${user.client_id}`,user.token
  );
  
  const getCarts = async () => {
    const cartE = await Preferences.get({ key: CART_KEY });
    if (cartE.value) {
      const parse: number[] = jsonCheck(cartE.value);
      return parse;
    }
    return [];
  };
  useEffect(()=>{ 
    (async()=>{
      const cart = await getCarts();
    setCarts(cart);
    setLoading(false);
    })()
  },[]);
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
                 Account & Profile
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
                    <IonText>{user.email ? user.email : ""}</IonText>
                  </div>
                </div>

                <div>
                  <div>
                    <IonIcon color="primary" icon={bagCheckOutline} />
                    <IonLabel>Shop Count:</IonLabel>
                  </div>
                  <div>
                    <IonText>{!isPending1 && !error1 && data1 && data1.items && data1.items.length !== 0 && data1.items.filter((i:any)=>(i.delivered===true || i.validated===true)).length !== 0 ? data1.items.filter((i:any)=>(i.delivered===true || i.validated===true)).length : 0}</IonText>
                  </div>
                </div>

                <div>
                  <div>
                    <IonIcon color="primary" icon={analyticsOutline} />
                    <IonLabel>Task Count:</IonLabel>
                  </div>
                  <div>
                    <IonText>{!isPending2 && !error2 && data2 && data2.items && data2.items.length !== 0 && data2.items.filter((i:any)=>(i.completed===true && i.delivered===true)).length !==0  ? data2.items.filter((i:any)=>(i.completed===true && i.delivered===true)).length : 0}</IonText>
                  </div>
                </div>

                <div className="reset-last-div" 
                 onClick={handleModal_3}
                  id="open-modal_3">
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
                  onClick={handleModal_3}
                  id="open-modal_2"
                >
                  <div>
                    <IonIcon color="primary" icon={createOutline} />
                  </div>
                  <div>
                    <IonText>Feedback</IonText>
                  </div>
                </div>
                
                <div  className="reset-last-div" onClick={()=>{
                   navigate!("Carts",null,null);
                }}>
                  <div>
                    <IonIcon color="primary" icon={cartOutline} />
                  </div>
                  <div>
                    <IonText>Carts {!loading && carts.length !==0 && <IonChip style={{border:'1px solid rgba(51, 51, 51, 0.1)'}} color="secondary" >+{carts.length}</IonChip>}</IonText>
                  </div>
                </div>
                
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <DeleteAccount
           openModal_3={openModal_3}
           setOpenModal_3={setOpenModal}
           handleDeleteAccount={handleDeleteAccount}
           password={password}
        />  
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
