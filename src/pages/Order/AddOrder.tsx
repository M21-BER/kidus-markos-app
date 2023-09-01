import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { ToolBarDetails } from '../../components/ToolBar/ToolBar';
import { addCircleSharp } from 'ionicons/icons';
import { useRef,useState } from 'react';
import axios from 'axios';
import { url } from '../../utils/utils';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';
import { ImageSizePlusEncoder } from '../../utils/ImageSizePlusEncoder';
import { b64toFile } from '../../utils/Base64ToBlob';
import './Order.css'
const AddOrder: React.FC = () => {
    const router = useIonRouter();
    const full_name = useRef<null | HTMLIonInputElement>(null);
    const phone_number = useRef<null | HTMLIonInputElement>(null);
    const length = useRef<null | HTMLIonInputElement>(null);
    const height = useRef<null | HTMLIonInputElement>(null);
    const width = useRef<null | HTMLIonInputElement>(null);
    const thickness = useRef<null | HTMLIonInputElement>(null);
    const quantity = useRef<null | HTMLIonInputElement>(null);
    const [floorPlan, setFloorPlan] = useState<any[]>([]);
    const id:any = useParams();
    const [detail,isPending,error] = useAxios(`${url}/api/products/${id.id}`);
    let product_id:any = null;
    let product_category:any = null;
    let product_code:any = null;
    if(!isPending){
    product_id = detail.product.product_id;
    product_category = detail.product.product_category;
    product_code = detail.product.product_code;
    }
    const reset= ()=>{
      full_name.current?full_name.current.value = "":"";
      phone_number.current?phone_number.current.value = "":"";
      length.current?length.current.value = "":"";
      height.current?height.current.value = "":"";
      width.current?width.current.value = "":"";
      thickness.current?thickness.current.value = "":"";
      quantity.current?quantity.current.value = "":"";
    } 
    const resetImages = ()=>{
     setFloorPlan([])
    } 
    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
        });
    
        const img = `data:image/jpeg;base64,${image.base64String}`;
        let imgSplit = img.split(";")[1].split(',')[1]
        setFloorPlan((pre)=>{
          return [
           ...pre,
           b64toFile(imgSplit,"image/png")
          ]
        });
    };
    
    const handleSubmit = (event:React.FormEvent)=>{
      event.preventDefault();
      (async()=>{
       try {
        const data:any = {
        product_id: product_id,
        order_type: product_category,
        code: product_code,
        full_name:full_name.current?.value,
        phone_number:phone_number.current?.value,
        length:length.current?.value || 0,
        height:height.current?.value || 0,
        width:width.current?.value || 0,
        thickness:thickness.current?.value || 0,
        quantity:quantity.current?.value || 0,
        }
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
       const addOrder = await axios.post(`${url}/api/orders`,formData); 
    //    router.push('/app', 'root')
       console.log(addOrder)
       reset();
       } catch (error) {
        console.log(error);
        reset();
       }
      })()
     
    }
    return (
        <IonPage>
           <ToolBarDetails/>
            <IonContent className="ion-padding">
            <IonCard>
        <IonCardHeader>
            <IonTitle></IonTitle>
        </IonCardHeader> 
        <IonCardContent>
      <form onSubmit={handleSubmit}>
        <IonInput ref={full_name} name="full_name" fill='outline' labelPlacement='floating' label='Full Name' placeholder='First Name' type='text'className='ion-margin-top' required></IonInput>
        <IonInput ref={phone_number} name="phone_number" fill='outline' labelPlacement='floating' label='Phone Number' placeholder='+251----' type='text'className='ion-margin-top ion-margin-bottom' required></IonInput>
        <IonInput ref={length} name="length" fill='outline' labelPlacement='floating' label='Length' placeholder='Length' type='number' className='ion-margin-top' required></IonInput>
        <IonInput ref={height} name="height" fill='outline' labelPlacement='floating' label='Height' placeholder='Height' type='number' className='ion-margin-top' required></IonInput>
        <IonInput ref={width} name="width" fill='outline' labelPlacement='floating' label='Width' placeholder='Width' type='number' className='ion-margin-top' required></IonInput>
        <IonInput ref={thickness} name="thickness" fill='outline' labelPlacement='floating' label='Thickness' placeholder='Thickness' type='number' className='ion-margin-top' required></IonInput>
        <IonInput ref={quantity} name="quantity" fill='outline' labelPlacement='floating' label='quantity' placeholder='order quantity' type='number'  className='ion-margin-top' required></IonInput>
        
          <div>
            <p>Available FloorPlan:{floorPlan.length}/2</p>
            <div className='add-order-image-btns'>
            <IonButton fill='outline' className='ion-margin-top' onClick={takePicture} disabled={floorPlan.length >= 2?true:false}>
             Floor Plan
            </IonButton>
             {(floorPlan.length >= 2) &&
            (<IonButton fill='outline' className='ion-margin-top' onClick={resetImages}>
            Reset
           </IonButton>)
             }
            </div>
          </div>
        <IonButton className='ion-margin-top' type='submit' expand='block'>Add Order<IonIcon icon={addCircleSharp} slot='end'/> </IonButton>
    </form>
   </IonCardContent>
      </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AddOrder;