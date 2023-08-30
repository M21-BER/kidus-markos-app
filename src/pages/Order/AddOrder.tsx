import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { ToolBarDetails } from '../../components/ToolBar/ToolBar';
import { addCircleSharp } from 'ionicons/icons';
import { useRef,useState } from 'react';
import axios from 'axios';
import { url } from '../../utils/utils';
import { useParams } from 'react-router';
import { useAxios } from '../../hooks/useAxios';

const AddOrder: React.FC = () => {
    const router = useIonRouter();
    const full_name = useRef<null | HTMLIonInputElement>(null);
    const phone_number = useRef<null | HTMLIonInputElement>(null);
    const length = useRef<null | HTMLIonInputElement>(null);
    const height = useRef<null | HTMLIonInputElement>(null);
    const width = useRef<null | HTMLIonInputElement>(null);
    const thickness = useRef<null | HTMLIonInputElement>(null);
    const quantity = useRef<null | HTMLIonInputElement>(null);
    const [image, setImage] = useState<any>(null);
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
    const reset = ()=>{
   
    } 
    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
        });
    
        const img = `data:image/jpeg;base64,${image.base64String}`;
        setImage(img);
        console.log(img)
      };
    
    const handleSubmit = (event:React.FormEvent)=>{
      event.preventDefault();
      (async()=>{
       try {
        const data:any = {
        full_name:full_name.current?.value,
        phone_number:phone_number.current?.value,
        length:length.current?.value || 0,
        height:height.current?.value || 0,
        width:width.current?.value || 0,
        thickness:thickness.current?.value || 0,
        quantity:quantity.current?.value || 0,
        }
       const formData = new FormData();
       formData.append("product_id", product_id);
       formData.append("order_type", product_category);
       formData.append("code", product_code);
       formData.append("full_name", data.full_name);
       formData.append("quantity", data.quantity);
       formData.append("phone_number", data.phone_number);
       formData.append("length", data.length);
       formData.append("width", data.width);
       formData.append("height", data.height);
       formData.append("thickness", data.thickness);
       
        // if (is_upload_exist.length > 0) {
        // let hashedImages = [];
        // for (let i = 0; i < is_upload_exist.length; i++) {
        //   try {
        //     const [hash] = await ImageSizePlusEncoder(is_upload_exist[0]);
        //     hashedImages.push({
        //       name: is_upload_exist[i].name.split(".")[0],
        //       hash,
        //     });
        //   } catch (error) {
        //     hashedImages.push("error");
        //   }
        // }
        // if (!hashedImages.includes("error")) {
        //   formData.append("floor_plan_hashed", JSON.stringify(hashedImages));
        // }
        // for (let i = 0; i < is_upload_exist.length; i++) {
        //   formData.append("images", is_upload_exist[i]);
        // }
        // }
       const addOrder = axios.get(`${url}/orders`,data); 
    //    router.push('/app', 'root')
       } catch (error) {
        console.log(error);
        
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
        <IonInput ref={quantity} name="quantity" fill='outline' labelPlacement='floating' label='Password' placeholder='order quantity' type='number'  className='ion-margin-top' required></IonInput>
        <IonButton fill='outline' className='ion-margin-top' onClick={takePicture}>
          Floor Plan
        </IonButton>
        <IonButton className='ion-margin-top' type='submit' expand='block'>Add Order<IonIcon icon={addCircleSharp} slot='end'/> </IonButton>
    </form>
   </IonCardContent>
      </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AddOrder;