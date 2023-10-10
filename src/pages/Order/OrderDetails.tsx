import { IonButton, IonCard, IonCardContent, useIonRouter, IonContent, IonIcon, IonPage, IonText} from '@ionic/react';
import {ToolBarDetails} from '../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { jsonCheck, url } from '../../utils/utils';
import {addCircleSharp } from 'ionicons/icons';
import ImageComponent from '../../components/UI/Image';
import "../Home/HomeDetail.css";
import ErrorFallBack from '../../components/error/ErrorFallBack/ErrorFallBack';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const settings = {
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
  interval: 4000,
};
const OrderDetails: React.FC = () => {
    const id:any =  useParams();
    const router = useIonRouter();
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/products/index/${id.id}`);
    const orderProduct = ()=>{
      router.push(`/addOrder/${id.id}`)
    }
    
    const reload = async () => {
      setUpdate(true);
  };
    if (error) {
      return (
        <IonPage>
          <ToolBarDetails defaultValue='/app/home/order' title="Order Details"/>
          <ErrorFallBack className='m_error_top' error={error} reload={reload} />
        </IonPage>
      );
    } else {
    return (
        <IonPage>
         <ToolBarDetails defaultValue='/app/home/order' title={!isPending && detail && detail.item && detail.item.product_name}/>
        <IonContent className="ion-no-padding">
         {!isPending && 
         (
          <div className='shop-details'>
           <Carousel {...settings} autoPlay>
            {
               jsonCheck(detail.item.product_images).map((image:any, index:number) => {
                return (
                  <div key={index}>
                  <ImageComponent 
                  src={image.url}
                  hash={image.hash}
                  label={detail.item.product_name}
                  />
                {/* <p className="legend">Kidus Markos WoodWorks </p> */}
               </div>
                )
              })
            }
          </Carousel>
 
          <div className='km-detail-card'>
           <IonCard className='km-detail-card-main' color='warning'>
            <IonCardContent>
            <div className='km-card-header'>
              <h4>{detail.item.product_name}</h4>
              <p>{detail.item.product_category}</p>
            </div>
            <div className='km-btns'>
            <IonButton onClick={orderProduct}>
              <IonIcon icon={addCircleSharp}/>
              <IonText>&nbsp; Add Order</IonText>
              </IonButton>
            </div>
             <div className='km-card-content'>
             <p>{detail.item.product_desc}</p>
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
  }
};

export default OrderDetails;