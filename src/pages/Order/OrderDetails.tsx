import { IonContent, IonPage} from '@ionic/react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { url } from '../../utils/utils';

const OrderDetails: React.FC = () => {
    const id:any =  useParams();
    const [detail,isPending,error] = useAxios(`${url}/api/products/${id}`); 
 
    return (
        <IonPage>
            <ToolBar backButton={false}/>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default OrderDetails;