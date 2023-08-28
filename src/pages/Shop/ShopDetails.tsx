import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonPage} from '@ionic/react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { url,jsonCheck } from '../../utils/utils';
import ImageComponent from '../../components/UI/Image';
import "./Shops.css";
import { images } from 'ionicons/icons';
import CustomSlider from '../../components/slider/custom.slider';

const ShopDetails: React.FC = () => {
   const id:any =  useParams();
   const [detail,isPending,error] = useAxios(`${url}/api/shops/${id.id}`); 
   if(error){
    console.log(error); 
   }
    return (
        <IonPage>
            <ToolBar backButton={false}/>
            <IonContent className="ion-no-padding">
             {!isPending && 
             (
             <div className='shop-details'>
              <CustomSlider>
                {
                   jsonCheck(detail.product.s_product_images).map((image:any, index:number) => {
                    return (
                      <ImageComponent 
                      key={index}
                      src={image.url}
                      hash={image.hash}
                      label={detail.product.s_product_name}
                      />
                    )
                  })
                }
              </CustomSlider>    
               <div className='km-detail-card'>
               <IonCard className='km-detail-card-main'>
                <IonCardHeader>
                  <IonCardTitle>Hello</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonButton><IonIcon icon=''/> Shop</IonButton>
                    <IonButton><IonIcon icon=''/>Call</IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
               </div>
             </div>
             )
            }
            </IonContent>
        </IonPage>
    );
};

export default ShopDetails;