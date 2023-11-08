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
} from "@ionic/react";
interface Props {
  handlePhoneNumberSubmit: (e: React.FormEvent) => void;
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
}

const EnterPhoneNumber: React.FC<Props> = ({ phone_number, handlePhoneNumberSubmit }) => {
  function checkPhoneNumber(input:any) {
    const digit = "+-0123456789";
    let found = [];
    let inputDigits = input.toString();
  
    for (let id = 0; id < inputDigits.length; id++) {
      if (digit.includes(inputDigits[id])) {
        found.push(true);
      } else {
        found.push(false);
      }
    }
    if (found.includes(false)) {
      return false;
    } else {
      return true;
    }
  }
  
  return (
    <IonContent scrollY={true} className="ion-no-padding">
      <div className="form-app reset-email-screen-center">
        <div>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonText color="medium" className="ion-text-center">
                     Account Verification
                    </IonText>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handlePhoneNumberSubmit}>
                      <IonInput
                        clearInput={true}
                        className="ionInput ion-margin-top ion-margin-bottom"
                        ref={phone_number}
                        fill="outline"
                        aria-label="phone_number"
                        placeholder="Phone Number"
                        type="number"
                        required={false}
                      ></IonInput>
                      <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                      >
                        Verify
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

export default EnterPhoneNumber;
