import {
  IonContent,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import { logInOutline, eyeOff, eye } from "ionicons/icons";
import Logo from "../../assets/Logo.png";
import "./Login.css";
import { useState } from "react";
interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  clientIdentity: React.MutableRefObject<HTMLIonInputElement | null>;
  password: React.MutableRefObject<HTMLIonInputElement | null>;
  stat: boolean;
  navigate:any
}
const LoginContent: React.FC<Props> = ({
  handleSubmit,
  clientIdentity,
  password,
  stat,
  navigate
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLoginAction = (btn: number) => {
    if (btn === 1) {
      navigate('Register',null,null)
    } else if (btn === 2) {
      navigate('ResetPassword',null,null)
    }
  };

  return (
    <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core form-app-core-login">
          <section>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                <div className="ion-text-center ion-padding">
                  <img src={Logo} loading="eager" alt="Kidus Markos Logo" width="45%" />
                </div>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol size="13" sizeMd="8" sizeLg="6" sizeXl="4">
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonTitle></IonTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleSubmit}>
                      <IonInput
                        clearInput={true}
                        className="ionInput"
                        ref={clientIdentity}
                        fill="outline"
                        labelPlacement="floating"
                        label="User"
                        placeholder="Enter Email or Phone Number"
                        type="text"
                      ></IonInput>
                      <IonInput
                        clearInput={true}
                        ref={password}
                        className="ion-margin-top ionInput"
                        fill="outline"
                        labelPlacement="floating"
                        label="Password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
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
                      <IonButton
                        className="ion-margin-top"
                        type="submit"
                        expand="block"
                      >
                        Sign In <IonIcon icon={logInOutline} slot="end" />
                      </IonButton>
                      <div className="pass-res">
                        <IonText
                          onClick={() => {
                            handleLoginAction(1);
                          }}
                        >
                          {stat ? "Verify" : "Sign up"}
                        </IonText>
                        <IonText
                          onClick={() => {
                            handleLoginAction(2);
                          }}
                        >
                          Forget Password?
                        </IonText>
                      </div>
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </section>
        </div>
      </div>
    </IonContent>
  );
};

export default LoginContent;
