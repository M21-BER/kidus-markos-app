import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const OrderDetailSkeleton: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default OrderDetailSkeleton;