import {
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
  IonRadio,
  IonRadioGroup,
  IonLabel,

} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import "../../Register/Radio.css";
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  first_name: React.MutableRefObject<HTMLIonInputElement | null>;
  last_name: React.MutableRefObject<HTMLIonInputElement | null>;
  gender: React.MutableRefObject<HTMLIonRadioGroupElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
  password: React.MutableRefObject<HTMLIonInputElement | null>;
  user:any
}

const UpdateAccountContent: React.FC<Props> = ({
  handleSubmit,
  first_name,
  last_name,
  gender,
  email,
  phone_number,
  password,
  user
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
              value={user.first_name?user.first_name:""}
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
              value={user.last_name?user.last_name:""}
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
              value={user.gender?user.gender:"Male"}
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
              value={user.email?user.email:""}
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
              value={user.phone_number?user.phone_number:""}
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
