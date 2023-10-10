import {
  IonPage,
  IonCard,
  IonCardContent,
  useIonToast,
  IonContent,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { ToolBarDetails } from "../../../components/ToolBar/ToolBar";
import { useParams } from "react-router";
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
const settings = {
  showThumbs: false,
  infiniteLoop: true,
  emulateTouch: true,
  interval: 4000,
};
const ShopDetails: React.FC = () => {
  const id: any = useParams();
  const [detail, isPending, error, setUpdate] = useAxios(
    `${url}/api/shops/index/${id.id}`
  );
  let distance: any = null;
  let colors: any = null;
  const router = useIonRouter();
  const [cartExist, setCartExist] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const review = useRef<null | HTMLIonInputElement>(null);
  const [presentIonToast] = useIonToast();
  const { user, isAuthed,setShopPayment,setShopColor } = useContext(UserContext);
  if (!isPending) {
    distance = formatDistance(new Date(detail.product.updatedAt), new Date(), {
      addSuffix: true,
    });
    colors = jsonCheck(detail.product.s_product_colors)
      ? jsonCheck(detail.product.s_product_colors)
      : [];
  }
  useIonViewWillEnter(()=>{
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
  })

  const updateColor = (colorIndex: number,color:string) => {
    setSelectedColor(colorIndex);
    setShopColor!(color)
  };
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    let checkReview = review.current?.value;
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
        console.log(error);
        
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
        return router.push('/app/login')
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
      Toast(presentIonToast,"Item have been Added to Cart 🗸 ",cartSharp);
    } catch (error) {
      console.log("error on adding cart");
    }
  };
  const shopping = async() => {
   try {
    const field = {
      s_product_id:id.id,
      client_id:user.client_id}  
    if(user && isAuthed){
      const addShop = await axios.post(`${url}/api/payment`,field,{
        headers:{
          Authorization:user.token
        }
      })
      if(addShop.status === 201 && addShop.data.status === true){
        setShopPayment!(detail?detail.product:null);
        router.push(`/payment/${id.id}`);
      }else{
        throw Error(failMessage);
      }
    }else{
     Toast(presentIonToast,"please login first",informationCircleOutline)
    }
   } catch (error) {
    const {message,status} = errorResponse(error);
    if(message && status){
     Toast(presentIonToast,message,informationCircleOutline)
    }else{
      Toast(presentIonToast,failMessage,informationCircleOutline)
    }
   }
  };

  const reload = async () => {
    setUpdate(true);
};
  if (error) {
    return (
      <IonPage>
        <ToolBarDetails title="Shop Details"/>
        <ErrorFallBack className='m_error_top' error={error} reload={reload} />
      </IonPage>
    );
  } else {
    return (
      <IonPage>
         <ToolBarDetails title={detail && detail.product?detail.product.s_product_name:`Shop Details`}/>
        <IonContent className="ion-no-padding">
          {!isPending && (
            <div className="shop-details">
              <Carousel {...settings} autoPlay>
              {jsonCheck(detail.product.s_product_images).map(
                  (image: any, index: number) => {
                    return (
                      <div key={index}>
                        <ImageComponent
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
                />
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  }
};

export default ShopDetails;
