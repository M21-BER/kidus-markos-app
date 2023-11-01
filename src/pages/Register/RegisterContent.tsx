import {
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonText,
} from "@ionic/react";
import { addCircleOutline, eye, eyeOff } from "ionicons/icons";
import "./Radio.css";
import { useState } from "react";
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  first_name: React.MutableRefObject<HTMLIonInputElement | null>;
  last_name: React.MutableRefObject<HTMLIonInputElement | null>;
  gender: React.MutableRefObject<HTMLIonRadioGroupElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
  password: React.MutableRefObject<HTMLIonInputElement | null>;
  confirm_password: React.MutableRefObject<HTMLIonInputElement | null>;
}

const RegisterContent: React.FC<Props> = ({
  handleSubmit,
  first_name,
  last_name,
  gender,
  email,
  phone_number,
  password,
  confirm_password,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const registerInput = (input:string,state:number)=>{
  switch(input){
  case 'phone_number':
    phone_number.current?.scrollIntoView();
    break;
  }
  }
  return (
    <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core form-app-core-register">
          <h3>Create Account</h3>
          <IonText color="medium">
            Register with us to get access to exclusive content and feature
          </IonText>
          <form onSubmit={handleSubmit}>
            <IonInput
              clearInput={true}
              ref={first_name}
              name="first_name"
              fill="outline"
              labelPlacement="floating"
              label="First Name"
              placeholder="First Name"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
             clearInput={true}
              ref={last_name}
              name="last_name"
              fill="outline"
              labelPlacement="floating"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonInput>
            <IonRadioGroup
              name="gender"
              value="Male"
              ref={gender}
              className="ion-margin-top custom-radio-km"
            >
              <IonLabel>Sex: </IonLabel>
              <IonRadio value="Male">
                <span className="sm">M</span>
                <span className="lg">Male</span>
              </IonRadio>
              <IonRadio value="Female">
                <span className="sm">F</span>
                <span className="lg">Female</span>
              </IonRadio>
            </IonRadioGroup>
            <IonInput
             clearInput={true}
              ref={email}
              name="email"
              fill="outline"
              labelPlacement="floating"
              label="Email"
              placeholder="user@kidusmarkos.com"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
             onIonFocus={()=>{registerInput("phone_number",0)}}
            //  onIonBlur={()=>{registerInput("phone_number",1)}}
             clearInput={true}
              ref={phone_number}
              name="phone_number"
              fill="outline"
              labelPlacement="floating"
              label="Phone Number"
              placeholder="Phone Number"
              type="number"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
             clearInput={true}
              ref={password}
              name="password"
              fill="outline"
              labelPlacement="floating"
              label="Password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
             clearInput={true}
              ref={confirm_password}
              name="confirm-password"
              fill="outline"
              labelPlacement="floating"
              label="Confirm Password"
              placeholder="confirm password"
              type={showPassword ? "text" : "password"}
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <p id="password-icon-parent">
              <IonIcon
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                id="password-icon"
                color="medium"
                icon={showPassword ? eye : eyeOff}
              />
              <span>Show Password</span>
            </p>
            <IonButton className="ion-margin-top" type="submit" expand="block">
              Sign up
              <IonIcon icon={addCircleOutline} slot="end" />{" "}
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};

export default RegisterContent;
