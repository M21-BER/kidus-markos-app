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
  handleUpdatePasswordSubmit: (e: React.FormEvent) => void;
  newPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  repeatPassword: React.MutableRefObject<HTMLIonInputElement | null>;
}

const ChangePassword: React.FC<Props> = ({
  newPassword,
  repeatPassword,
  handleUpdatePasswordSubmit,
}) => {
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
                    type="password"
                  ></IonInput>
                  <IonInput
                    className="ionInput"
                    ref={repeatPassword}
                    fill="outline"
                    labelPlacement="floating"
                    label="Repeat Password"
                    placeholder="Repeat Password"
                    type="password"
                  ></IonInput>
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
  );
};

export default ChangePassword;
