import {
  IonPage,
  IonCard,
  IonCardContent,
  useIonToast,
  IonContent,
  useIonRouter,
} from "@ionic/react";
import { ToolBarDetails } from "../../../components/ToolBar/ToolBar";
import { useParams } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import { url, jsonCheck, CART_KEY } from "../../../utils/utils";
import ImageComponent from "../../../components/UI/Image";
import "../../Home/HomeDetail.css";
import {
  cartSharp,
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import CustomSlider from "../../../components/slider/custom.slider";
import { formatDistance } from "date-fns";
import { Preferences } from "@capacitor/preferences";
import React, { useEffect, useRef, useState } from "react";
import ColorList from "./ColorList";
import Description from "./Description";
import ActionControls from "./ActionControls";
import CardDetailsBar from "./CardDetailsBar";
import Review from "./Review";
import axios from "axios";
import { errorResponse } from "../../../utils/errorResponse";
import { Toast } from "../../../utils/CustomToast";
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import { useUser } from "../../../hooks/useUser";

const ShopDetails: React.FC = () => {
  const id: any = useParams();
  const [detail, isPending, error, setUpdate] = useAxios(
    `${url}/api/shops/${id.id}`
  );
  let distance: any = null;
  let colors: any = null;
  const router = useIonRouter();
  const [cartExist, setCartExist] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const review = useRef<null | HTMLIonInputElement>(null);
  const [present] = useIonToast();
  const { user, isAuthed } = useUser();
  if (!isPending) {
    distance = formatDistance(new Date(detail.product.updatedAt), new Date(), {
      addSuffix: true,
    });
    colors = jsonCheck(detail.product.s_product_colors)
      ? jsonCheck(detail.product.s_product_colors)
      : [];
  }
  useEffect(() => {
    const checkCart = async () => {
      const cartE = await Preferences.get({ key: CART_KEY });
      if (cartE.value) {
        const parse: any = jsonCheck(cartE.value);
        if (parse) {
          if (parseInt(id.id) === parseInt(parse.id)) {
            setCartExist(true);
          }
        }
      }
    };
    checkCart();
  }, []);

  const updateColor = (colorIndex: number) => {
    setSelectedColor(colorIndex);
  };
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = "") : "";
  };
  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    const addReview = async () => {
      try {
        const s_product_reviews = JSON.stringify({
          id: user.client_id,
          name: `${user.first_name} ${user.last_name}`,
          msg: review.current?.value,
          reviewTime: Date.now(),
        });
        const reviewPatchRes = await axios.patch(
          `${url}/api/shops/${id}/empty`,
          { s_product_reviews },
          {
            headers: {
              Authorization: `Basic ${user.token}`,
            },
          }
        );
        setUpdate(true);
        Toast(present, "Review Added Successfully", checkmarkCircleOutline);
      } catch (error) {
        const { message, status } = errorResponse(error);
        if (status && status == 401) {
          Toast(present, message, informationCircleOutline);
        } else {
          Toast(
            present,
            "Review not added please try again!",
            informationCircleOutline
          );
        }
      }
    };
    if (isAuthed) {
      if (!review.current?.value) {
        present({
          message: "Please write your message first",
          duration: 3000,
          position: "bottom",
          icon: informationCircleOutline,
          color: "primary",
        });
      } else {
        addReview();
      }
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
      present({
        message: "Item have been Added to Cart 🗸 ",
        duration: 3000,
        position: "bottom",
        icon: cartSharp,
        color: "primary",
      });
    } catch (error) {
      console.log("error on adding cart");
    }
  };
  const shopping = () => {
    router.push("/payment");
  };
  const reload= ()=>{

  }
  if (error) {
    return (
      <IonPage>
        <ErrorFallBack error={error} reload={reload}/>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <ToolBarDetails />
        <IonContent className="ion-no-padding">
          {!isPending && (
            <div className="shop-details">
              <CustomSlider>
                {jsonCheck(detail.product.s_product_images).map(
                  (image: any, index: number) => {
                    return (
                      <ImageComponent
                        key={index}
                        src={image.url}
                        hash={image.hash}
                        label={detail.product.s_product_name}
                      />
                    );
                  }
                )}
              </CustomSlider>
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
