import { IonButton, IonCard, IonCardContent, useIonRouter, IonContent, IonIcon, IonPage, IonText} from '@ionic/react';
import {ToolBarDetails} from '../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { jsonCheck, url } from '../../utils/utils';
import {addCircleSharp } from 'ionicons/icons';
import ImageComponent from '../../components/UI/Image';
import CustomSlider from '../../components/slider/custom.slider';
import "../Home/HomeDetail.css";

const OrderDetails: React.FC = () => {
    const id:any =  useParams();
    const router = useIonRouter();
    const [detail,isPending,error] = useAxios(`${url}/api/products/${id.id}`);
    const orderProduct = ()=>{
      router.push(`/addOrder/${id.id}`)
    }
    if(!isPending){
    // console.log(detail);
    }
    return (
        <IonPage>
        <ToolBarDetails />
        <IonContent className="ion-no-padding">
         {!isPending && 
         (
          <div className='shop-details'>
          <CustomSlider>
            {
               jsonCheck(detail.product.product_images).map((image:any, index:number) => {
                return (
                  <ImageComponent 
                  key={index}
                  src={image.url}
                  hash={image.hash}
                  label={detail.product.product_name}
                  />
                )
              })
            }
          </CustomSlider>    
          <div className='km-detail-card'>
           <IonCard className='km-detail-card-main' color='warning'>
            <IonCardContent>
            <div className='km-card-header'>
              <h4>{detail.product.product_name}</h4>
              <p>{detail.product.product_category}</p>
            </div>
            <div className='km-btns'>
            <IonButton onClick={orderProduct}>
              <IonIcon icon={addCircleSharp}/>
              <IonText>&nbsp; Add Order</IonText>
              </IonButton>
            </div>
             <div className='km-card-content'>
             <p>{detail.product.product_desc}</p>
             </div>
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

export default OrderDetails;