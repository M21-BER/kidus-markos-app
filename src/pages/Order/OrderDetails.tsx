import { IonButton, IonCard, IonCardContent, IonChip, IonContent, IonIcon, IonItem, IonPage, IonText} from '@ionic/react';
import {ToolBarDetails} from '../../components/ToolBar/ToolBar';
import { useAxios } from '../../hooks/useAxios';
import { jsonCheck, url } from '../../utils/utils';
import {addCircleSharp } from 'ionicons/icons';
import ImageComponent from '../../components/UI/Image';
import "../Home/HomeDetail.css";
import ErrorFallBack from '../../components/error/ErrorFallBack/ErrorFallBack';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoaderUI from '../../components/UI/Loader/LoaderUI';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
const settings = {
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
  interval: 4000,
};
const OrderDetails: React.FC = () => {
    const {route,navigate,pushStack} =useContext(UserContext);
    const id:any =  {id:route?.id}
    const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/products/index/${id.id}`);
    const [detail1,isPending1,error1,] = useAxios(`${url}/api/shops`);
    let relatedItem:any = [];
    if(!isPending1){
     if(detail1.length !== 0){
      let first = randomInteger(0,detail1.length -1);
      let second = randomInteger(0,detail1.length -1);
      relatedItem.push(detail1[first]);   
      if(second === first){
         if(second === detail1.length -1){
          relatedItem.push(detail1[first -1]);   
         }else{
          relatedItem.push(detail1[first +1]);
         } 
      }else{
        relatedItem.push(detail1[second]);   
      }
     }
    }
    const orderProduct = ()=>{
      navigate!("addOrder",id.id,null)
    }
    const reload = async () => {
      setUpdate(true);
    };
    useEffect(()=>{
      pushStack!({path:'orderDetails',id:route?.id,info:route?.info});
    },[]);
    function randomInteger(min:number, max:number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
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
                  className = ""
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
          <div className='order-details-others'>
          {
              !isPending1 && relatedItem.length > 0?
              relatedItem.map((item:any,i:number)=>{
                return(
                 <IonCard onClick={()=>{
                  navigate!("shopDetails",item.s_product_id,null)
                 }} key={i}>
                 <IonCardContent className='ion-no-padding related-con'>
                   <IonItem lines='none'>
                    <IonChip>{item.s_product_category}</IonChip>
                    <IonText>{item.s_product_name}</IonText>
                   </IonItem>
                   <div>
                    <IonText>{item.s_product_desc}</IonText>
                   </div>
                 </IonCardContent>
               </IonCard>
                )  
               }):<div className='order-details-others-no-data'><IonText color="medium">No related product item</IonText></div>
            }

           </div>
           </div>
         </div>
         )
        }
        </IonContent>
        <div className="spacer_drawer"></div>
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
    <div className="spacer_drawer"></div>
    </IonPage>
  );
}
};

export default OrderDetails;