import { IonInput, IonButton, IonIcon, IonContent } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import "../../Register/Radio.css";
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  full_name: React.MutableRefObject<HTMLIonInputElement | null>;
  rating: React.MutableRefObject<HTMLIonInputElement | null>;
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  feed_back: React.MutableRefObject<HTMLIonInputElement | null>;
}

const FeedbackContent: React.FC<Props> = ({
  handleSubmit,
  full_name,
  rating,
  email,
  feed_back,
}) => {
  return (
    <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core">
          <h3 style={{marginBottom:'40px'}}>
            <span>Customer Feedback</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <IonInput
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
              ref={rating}
              name="rating"
              fill="outline"
              labelPlacement="stacked"
              label="Rating"
              placeholder="Rating"
              type="number"
              step="0.1"
              className="ion-margin-top ion-margin-bottom"
              required={false}
            ></IonInput>

            <IonInput
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
              ref={feed_back}
              name="feed_back"
              fill="outline"
              labelPlacement="stacked"
              label="Feedback"
              placeholder="write here"
              type="text"
              className="ion-margin-top"
              required={false}
            ></IonInput>
            <IonButton className="ion-margin-top" type="submit" expand="block">
              <span>Submit Feedback</span>
              <IonIcon icon={addCircleOutline} slot="end" />
            </IonButton>
          </form>
        </div>
      </div>
    </IonContent>
  );
};

export default FeedbackContent;
