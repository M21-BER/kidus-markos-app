import { IonAvatar, IonCard, IonCardContent, IonChip, IonIcon, IonItem, IonLabel, IonText, useIonRouter } from '@ionic/react';
import { cartOutline, checkmark, checkmarkCircleOutline, closeCircleOutline, closeOutline, helpCircleOutline } from 'ionicons/icons';
import React, { useContext } from 'react';
import { UserContext } from '../../context/AuthContext';
interface Props{
shops:any   
}
const MyShopsList: React.FC<Props> = ({shops}) => {
   const findProd = (id:any)=>{
    return shops.data2.filter((i:any)=>{
      return i.s_product_id === id
    }) 
   }
   const { setShopPayment,setShopColor } = useContext(UserContext);
   const router = useIonRouter();
    if(shops.data1.length === 0 ){
        return (
            <div className="ion-text-center NDA">
            <IonText color="medium">No items in your shopping order</IonText>
          </div>    
  );
    }else{
        return (
            <>
             {
                shops.data1.map((shop:any, index:number) => (
                  <IonCard disabled={shop.delivered?true:false} key={index} onClick={() => {
                    setShopColor!(shop.selected_color?shop.selected_color:"#361705")
                    setShopPayment!(findProd(shop.s_product_id)[0]?findProd(shop.s_product_id)[0]:null);
                    router.push(`/payment/${shop.s_product_id}`);
                  }}>
                    <IonCardContent className="ion-no-padding">
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                         <IonIcon color='light' style={{background:'rgba(54,23,5,1)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'100%',padding:'5px'}} icon={cartOutline} size='large'/>
                        </IonAvatar>
                        <IonLabel className='ion-margin-top'>
                          {findProd(shop.s_product_id)[0].s_product_name}
                          <p>{findProd(shop.s_product_id)[0].s_product_category}</p>
                        </IonLabel>
                        {shop.delivered?<IonIcon color='success' icon={checkmarkCircleOutline}/>:<IonIcon color='secondary' icon={helpCircleOutline}/>}
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                ))
             }
            </>
            );
    }
  
};

export default MyShopsList;