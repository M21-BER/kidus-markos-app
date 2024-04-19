import {
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
  useIonToast,
} from "@ionic/react";
import {  informationCircleOutline, saveOutline,arrowForward } from "ionicons/icons";
import Toggle from "../../../components/UI/Toggle/Toggle";
import { useRef, useState } from "react";
import { Toast } from "../../../utils/CustomToast";
import { Keyboard } from '@capacitor/keyboard';
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  first_name: React.MutableRefObject<HTMLIonInputElement | null>;
  last_name: React.MutableRefObject<HTMLIonInputElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
  user: any;
}
const UpdateAccountContent: React.FC<Props> = ({
  handleSubmit,
  first_name,
  last_name,
  email,
  phone_number,
  user,
}) => {
  const [toggle,setToggle] = useState<boolean>(true);
  const [presentIonToast] = useIonToast();
  const [formPosition, setFormPosition] = useState<object>({});
  const form = useRef<HTMLDivElement | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const registerInputFocus = (elementHeight:any,input:any)=>{
      var formHeight = (form.current?.offsetTop! + form.current?.offsetHeight!);
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
    <IonContent className="ion-padding">
        <div ref={form} className="form-app" style={formPosition}>
        
        <div className="form-app-core">
          <h3 style={{marginBottom:'40px',position:'relative'}}>
            <span>Update Account</span>
            <div style={{position:'absolute',right:0}}>
            <Toggle change={()=>{
              if(!toggle){
               Toast(presentIonToast,"update disabled",informationCircleOutline,500);       
              }else{
                Toast(presentIonToast,"update enabled",informationCircleOutline,500);   
              }
              setToggle(!toggle)}}
              />
            </div>
          </h3>
          <form onSubmit={handleSubmit}>
            <p className={`${!toggle?"update-account-text update-account-text-on":"update-account-text update-account-text-off"}`}>Current Full Name <IonIcon icon={arrowForward}/> {user.first_name}</p>
            <IonInput
              onClick={()=>{registerInputFocus(first_name.current?.offsetHeight!,(first_name.current?.offsetTop! + first_name.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(first_name.current?.offsetHeight!,(first_name.current?.offsetTop! + first_name.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              ref={first_name}
              name="first_name"
              fill="outline"
              placeholder="Change First Name Here"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
             <p className={`${!toggle?"update-account-text update-account-text-on":"update-account-text update-account-text-off"}`}>Current Last Name <IonIcon icon={arrowForward}/> {user.last_name}</p>
            <IonInput
              onClick={()=>{registerInputFocus(last_name.current?.offsetHeight!,(last_name.current?.offsetTop! + last_name.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(last_name.current?.offsetHeight!,(last_name.current?.offsetTop! + last_name.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              ref={last_name}
              name="last_name"
              fill="outline"
              placeholder="Change Last Name Here"
              type="text"
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonInput>
             <p className={`${!toggle?"update-account-text update-account-text-on":"update-account-text update-account-text-off"}`}>Current Email <IonIcon icon={arrowForward}/> {user.email}</p>
            <IonInput
              onClick={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              ref={email}
              name="email"
              fill="outline"
              placeholder="Change Email Here"
              type="email"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <p className={`${!toggle?"update-account-text update-account-text-on":"update-account-text update-account-text-off"}`}>Current Phone Number <IonIcon icon={arrowForward}/> {user.phone_number}</p>
            <IonInput
              onClick={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
              onIonFocus={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              ref={phone_number}
              name="phone_number"
              fill="outline"
              placeholder="Change Phone Number Here"
              type="number"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonButton className="ion-margin-top" type="submit" expand="block">
              <span>Save</span>
              <IonIcon icon={saveOutline} slot="start" />
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};

export default UpdateAccountContent;
