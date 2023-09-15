import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useState } from "react";

interface Props {
  handleUpdatePasswordSubmit: (e: React.FormEvent) => void;
  newPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  repeatPassword: React.MutableRefObject<HTMLIonInputElement | null>;
}

const ChangePassword: React.FC<Props> = ({
  newPassword,
  repeatPassword,
  handleUpdatePasswordSubmit,
}) => {
   
  const [showPassword,setShowPassword] = useState<boolean>(false)
   return (
    <IonContent scrollY={true} className="ion-padding">
    <IonGrid fixed>
      <IonRow class="ion-justify-content-center">
        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
          <IonCard color="warning">
            <IonCardHeader>
              <IonText>Change Password</IonText>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleUpdatePasswordSubmit}>
                <IonInput
                  className="ionInput"
                  ref={newPassword}
                  fill="outline"
                  labelPlacement="floating"
                  label="New Password"
                  placeholder="New password"
                  type={showPassword?"text":"password"} 
                ></IonInput>
                <IonInput
                  className="ionInput ion-margin-top"
                  ref={repeatPassword}
                  fill="outline"
                  labelPlacement="floating"
                  label="Repeat Password"
                  placeholder="Repeat Password"
                  type={showPassword?"text":"password"} 
                ></IonInput>
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
                  Update Password
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonContent>
   )

  
};

export default ChangePassword;
