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
  otp: React.MutableRefObject<HTMLIonInputElement | null>;
}

const OTP: React.FC<Props> = ({ otp, handleOtpSubmit }) => {
  return (
    <IonContent scrollY={true} className="ion-padding">
      <IonGrid fixed>
        <IonRow class="ion-justify-content-center">
          <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
            <IonCard color="warning">
              <IonCardHeader>
                <IonTitle>Email Verification</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText color="medium">
                  we have sent a 4 digit code to your email
                </IonText>
                <form onSubmit={handleOtpSubmit}>
                  <IonInput
                    className="ionInput"
                    ref={otp}
                    fill="outline"
                    labelPlacement="floating"
                    label="OTP"
                    placeholder="4 digit code"
                    type="number"
                  ></IonInput>
                  <IonButton
                    className="ion-margin-top"
                    type="submit"
                    expand="block"
                  >
                    Enter
                  </IonButton>
                  <p>Didn't recieve code?</p>{" "}
                </form>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default OTP;
