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
  IonTitle,
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <IonContent scrollY={true} className="ion-no-padding">
      <div className="form-app reset-email-screen-center">
        <div>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonTitle className="margin-bottom ion-text-center">
                      Change Password
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleUpdatePasswordSubmit}>
                      <IonInput
                        className="ionInput"
                        ref={newPassword}
                        fill="outline"
                        aria-label="new password"
                        placeholder="New password"
                        type={showPassword ? "text" : "password"}
                        required={false}
                      ></IonInput>
                      <IonInput
                        className="ionInput ion-margin-top ion-margin-bottom"
                        ref={repeatPassword}
                        fill="outline"
                        aria-label="confirm password"
                        placeholder="confirm password"
                        type={showPassword ? "text" : "password"}
                        required={false}
                      ></IonInput>
                      <p id="password-icon-parent">
                        <IonIcon
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          id="password-icon"
                          color="medium"
                          icon={showPassword ? eye : eyeOff}
                        />
                        <span>Show Password</span>
                      </p>
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
        </div>
      </div>
    </IonContent>
  );
};

export default ChangePassword;
