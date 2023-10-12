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
import LoaderUI from '../../components/UI/Loader/LoaderUI';
import { useContext } from 'react';
import { UserContext } from '../../context/AuthContext';
const settings = {
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
  interval: 4000,
};
const OrderDetails: React.FC = () => {
    const {route,navigate} =useContext(UserContext);
    const id:any =  {id:route?.id}
    const router = useIonRouter();
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/products/index/${id.id}`);
    const orderProduct = ()=>{
      navigate!("addOrder",id.id,null)
    }
    const reload = async () => {
      setUpdate(true);
  };
  if(!isPending){
    if (error) {
      return (
        <IonPage>
        <ToolBarDetails defaultValue={{path:"Home",id:null,info:null}} title="Order Details"/>
        <ErrorFallBack className='m_error_top' error={error} reload={reload} />
        </IonPage>
      );
    } else {
    return (
        <IonPage>
         <ToolBarDetails defaultValue={{path:"Home",id:null,info:null}} title={!isPending && detail && detail.item && detail.item.product_name}/>
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
}else{
  return (
    <IonPage>
      <ToolBarDetails defaultValue={{path:"Home",id:null,info:null}} title="Order Details"/>
    <IonContent>
    <LoaderUI/>
    </IonContent>
    </IonPage>
  );
}
};

export default OrderDetails;