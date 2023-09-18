import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
interface Props {
  handleOtpSubmit: (e: React.FormEvent) => void;
  handleOTPChange: (e: any) => void;
  otp: React.MutableRefObject<HTMLIonInputElement | null>;
}

const OTP: React.FC<Props> = ({ otp, handleOtpSubmit, handleOTPChange }) => {
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
                      Email Verification
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonText color="medium">
                      we have sent a 4 digit code to your email
                    </IonText>
                    <form onSubmit={handleOtpSubmit}>
                      <IonInput
                        className="ionInput ion-margin-top"
                        onIonInput={handleOTPChange}
                        ref={otp}
                        fill="outline"
                        aria-label="OTP"
                        placeholder="* * * *"
                        type="number"
                        required={false}
                      ></IonInput>
                      <IonButton
                        className="ion-margin-top ion-margin-bottom"
                        type="submit"
                        expand="block"
                      >
                        Enter
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

export default OTP;
