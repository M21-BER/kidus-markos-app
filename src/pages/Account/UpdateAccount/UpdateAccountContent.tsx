import {
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
  useIonToast,
} from "@ionic/react";
import {  informationCircleOutline, saveOutline } from "ionicons/icons";
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
            <IonInput
              onIonFocus={()=>{registerInputFocus(first_name.current?.offsetHeight!,(first_name.current?.offsetTop! + first_name.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              value={user.first_name ? user.first_name : ""}
              ref={first_name}
              name="first_name"
              fill="outline"
              labelPlacement="stacked"
              label="First Name"
              placeholder="First Name"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
              onIonFocus={()=>{registerInputFocus(last_name.current?.offsetHeight!,(last_name.current?.offsetTop! + last_name.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              value={user.last_name ? user.last_name : ""}
              ref={last_name}
              name="last_name"
              fill="outline"
              labelPlacement="stacked"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonInput>
            <IonInput
              onIonFocus={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              value={user.email ? user.email : ""}
              ref={email}
              name="email"
              fill="outline"
              labelPlacement="stacked"
              label="Email"
              placeholder="user@kidusmarkos.com"
              type="email"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
              onIonFocus={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
              clearInput={true}
              disabled={toggle}
              value={user.phone_number ? user.phone_number : ""}
              ref={phone_number}
              name="phone_number"
              fill="outline"
              labelPlacement="stacked"
              label="Phone Number"
              placeholder="Phone Number"
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
