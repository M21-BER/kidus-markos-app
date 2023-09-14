import {
  IonContent,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { logInOutline, eyeOff, eye } from "ionicons/icons";
import Logo from "../../assets/Logo.png";
import './Login.css'
import { useState } from "react";
interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  clientIdentity: React.MutableRefObject<HTMLIonInputElement | null>;
  password: React.MutableRefObject<HTMLIonInputElement | null>;
}
const LoginContent: React.FC<Props> = ({
  handleSubmit,
  clientIdentity,
  password,
}) => {
   const router = useIonRouter();
   const [showPassword,setShowPassword] = useState<boolean>(false)
  const handleLoginAction = (btn:number)=>{
   if(btn === 1){
    router.push("/app/register", "root");
   } 
   else if(btn === 2){
    router.push("/app/reset", "root");
   }
  }
  
  return (
    <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core form-app-core-login">
          <section>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <div className="ion-text-center ion-padding">
                  <img src={Logo} alt="Kidus Markos Logo" width="40%" />
                </div>
              </IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonTitle></IonTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleSubmit}>
                      <IonInput
                        className="ionInput"
                        ref={clientIdentity}
                        fill="outline"
                        labelPlacement="floating"
                        label="Email"
                        placeholder="user@kidusmarkos.com"
                        type="text"
                      ></IonInput>
                      <IonInput
                        ref={password}
                        className="ion-margin-top ionInput"
                        fill="outline"
                        labelPlacement="floating"
                        label="Password"
                        placeholder="password"
                        type={showPassword?"text":"password"}
                      >
                      </IonInput>
                      <small  id="password-icon-parent">
                        
                        <IonIcon
                      onClick={()=>{
                       setShowPassword(!showPassword)
                        
                      }}     
                      id="password-icon"
                      color="medium"
                      icon={showPassword?eye:eyeOff}
                        />
                        <span>show password</span>
                        </small>
                      <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                      >
                        
                        Sign In <IonIcon icon={logInOutline} slot="end" />
                      </IonButton>
                     <div className="pass-res">
                     <IonText onClick={()=>{handleLoginAction(1)}}>Sign up</IonText>
                     <IonText onClick={()=>{handleLoginAction(2)}}>Forget Password?</IonText>
                     </div>
                    
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </section>
        </div>
      </div>
    </IonContent>
  );
};

export default LoginContent;
