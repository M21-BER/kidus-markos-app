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
  handleEmailSubmit: (e: React.FormEvent) => void;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
}

const EnterEmail: React.FC<Props> = ({ email, handleEmailSubmit }) => {
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
                      Enter email for password reset
                    </IonText>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleEmailSubmit}>
                      <IonInput
                        className="ionInput ion-margin-top ion-margin-bottom"
                        ref={email}
                        fill="outline"
                        aria-label="Email"
                        placeholder="enter email address"
                        type="text"
                        required={false}
                      ></IonInput>
                      <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                      >
                        Submit
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

export default EnterEmail;
