import {
  IonPage,
  IonCard,
  IonCardContent,
  useIonToast,
  IonContent,
} from "@ionic/react";
import { ToolBarDetails } from "../../../components/ToolBar/ToolBar";
import { useAxios } from "../../../hooks/useAxios";
import { url, jsonCheck, CART_KEY, failMessage } from "../../../utils/utils";
import ImageComponent from "../../../components/UI/Image";
import "../../Home/HomeDetail.css";
import {
  cartSharp,
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { formatDistance } from "date-fns";
import { Preferences } from "@capacitor/preferences";
import React, { useContext, useEffect, useRef, useState } from "react";
import ColorList from "./ColorList";
import Description from "./Description";
import ActionControls from "./ActionControls";
import CardDetailsBar from "./CardDetailsBar";
import Review from "./Review";
import axios from "axios";
import { errorResponse } from "../../../utils/errorResponse";
import { Toast } from "../../../utils/CustomToast";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import { UserContext } from "../../../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoaderUI from "../../../components/UI/Loader/LoaderUI";
import { watched } from "./ShopDetailView";
import { Keyboard } from '@capacitor/keyboard';
const settings = {
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
  interval: 4000,
};
const ShopDetails: React.FC = () => {
  const { user, isAuthed,setShopPayment,setShopColor,route,navigate,pushStack } = useContext(UserContext);
  const id: any = {id:route?.id};
  const [detail, isPending, error, setUpdate] = useAxios(
    `${url}/api/shops/index/${id.id}`
  );
  let distance: any = null;
  let colors: any = null;
  const [cartExist, setCartExist] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const review = useRef<null | HTMLIonInputElement>(null);
  const ShopDetailsPage = useRef<HTMLDivElement | null>(null);
  const [presentIonToast] = useIonToast();
  const [formPosition, setFormPosition] = useState<object>({});
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  
  const registerInputFocus = (elementHeight:any,input:any)=>{
    var ShopDetailsPageHeight = (ShopDetailsPage.current?.offsetTop! + ShopDetailsPage.current?.offsetHeight!);
    if(input && ShopDetailsPageHeight && input){
      setFormPosition({top:`-${input - elementHeight - 100}px`});
     }
  }
  Keyboard.addListener('keyboardDidShow', info => {
    keyboardHeight === 0 && setKeyboardHeight(info.keyboardHeight);
  });

  Keyboard.addListener('keyboardDidHide', () => {
   setFormPosition({top:0})
  });
  if (!isPending) {
    distance = formatDistance(new Date(detail.product.updatedAt), new Date(), {
      addSuffix: true,
    });
    colors = jsonCheck(detail.product.s_product_colors)
      ? jsonCheck(detail.product.s_product_colors)
      : [];

  }
  useEffect(()=>{
    const checkCart = async () => {
     try {
      const cartE = await Preferences.get({ key: CART_KEY });
      if (cartE.value) {
        const parse: any = jsonCheck(cartE.value);
        if (parse) {
          const includes = parse.map(({ id }:{id:any}) => parseInt(id)).includes(parseInt(id.id))
          if (includes) {
            setCartExist(true);
          }else{
            setCartExist(false);
          }
        }else{
          setCartExist(false);
        }
      }else{
        setCartExist(false);
      }
     } catch (error) {
      setCartExist(false);
     }
    };
    checkCart();
  },[])
  useEffect(()=>{
    watched(id);
  },[])

  const updateColor = (colorIndex: number,color:string) => {
    setSelectedColor(colorIndex);
    setShopColor!(color)
  };
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    let checkReview = review.current?.value?.toString().trim();
    const addReview = async () => {
      try {
        const s_product_reviews = JSON.stringify({
          id: user.client_id,
          name: `${user.first_name} ${user.last_name}`,
          msg: review.current?.value,
          reviewTime: Date.now(),
        });
       await axios.patch(
          `${url}/api/shops/client/${id.id}/empty`,
          { s_product_reviews },
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        setUpdate(true);
        Toast(presentIonToast, "Review Added Successfully", checkmarkCircleOutline);
      } catch (error) {
        const { message, status } = errorResponse(error);
        if (status && status == 401) {
          Toast(presentIonToast, message, informationCircleOutline);
        } else {
          Toast(
            presentIonToast,
            "Review not added please try again!",
            informationCircleOutline
          );
        }
      }
    };
   if(checkReview){
    if (checkReview.toString().length <= 200) {
      if (isAuthed) {
        if (!review.current?.value) {
          Toast(presentIonToast,"Please write your message first",informationCircleOutline)
        } else {
          addReview();
        }
      }else{
        Toast(presentIonToast,"Please login first",informationCircleOutline);
        navigate!("Login",null,null);
      }
    }else{
      Toast(presentIonToast,"review must be below 80 character",informationCircleOutline);
    }
   }else{
    Toast(presentIonToast,"please write review first",informationCircleOutline);
   }
    reset(review);
  };
  const addToCart = async () => {
    try {
      const cartIDS = await Preferences.get({ key: CART_KEY });
      if (cartIDS.value) {
        const ids: any[] = jsonCheck(cartIDS.value);
        const savedcartData = {
          id:parseInt(id.id),
          name:detail.product.s_product_name,
          mode:detail.product.s_product_category,
          price:detail.product.s_product_price,
        }
        ids.push(savedcartData);
        Preferences.set({ key: CART_KEY, value: JSON.stringify(ids) });
      } else {
        const new_ids: any[] = [];
        new_ids.push({
          id:parseInt(id.id),
          name:detail.product.s_product_name,
          price:detail.product.s_product_price,
          mode:detail.product.s_product_category,
        });
        Preferences.set({ key: CART_KEY, value: JSON.stringify(new_ids) });
      }
      setCartExist(true);
      Toast(presentIonToast,`Item have been added to cart`,cartSharp);
    } catch (error) {
      Toast(presentIonToast,"Item not added to cart, please try again later",informationCircleOutline);
    }
  };
  const shopping = () => {
  const goToPayment = async()=>{
    try {
      const field = {
        s_product_id:id.id,
        selected_color:colors?colors[0]:"#361705",
        client_id:user.client_id}  
        const addShop:any = await axios.post(`${url}/api/payment`,field,{
          headers:{
            Authorization:user.token
          }
        })
        if(addShop.status === 201 && addShop.data.status === true){
          setShopPayment!(detail?detail.product:null);
          navigate!("payment",id.id,{paymentId:addShop.data.newItem.op_id,paid:addShop.data.newItem.transaction_code === "waiting..."?false:true,path:"shopDetails"});
         
        }else{
          throw Error(failMessage);
        }
  
     } catch (error) {
      const {message,status} = errorResponse(error);
      if(message && status){
       Toast(presentIonToast,message,informationCircleOutline)
      }else{
        Toast(presentIonToast,failMessage,informationCircleOutline)
      }
     }
  }
  if(user && isAuthed){
   goToPayment()
  }else{
    Toast(presentIonToast,"please login first",informationCircleOutline)
  }
  };
  const reload = async () => {
    setUpdate(true);
  };
  const clearItem =async()=>{
    try {
      const cartIDS = await Preferences.get({ key: CART_KEY });
      if (cartIDS.value) {
        const ids: any[] = jsonCheck(cartIDS.value).filter((i:any)=>(i.id !==id.id));
        Preferences.set({ key: CART_KEY, value: JSON.stringify(ids) });
        setCartExist(false);
        Toast(presentIonToast,"Item have been removed from Cart",cartSharp);
      }else{
        throw new Error("cart filter failed")
      }
    } catch (error) {
      Toast(presentIonToast,"Item not removed from Cart, please try again later",informationCircleOutline);
    }
  }
  useEffect(()=>{
    pushStack!({path:'shopDetails',id:route?.id,info:route?.info});
  },[]);

if(!isPending){
  if (error) {
    return (
      <IonPage>
        <ToolBarDetails  defaultValue={{path:route?.info !== null?route?.info:"Home",id:id.id,info:null}} title="Shop Details"/>
        <ErrorFallBack className='m_error_top' error={error} reload={reload} />
      </IonPage>
    );
  } else {
    return (
      <IonPage>
         <ToolBarDetails title={detail && detail.product?detail.product.s_product_name:`Shop Details`}  defaultValue={{path:route?.info !== null?route?.info:"Home",id:id.id,info:null}}/>
    
        <IonContent className="ion-no-padding">
          {!isPending && (
            <div ref={ShopDetailsPage} className="shop-details" style={formPosition}>
              <Carousel {...settings} autoPlay>
              {jsonCheck(detail.product.s_product_images).map(
                  (image: any, index: number) => {
                    return (
                      <div key={index}>
                        <ImageComponent
                        className = ""
                        src={image.url}
                        hash={image.hash}
                        label={detail.product.s_product_name}
                      />
                      </div>
                  
                    );
                  }
                )}
          </Carousel>
              <div className="km-detail-card">
                <IonCard className="km-detail-card-main" color="warning">
                  <IonCardContent>
                    <CardDetailsBar
                      distance={distance}
                      s_product_view={detail.product.s_product_view}
                      name={detail.product.s_product_name}
                      price={detail.product.s_product_price}
                    />
                    <ActionControls
                      clearItem={clearItem}
                      cartExist={cartExist}
                      addToCart={addToCart}
                      shopping={shopping}
                    />
                    <Description desc={detail.product.s_product_desc} />
                    <ColorList
                      colors={colors}
                      updateColor={updateColor}
                      selectedColor={selectedColor}
                    />
                  </IonCardContent>
                </IonCard>
                <Review
                  review={review}
                  handleReview={handleReview}
                  reviewList={
                    detail.product.s_product_reviews
                      ? detail.product.s_product_reviews
                      : []
                  }
                  registerInputFocus={registerInputFocus}
                />
              </div>
            </div>
          )}
        </IonContent>
        <div className="spacer_drawer"></div>
      </IonPage>
    );
  }
}else{
  return (
    <IonPage>
      <ToolBarDetails   defaultValue={{path:route?.info !== null?route?.info:"Home",id:id.id,info:null}} title="Shop Details"/>
      <IonContent>
        <LoaderUI/>
      </IonContent>
    </IonPage>
  );
}
};

export default ShopDetails;
