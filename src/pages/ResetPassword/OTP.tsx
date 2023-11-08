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
import CountdownTimer from "../../components/UI/CountdownTimer";
interface Props {
  handleOtpSubmit: (e: React.FormEvent) => void;
  handleOTPChange: (e: any) => void;
  otp: React.MutableRefObject<HTMLIonInputElement | null>;
  sendOTP:(value:any)=>void;
  userEmail:string;
}

const OTP: React.FC<Props> = ({userEmail, sendOTP, otp, handleOtpSubmit, handleOTPChange }) => {
  const sliceEmail = (a:any) => {
    let email = "";
    let provider = false;
    Array.from(a).forEach((i, index) => {
      if (i === "@") {
        provider = true;
      }
      if (!provider) {
        if (index === 0 || index === 1) {
          email += i;
        } else {
          email += "*";
        }
      } else {
        email += i;
      }
    });
    return email;
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
                      Email Verification
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonText color="medium">
                      We have sent a 4 digit code to your email {sliceEmail(userEmail)}
                    </IonText>
                    <form onSubmit={handleOtpSubmit}>
                      <IonInput
                        clearInput={true}
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
                      <CountdownTimer
                      totalSec={120 * 1000}
                      task={() => {
                        if(userEmail){
                          sendOTP(userEmail);
                        }
                      }}
                      />

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
