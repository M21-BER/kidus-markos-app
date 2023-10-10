import { IonContent, IonPage, IonText } from '@ionic/react';
import { PacmanLoader } from 'react-spinners';
import './Loader.css'
const Loader: React.FC = () => {

    return (
        <IonPage>
        <IonContent>
        <div className="loader">
        <div>
        <PacmanLoader
          color="rgba(54,23,5,0.8)"
          loading={true}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.8}
        />
        <IonText className='loader-text'>Loading...</IonText>
        </div>
      </div>
        </IonContent>
    </IonPage>
    );
};

export default Loader;