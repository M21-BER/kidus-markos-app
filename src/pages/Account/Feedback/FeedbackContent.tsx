import { IonInput, IonButton, IonIcon, IonContent, IonTextarea } from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import "../../Register/Radio.css";
import { Keyboard } from "@capacitor/keyboard";
import { useState, useRef } from "react";
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  full_name: React.MutableRefObject<HTMLIonInputElement | null>;
  rating: React.MutableRefObject<HTMLIonInputElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  feed_back: React.MutableRefObject<HTMLIonTextareaElement | null>;
}

const FeedbackContent: React.FC<Props> = ({
  handleSubmit,
  full_name,
  rating,
  email,
  feed_back,
}) => {
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
          <h3 style={{marginBottom:'40px'}}>
            <span>Customer Feedback</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <IonInput
             onIonFocus={()=>{registerInputFocus(full_name.current?.offsetHeight!,(full_name.current?.offsetTop! + full_name.current?.offsetHeight!))}}
             clearInput={true}
              ref={full_name}
              name="full_name"
              fill="outline"
              labelPlacement="stacked"
              label="Full Name"
              placeholder="Full Name"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonInput
              onIonFocus={()=>{registerInputFocus(rating.current?.offsetHeight!,(rating.current?.offsetTop! + rating.current?.offsetHeight!))}}
              clearInput={true}
              ref={rating}
              name="rating"
              fill="outline"
              labelPlacement="stacked"
              label="Rating"
              placeholder="Rating"
              type="number"
              step="0.1"
              min={1}
              max={10}
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonInput>

            <IonInput
              onIonFocus={()=>{registerInputFocus(email.current?.offsetHeight!,(email.current?.offsetTop! + email.current?.offsetHeight!))}}
              clearInput={true}
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
            <IonTextarea
              onIonFocus={()=>{registerInputFocus(feed_back.current?.offsetHeight!,(feed_back.current?.offsetTop! + feed_back.current?.offsetHeight!))}}
              clearOnEdit={true}
              style={{height:"100px"}}
              ref={feed_back}
              name="feed_back"
              fill="outline"
              labelPlacement="stacked"
              label="Feedback"
              placeholder="write something here..."
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonTextarea>
            <IonButton  className="ion-margin-top" type="submit" expand="block">
              <span>Submit Feedback</span>
              <IonIcon icon={sendOutline} slot="start" />
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};

export default FeedbackContent;
