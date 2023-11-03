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
  checkmarkCircleOutline,
  closeCircleOutline,
  imagesOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { failMessage, url } from "../../../utils/utils";
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
import { Keyboard } from '@capacitor/keyboard';
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
  const {route,pushStack,navigate}= useContext(UserContext);
  const id: any = {id:route?.id};
  const [presentIonToast] = useIonToast();
  const [formPosition, setFormPosition] = useState<object>({});
  const form = useRef<HTMLDivElement | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const formHeight = (form.current?.offsetTop! + form.current?.offsetHeight!);
  const registerInputFocus = (elementHeight:any,input:any)=>{
    if(input && formHeight && input >= (formHeight - keyboardHeight !== 0?keyboardHeight:((formHeight*44)/100) +4)){
      setFormPosition({top:`-${input - elementHeight - 100}px`})
     }
  }
  Keyboard.addListener('keyboardDidShow', info => {
    keyboardHeight === 0 && setKeyboardHeight(info.keyboardHeight);
  });
  
  Keyboard.addListener('keyboardDidHide', () => {
   setFormPosition({top:0})
  });
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
        if(addOrder.status === 201 && addOrder.data.status){
          navigate!("Home",id.id,null)
          Toast(presentIonToast, "Product Ordered Successfully", checkmarkCircleOutline);
        }else{
         throw new Error(failMessage);
        }
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
  // useEffect(()=>{
  //   pushStack!({path:'addOrder',id:route?.id,info:route?.info});
  // },[]);
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
      <div ref={form} className="form-app" style={formPosition}>
        <div className="form-app-core form-app-core-register">
          <h3>Request Quotation</h3>
          <IonText color="medium">
           Let us know about your needs so you can get the most of our services.
          </IonText>
      <form onSubmit={handleSubmit}>
        <IonInput
         onIonFocus={()=>{registerInputFocus(full_name.current?.offsetHeight!,(full_name.current?.offsetTop! + full_name.current?.offsetHeight!))}}
         clearInput={true}
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
          onIonFocus={()=>{registerInputFocus(phone_number.current?.offsetHeight!,(phone_number.current?.offsetTop! + phone_number.current?.offsetHeight!))}}
          clearInput={true}
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
         onIonFocus={()=>{registerInputFocus(length.current?.offsetHeight!,(length.current?.offsetTop! + length.current?.offsetHeight!))}}
         clearInput={true}
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
         onIonFocus={()=>{registerInputFocus(height.current?.offsetHeight!,(height.current?.offsetTop! + height.current?.offsetHeight!))}}
         clearInput={true}
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
          onIonFocus={()=>{registerInputFocus(width.current?.offsetHeight!,(width.current?.offsetTop! + width.current?.offsetHeight!))}}
          clearInput={true}
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
          onIonFocus={()=>{registerInputFocus(thickness.current?.offsetHeight!,(thickness.current?.offsetTop! + thickness.current?.offsetHeight!))}}
          clearInput={true}
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
         onIonFocus={()=>{registerInputFocus(quantity.current?.offsetHeight!,(quantity.current?.offsetTop! + quantity.current?.offsetHeight!))}}
         clearInput={true}
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
      <div className="spacer_drawer"></div>
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
