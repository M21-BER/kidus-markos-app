import {IonPage, IonButton, IonCard, IonCardContent,useIonToast, IonContent, IonIcon} from '@ionic/react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { url,jsonCheck } from '../../utils/utils';
import { nFormatter } from '../../utils/numberFormatter';
import ImageComponent from '../../components/UI/Image';
import "./Shops.css";
import { cartSharp,addSharp, timeSharp, eyeSharp, checkmarkDoneCircleSharp } from 'ionicons/icons';
import CustomSlider from '../../components/slider/custom.slider';
import { formatDistance } from "date-fns";
import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';
const CART_KEY = 'KidusMarkosCart436';

const ShopDetails: React.FC = () => {
   const id:any =  useParams();
   const [detail,isPending,error] = useAxios(`${url}/api/shops/${id.id}`);
   let distance:any = null;
   const [cartExist,setCartExist] = useState<boolean>(true)
   const [present] = useIonToast();
   if(error){
    console.log(error); 
   }
   if(!isPending){
    distance = formatDistance(new Date(detail.product.updatedAt), new Date(),{addSuffix: true, });
   }
   useEffect(() => {
    const checkCart = async () => {
      const cartE = await Preferences.get({ key: CART_KEY });
      if(cartE.value){
      const parse = jsonCheck(cartE.value);
      if(parse.includes(id)){
       setCartExist(false)
      }
      }
    };
    checkCart();
  }, []);
   const addToCart = async()=>{
    try {
    const cartIDS = await Preferences.get({ key: CART_KEY });
    if(cartIDS.value){
    const ids:any = jsonCheck(cartIDS.value);
    ids.push(id);    
    Preferences.set({ key: CART_KEY, value: JSON.stringify(ids) });
    }else{
      const new_ids:any = [];
      new_ids.push(id);
      Preferences.set({ key: CART_KEY, value: JSON.stringify(new_ids) });
    }
      present({
        message: 'Item have been Added to Cart 🗸 ',
        duration: 3000,
        position: "bottom",
        icon:cartSharp,
        color:'primary'
      });

    } catch (error) {
      console.log("error");
    }
    
   }
   const shopping = ()=>{
   console.log("to shopping");
   
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
                <IonCardContent>
                <div className='km-card-header'>
                  <small><IonIcon icon={timeSharp} color='primary'/> {distance.substring(distance.indexOf(distance.match(/\d+/g)))}</small>
                  <small><IonIcon icon={eyeSharp} color='primary'/> {nFormatter(detail.product.s_product_view)}</small>
                  <h4>{detail.product.s_product_name}</h4>
                  <p>ETB {detail.product.s_product_price}</p>
                </div>
                <div className='km-btns'>
                    {cartExist? <IonButton onClick={addToCart} fill='outline' disabled={cartExist}><IonIcon icon={checkmarkDoneCircleSharp}/>Item in Cart</IonButton>: <IonButton onClick={addToCart} fill='outline'><IonIcon icon={addSharp}/>Add to Cart</IonButton>}
                    <IonButton onClick={shopping}><IonIcon icon={cartSharp}/>Shop</IonButton>
                </div>
                 <div className='km-card-content'>
                 <p>{detail.product.s_product_desc}</p>
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

export default ShopDetails;

