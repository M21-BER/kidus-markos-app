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
import { checkmarkCircleOutline, refreshCircle, refreshCircleOutline } from "ionicons/icons";
import "../ResetPassword/Reset.css";
import CountdownTimer from "../../components/UI/CountdownTimer";
interface Props {
  handleVerify: (e: React.FormEvent) => void;
  resetState: () => void;
  sendOTPAgain: (userEmail:any) => void;
  verify: React.MutableRefObject<HTMLIonInputElement | null>;
  userEmail:string;
}
const Verify: React.FC<Props> = ({userEmail, handleVerify, verify, sendOTPAgain,resetState }) => {
  const handleOTPChange = (e: any) => {
    if (e.detail.value.length >= 4) {
      // @ts-ignore
      verify.current.value = parseInt(e.detail.value.toString().slice(0, 4));
    }
  };
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
                      Verify Account
                    </IonTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonText color="medium">
                    We have sent a 4 digit code to your email {sliceEmail(userEmail)}
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
                      <IonButton
                        onClick={resetState}
                        className="ion-margin-top"
                        type="button"
                        expand="block"
                        fill="clear"
                        style={{textTransform:'lowercase'}}
                      >
                        <span  style={{textTransform:'uppercase'}}>S</span>ign up Again
                        <IonIcon icon={refreshCircle} slot="start" />
                      </IonButton>
                      <IonText className="ion-margin-top" color="medium">
                      <CountdownTimer
                      totalSec={120 * 1000}
                      task={() => {
                        if(userEmail){
                          sendOTPAgain(userEmail);
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

export default Verify;
