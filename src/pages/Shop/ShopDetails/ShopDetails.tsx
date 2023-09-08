import {IonPage, IonCard, IonCardContent,useIonToast, IonContent, useIonRouter} from '@ionic/react';
import {ToolBarDetails} from '../../../components/ToolBar/ToolBar';
import { useParams } from 'react-router';
import { useAxios } from '../../../hooks/useAxios';
import { url,jsonCheck } from '../../../utils/utils';
import ImageComponent from '../../../components/UI/Image';
import "../../Home/HomeDetail.css";
import { cartSharp, checkmarkCircleOutline, informationCircleOutline} from 'ionicons/icons';
import CustomSlider from '../../../components/slider/custom.slider';
import { formatDistance } from "date-fns";
import { Preferences } from '@capacitor/preferences';
import React, { useEffect, useRef, useState } from 'react';
import ColorList from './ColorList';
import Description from './Description';
import ActionControls from './ActionControls';
import CardDetailsBar from './CardDetailsBar';
import Review from './Review';
import axios from 'axios';
import { errorResponse } from '../../../utils/errorResponse';
import { useUser } from '../../../hooks/useUser';
const CART_KEY = 'KidusMarkosCart436';

const ShopDetails: React.FC = () => {
   const id:any =  useParams();
   const [detail,isPending,error,setUpdate] = useAxios(`${url}/api/shops/${id.id}`);
   let distance:any = null;
   let colors:any = null;
   const router = useIonRouter();
   const [cartExist,setCartExist] = useState<boolean>(false);
   const [selectedColor,setSelectedColor] = useState<number>(0);
   const review = useRef<null | HTMLIonInputElement>(null);
   const [present] = useIonToast();
   const [user,logged,isPendingStatus] = useUser();

   if(error){
    console.log(error); 
   }
  console.log(user);
   if(!isPending){
    distance = formatDistance(new Date(detail.product.updatedAt), new Date(),{addSuffix: true, });
    colors =  jsonCheck(detail.product.s_product_colors)? jsonCheck(detail.product.s_product_colors):[]; 
  }
   useEffect(() => {
    const checkCart = async () => {
      const cartE = await Preferences.get({ key: CART_KEY });
      if(cartE.value){
      const parse:number[] = jsonCheck(cartE.value);
      if(parse.includes(parseInt(id.id))){
        setCartExist(true)
      }
      }
    };
    checkCart();
  }, []);
  const updateColor = (colorIndex:number)=>{
  setSelectedColor(colorIndex)   
  }
  const reset= (field:React.MutableRefObject<HTMLIonInputElement | null>)=>{
    field.current?field.current.value = "":"";
  } 
  const token = ''
  const handleReview = (e:React.FormEvent)=>{
    e.preventDefault();
    const addReview = async()=>{
     try {
     const s_product_reviews = JSON.stringify({id:1,name:"name",msg:review.current?.value,reviewTime:Date.now()}); 
     const reviewPatchRes = await axios.patch(`${url}/api/shops/${id}/empty`,s_product_reviews, {
      headers: {
        'Authorization': `Basic ${token}` 
      }
     }
     );
     setUpdate(true);
     console.log(reviewPatchRes);
     Toast("Review Added Successfully",checkmarkCircleOutline);
     }catch (error) {
      const {message,status} = errorResponse(error);
      if(status && status == 401){
        Toast(message,informationCircleOutline);
      }else{
        Toast("Review not added please try again!",informationCircleOutline);
      }
     }
    }
    if(!review.current?.value){
      present({
        message: 'Please write your message first',
        duration: 3000,
        position: "bottom",
        icon:informationCircleOutline,
        color:'primary'
      });
    }else{
      addReview();
    }
    reset(review)
  }
  const addToCart = async()=>{
    try {
    const cartIDS = await Preferences.get({ key: CART_KEY });
    if(cartIDS.value){
    const ids:number[] = jsonCheck(cartIDS.value);
    ids.push(parseInt(id.id));    
    Preferences.set({ key: CART_KEY, value: JSON.stringify(ids) });
    }else{
      const new_ids:number[] = [];
      new_ids.push(parseInt(id.id));
      Preferences.set({ key: CART_KEY, value: JSON.stringify(new_ids) });
    }
    setCartExist(true);
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
  const Toast = (msg:string,icon:string)=>{
    present({
      message: msg,
      duration: 3000,
      position: "bottom",
      icon:icon,
      color:'primary'
    });
  }
   const shopping = ()=>{
     router.push('/payment')
   
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
               <IonCard className='km-detail-card-main' color='warning'>
                <IonCardContent>   
                 <CardDetailsBar distance={distance} s_product_view={detail.product.s_product_view} name={detail.product.s_product_name} price={detail.product.s_product_price}/>
                 <ActionControls cartExist={cartExist} addToCart={addToCart} shopping={shopping}/>
                 <Description desc={detail.product.s_product_desc}/>
                 <ColorList colors={colors} updateColor={updateColor} selectedColor={selectedColor} /> 
                </IonCardContent>
              </IonCard>
               <Review review={review} handleReview={handleReview} reviewList={detail.product.s_product_reviews?detail.product.s_product_reviews:[]}/>
               </div>
             </div>
             )
            }
            </IonContent>
        </IonPage>
    );
};

export default ShopDetails;

