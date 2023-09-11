import {
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonContent,
  IonTitle,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonHeader,
} from "@ionic/react";
import { logInOutline, createOutline } from "ionicons/icons";
import "../../Register/Radio.css";
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  first_name: React.MutableRefObject<HTMLIonInputElement | null>;
  last_name: React.MutableRefObject<HTMLIonInputElement | null>;
  gender: React.MutableRefObject<HTMLIonRadioGroupElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
  password: React.MutableRefObject<HTMLIonInputElement | null>;
}

const UpdateAccountContent: React.FC<Props> = ({
  handleSubmit,
  first_name,
  last_name,
  gender,
  email,
  phone_number,
  password,
}) => {
  return (
    <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core">
          <h3>
            <IonIcon icon={createOutline} />
            <span>Update Account</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <IonInput
              ref={first_name}
              name="first_name"
              fill="outline"
              labelPlacement="stacked"
              label="First Name"
              placeholder="First Name"
              type="text"
              className="ion-margin-top"
              required
            ></IonInput>
            <IonInput
              ref={last_name}
              name="last_name"
              fill="outline"
              labelPlacement="stacked"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              className="ion-margin-top ion-margin-bottom"
              required
            ></IonInput>
            <IonRadioGroup
              name="gender"
              value="Male"
              ref={gender}
              className="ion-margin-top custom-radio-km"
            >
              <IonLabel>Sex: </IonLabel>
              <IonRadio value="Male">
                <span>Male</span>
              </IonRadio>
              <IonRadio value="Female">
                <span>Female</span>
              </IonRadio>
            </IonRadioGroup>
            <IonInput
              ref={email}
              name="email"
              fill="outline"
              labelPlacement="stacked"
              label="Email"
              placeholder="user@kidusmarkos.com"
              type="email"
              className="ion-margin-top"
              required
            ></IonInput>
            <IonInput
              ref={phone_number}
              name="phone_number"
              fill="outline"
              labelPlacement="stacked"
              label="Phone Number"
              placeholder="+251---"
              type="text"
              className="ion-margin-top"
              required
            ></IonInput>
            <IonInput
              ref={password}
              name="password"
              fill="outline"
              labelPlacement="stacked"
              label="Password"
              placeholder="password"
              type="password"
              className="ion-margin-top"
              required
            ></IonInput>
            <IonButton className="ion-margin-top" type="submit" expand="block">
              <span> Update Account</span>
              <IonIcon icon={createOutline} slot="end" />
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};

export default UpdateAccountContent;
