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
import { useRef, useState } from "react";
import { Keyboard } from '@capacitor/keyboard';
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
  const [formPosition, setFormPosition] = useState<object>({});
  const form = useRef<HTMLDivElement | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const formHeight = (form.current?.offsetTop! + form.current?.offsetHeight!);
  const registerInputFocus = (elementHeight:any,input:any)=>{
    if(input && formHeight && input >= (formHeight - keyboardHeight !== 0?keyboardHeight:((formHeight*44)/100) +4)){
      setFormPosition({top:`-${input - elementHeight - 100}px`})
     }
  }
  Keyboard.addListener('keyboardDidShow', info => {
    keyboardHeight === 0 && setKeyboardHeight(info.keyboardHeight);
  });

  Keyboard.addListener('keyboardDidHide', () => {
   setFormPosition({top:0})
  });
  return (
    <IonContent  className="ion-padding" id="globe">
      <div ref={form}  className="form-app" style={formPosition}>
        <div className="form-app-core form-app-core-register">
          <h3>Create Account</h3>
          <IonText color="medium">
            Register with us to get access to exclusive content and feature
          </IonText>
          <form onSubmit={handleSubmit}>
            <IonInput
              onClick={()=>{registerInputFocus(first_name.current?.offsetHeight!,(first_name.current?.offsetTop! + first_name.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(first_name.current?.offsetHeight!,(first_name.current?.offsetTop! + first_name.current?.offsetHeight!))}}
              clearInput={true}
              ref={first_name}
              name="first_name"
              fill="outline"
              labelPlacement="floating"
              label="First Name"
              placeholder="First Name"
              type="text"
              className="ion-first_name ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
              onClick={()=>{registerInputFocus(last_name.current?.offsetHeight!,(last_name.current?.offsetTop! + last_name.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(last_name.current?.offsetHeight!,(last_name.current?.offsetTop! + last_name.current?.offsetHeight!))}}
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
             onClick={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
             onIonFocus={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
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
             onClick={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
             onIonFocus={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
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
             onClick={()=>{registerInputFocus(password.current?.offsetHeight!,(password.current?.offsetTop! + password.current?.offsetHeight!))}}
             onIonFocus={()=>{registerInputFocus(password.current?.offsetHeight!,(password.current?.offsetTop! + password.current?.offsetHeight!))}}
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
             onClick={()=>{registerInputFocus(confirm_password.current?.offsetHeight!,(confirm_password.current?.offsetTop! + confirm_password.current?.offsetHeight!))}}
             onIonFocus={()=>{registerInputFocus(confirm_password.current?.offsetHeight!,(confirm_password.current?.offsetTop! + confirm_password.current?.offsetHeight!))}}
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
