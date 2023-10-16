import {
  IonContent,
  IonPage,
  useIonLoading,
} from "@ionic/react";
import ResetPasswordContent from "./ResetPasswordContent";
import {ToolBarMainAddOn } from "../../components/ToolBar/ToolBar";
import { useContext, useEffect, useRef } from "react";
import "./Reset.css";
import { UserContext } from "../../context/AuthContext";
import LoaderUI from "../../components/UI/Loader/LoaderUI";
const ResetPassword: React.FC = () => {
  const email = useRef<null | HTMLIonInputElement>(null);
  const otp = useRef<null | HTMLIonInputElement>(null);
  const newPassword = useRef<null | HTMLIonInputElement>(null);
  const repeatPassword = useRef<null | HTMLIonInputElement>(null);
  const [present, dismiss] = useIonLoading();
  const {wait, isAuthed,navigate,route,pushStack } = useContext(UserContext);
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  useEffect(()=>{
    if (isAuthed) { 
      navigate!('Home',null,null);
    }
  },[])
  useEffect(()=>{
    pushStack!({path:'ResetPassword',id:route?.id,info:route?.info});
  },[]);
  if(!wait){
    return (
      <IonPage>
        <>
        <ToolBarMainAddOn title="Reset Account" defaultValue={{path:"Register",id:null,info:null}} />
          <ResetPasswordContent
            email={email}
            newPassword={newPassword}
            repeatPassword={repeatPassword}
            otp={otp}
            reset={reset}
            present={present}
            dismiss={dismiss}
            navigate={navigate}
          />
        </>
        <div className="spacer_drawer"></div>
      </IonPage>
    );
  }else{
    return(
      <IonPage>
         <ToolBarMainAddOn title="Reset Account" defaultValue={{path:"Register",id:null,info:null}} />
        <IonContent>
        <LoaderUI/>
        </IonContent>
      </IonPage>
    )
  }
};

export default ResetPassword;
