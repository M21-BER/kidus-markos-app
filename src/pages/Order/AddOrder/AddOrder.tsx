import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  useIonToast,
} from "@ionic/react";
import { ToolBarDetails } from "../../../components/ToolBar/ToolBar";
import {
  addCircleSharp,
  closeCircleOutline,
  imagesOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
import { useParams } from "react-router";
import { useAxios } from "../../../hooks/useAxios";
import { ImageSizePlusEncoder } from "../../../utils/ImageSizePlusEncoder";
import { b64toFile } from "../../../utils/Base64ToBlob";
import "../Order.css";
import { errorResponse } from "../../../utils/errorResponse";
import { Toast } from "../../../utils/CustomToast";
import flagImg from '../../../assets/Flag_of_Ethiopia.svg.png'
import ErrorFallBack from "../../../components/error/ErrorFallBack/ErrorFallBack";
import LoaderUI from "../../../components/UI/Loader/LoaderUI";
import { UserContext } from "../../../context/AuthContext";
const AddOrder: React.FC = () => {
  const full_name = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const length = useRef<null | HTMLIonInputElement>(null);
  const height = useRef<null | HTMLIonInputElement>(null);
  const width = useRef<null | HTMLIonInputElement>(null);
  const thickness = useRef<null | HTMLIonInputElement>(null);
  const quantity = useRef<null | HTMLIonInputElement>(null);
  const [floorPlan, setFloorPlan] = useState<any[]>([]);
  const [flag, setFlag] = useState<string>("");
  const {route}= useContext(UserContext);
  const id: any = {id:route?.id};
  const [presentIonToast] = useIonToast();
  const [detail, isPending, error,setUpdate] = useAxios(`${url}/api/products/index/${id.id}`);
  let product_id: any = null;
  let product_category: any = null;
  let product_code: any = null;
  if (!isPending) {
    product_id = detail.item.product_id;
    product_category = detail.item.product_category;
    product_code = detail.item.product_code;
  }
  const reset = () => {
    full_name.current ? (full_name.current.value = "") : "";
    phone_number.current ? (phone_number.current.value = "") : "";
    length.current ? (length.current.value = "") : "";
    height.current ? (height.current.value = "") : "";
    width.current ? (width.current.value = "") : "";
    thickness.current ? (thickness.current.value = "") : "";
    quantity.current ? (quantity.current.value = "") : "";
  };
  const resetImages = () => {
    setFloorPlan([]);
  };
  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
  
      const img = `data:image/jpeg;base64,${image.base64String}`;
      let imgSplit = img.split(";")[1].split(",")[1];
      setFloorPlan((pre) => {
        return [...pre, b64toFile(imgSplit, "image/png")];
      });
    } catch (error) {
     Toast(presentIonToast,"Asset Cancelled",imagesOutline,1000,'light');
      
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const full_nameInput = full_name.current?.value;
    const phone_numberInput = phone_number.current?.value;
    const lengthInput = length.current?.value || 0;
    const heightInput = height.current?.value || 0;
    const widthInput = width.current?.value || 0;
    const thicknessInput = thickness.current?.value || 0;
    const quantityInputInput = quantity.current?.value || 0;
    const addOrderNow = async () => {
      try {
        const data: any = {
          product_id: product_id,
          order_type: product_category,
          code: product_code,
          full_name: full_nameInput,
          phone_number: phone_numberInput,
          length: lengthInput,
          height: heightInput,
          width: widthInput,
          thickness: thicknessInput,
          quantity: quantityInputInput,
        };
        const formData = new FormData();
        formData.append("product_id", data.product_id);
        formData.append("order_type", data.product_category);
        formData.append("code", product_code);
        formData.append("full_name", data.full_name);
        formData.append("quantity", data.quantity);
        formData.append("phone_number", data.phone_number);
        formData.append("length", data.length);
        formData.append("width", data.width);
        formData.append("height", data.height);
        formData.append("thickness", data.thickness);

        if (floorPlan.length > 0) {
          let hashedImages = [];
          for (let i = 0; i < floorPlan.length; i++) {
            try {
              const [hash] = await ImageSizePlusEncoder(floorPlan[0]);
              hashedImages.push({
                name: floorPlan[i].name.split(".")[0],
                hash,
              });
            } catch (error) {
              hashedImages.push("error");
            }
          }
          if (!hashedImages.includes("error")) {
            formData.append("floor_plan_hashed", JSON.stringify(hashedImages));
          }
          for (let i = 0; i < floorPlan.length; i++) {
            formData.append("images", floorPlan[i]);
          }
        }
        const addOrder = await axios.post(`${url}/api/orders`, formData);

        //    router.push('/app', 'root')
        console.log(addOrder);
        reset();
      } catch (error) {
        const { message, status } = errorResponse(error);
        if (message && status) {
          Toast(presentIonToast, message, closeCircleOutline);
        } else {
          Toast(presentIonToast, failMessage, closeCircleOutline);
        }
        reset();
      }
    };
    if (full_nameInput) {
      if (phone_numberInput) {
        if (parseInt(quantityInputInput.toString()) !== 0) {
          addOrderNow();
        } else {
          Toast(
            presentIonToast,
            "please enter order quantity",
            informationCircleOutline
          );
        }
      } else {
        Toast(
          presentIonToast,
          "please enter phone number",
          informationCircleOutline
        );
      }
    } else {
      Toast(
        presentIonToast,
        "please enter full name",
        informationCircleOutline
      );
    }
  };
  const reload = ()=>{
    setUpdate(true);
  }
  if(!isPending){
  if(error){
   return(
    <IonPage>
    <ToolBarDetails defaultValue={{path:"orderDetails",id:id.id,info:null}} title="Request Quotient"/>
    <ErrorFallBack className='m_error_top' error={error} reload={reload} />
  </IonPage>
   );
  }else{
  return (
    <IonPage>
 <ToolBarDetails defaultValue={{path:"orderDetails",id:id.id,info:null}} title="Request Quotient"/>
      <IonContent className="ion-padding">
      <div className="form-app">
        <div className="form-app-core form-app-core-register">
          <h3>Request Quotation</h3>
          <IonText color="medium">
           Let us know about your needs so you can get the most of our services.
          </IonText>
      <form onSubmit={handleSubmit}>
        <IonInput
          ref={full_name}
          name="full_name"
          fill="outline"
          labelPlacement="floating"
          label="Full Name"
          placeholder="First Name"
          type="text"
          className="ion-margin-top"
          required
        ></IonInput>
        <div className="country-phone">
        <img className={flag} src={flagImg}/>
        <IonInput
          onFocus={()=>{
          setFlag("country-phone_img")
          }}
          onBlur={()=>{
          setFlag("")
          }}
          ref={phone_number}
          name="phone_number"
          fill="outline"
          labelPlacement="floating"
          label="Phone Number"
          placeholder="Phone Number"
          type="number"
          className="ion-margin-top ion-margin-bottom"
          required
        ></IonInput>
        </div>
   
        <IonInput
          ref={length}
          name="length"
          fill="outline"
          labelPlacement="floating"
          label="Length"
          placeholder="Length"
          type="number"
          className="ion-margin-top"
          required
        ></IonInput>
        <IonInput
          ref={height}
          name="height"
          fill="outline"
          labelPlacement="floating"
          label="Height"
          placeholder="Height"
          type="number"
          className="ion-margin-top"
          required
        ></IonInput>
        <IonInput
          ref={width}
          name="width"
          fill="outline"
          labelPlacement="floating"
          label="Width"
          placeholder="Width"
          type="number"
          className="ion-margin-top"
          required
        ></IonInput>
        <IonInput
          ref={thickness}
          name="thickness"
          fill="outline"
          labelPlacement="floating"
          label="Thickness"
          placeholder="Thickness"
          type="number"
          className="ion-margin-top"
          required
        ></IonInput>
        <IonInput
          ref={quantity}
          name="Quantity"
          fill="outline"
          labelPlacement="floating"
          label="Quantity"
          placeholder="Quantity"
          type="number"
          className="ion-margin-top"
          required
        ></IonInput>

        <div className="availableFloorPlan--parent">
          <p className="availableFloorPlan">Available Photo: <span>{floorPlan.length}/2</span></p>
          <div className="add-order-image-btns">
            {floorPlan.length >= 2?(
              <IonButton
                color="dark"
                onClick={resetImages}
              >
                Reset File
              </IonButton>
            ):(<IonButton
              color="medium"
              onClick={takePicture}
              disabled={floorPlan.length >= 2 ? true : false}
            >
              Floor Plan
            </IonButton>)}
          </div>
        </div>
        <IonButton
          className="ion-margin-top"
          type="submit"
          expand="block"
        >
          Request Quotation
          <IonIcon icon={addCircleSharp} slot="end" />
        </IonButton>
      </form>
      </div>
      </div>
      </IonContent>
    </IonPage>
  );
}
  }else{
   return(
    <IonPage>
    <ToolBarDetails defaultValue={{path:"orderDetails",id:id.id,info:null}} title="Request Quotient"/>
    <IonContent>
    <LoaderUI/>
     </IonContent>
    </IonPage>
   )
  }
};

export default AddOrder;
