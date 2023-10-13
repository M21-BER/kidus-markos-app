import {
  IonInput,
  IonButton,
  IonIcon,
  IonContent,
  useIonToast,
} from "@ionic/react";
import {  informationCircleOutline, saveOutline } from "ionicons/icons";
import Toggle from "../../../components/UI/Toggle/Toggle";
import { useState } from "react";
import { Toast } from "../../../utils/CustomToast";
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
  return (
    <IonContent className="ion-padding">
      <div className="form-app">
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
              disabled={toggle}
              value={user.phone_number ? user.phone_number : ""}
              ref={phone_number}
              name="phone_number"
              fill="outline"
              labelPlacement="stacked"
              label="Phone Number"
              placeholder="+251---"
              type="text"
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
