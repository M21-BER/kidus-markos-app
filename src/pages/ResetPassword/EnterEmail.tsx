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
    <IonContent scrollY={true} className="ion-padding">
      <IonGrid fixed>
        <IonRow class="ion-justify-content-center">
          <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
            <IonCard color="warning">
              <IonCardHeader>
                <IonText color="medium">
                  Enter Email Address to Reset Password
                </IonText>
              </IonCardHeader>
              <IonCardContent>
                <form onSubmit={handleEmailSubmit}>
                  <IonInput
                    className="ionInput"
                    ref={email}
                    fill="outline"
                    labelPlacement="floating"
                    label="Email"
                    placeholder="enter email address"
                    type="text"
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
    </IonContent>
  );
};

export default EnterEmail;
