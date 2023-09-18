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
  IonTitle,
} from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import "../ResetPassword/Reset.css";
interface Props {
  handleVerify: (e: React.FormEvent) => void;
  sendOTPAgain: (e: React.FormEvent) => void;
  verify: React.MutableRefObject<HTMLIonInputElement | null>;
}
const Verify: React.FC<Props> = ({ handleVerify, verify, sendOTPAgain }) => {
  const handleOTPChange = (e: any) => {
    if (e.detail.value.length >= 4) {
      // @ts-ignore
      verify.current.value = parseInt(e.detail.value.toString().slice(0, 4));
    }
  };
  return (
    <IonContent scrollY={true} className="ion-no-padding">
      <div className="form-app reset-email-screen-center">
        <div>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonTitle className="ion-text-center">
                      Verify Account
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonText color="medium">
                      we have sent a 4 digit code to your email
                    </IonText>
                    <form onSubmit={handleVerify}>
                      <IonInput
                        className="ionInput ion-margin-top"
                        onIonInput={handleOTPChange}
                        ref={verify}
                        fill="outline"
                        aria-label="OTP"
                        placeholder="* * * *"
                        type="number"
                        required={false}
                      ></IonInput>
                      <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                      >
                        Verify
                        <IonIcon icon={checkmarkCircleOutline} slot="end" />
                      </IonButton>
                      <IonText className="ion-margin-top" color="medium">
                        didn't recieve code?
                      </IonText>
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

export default Verify;
