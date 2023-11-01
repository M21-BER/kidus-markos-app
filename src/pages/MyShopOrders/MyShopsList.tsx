import { IonAvatar, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonSpinner, IonText } from '@ionic/react';
import { analyticsOutline, cartOutline, checkmarkCircleOutline, giftOutline, helpCircleOutline } from 'ionicons/icons';
import React, { useContext } from 'react';
import { UserContext } from '../../context/AuthContext';
interface Props{
shops:any;
navigate:any;   
}
const MyShopsList: React.FC<Props> = ({shops,navigate}) => {
   const findProd = (id:any)=>{
    return shops.data2.filter((i:any)=>{
      return i.s_product_id === id
    }) 
   }
   const rev  = (arr:[])=>{
    let arr1:[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      arr1.push(arr[i]);
    }
    return arr1;
  }
   const { setShopPayment,setShopColor } = useContext(UserContext);
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
                rev(shops.data1).map((shop:any, index:number) => (
                  <IonCard disabled={shop.delivered?true:false} key={index} onClick={() => {
                    setShopColor!(shop.selected_color?shop.selected_color:"#361705")
                    setShopPayment!(findProd(shop.s_product_id)[0]?findProd(shop.s_product_id)[0]:null);
                    navigate("payment",shop.s_product_id,{paymentId:shop.op_id,paid:shop.transaction_code === "waiting..."?false:true,path:"MyShop"});
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
    
                        {shop.delivered && shop.validated && shop.transaction_code !=="waiting..." && <IonIcon color='success' icon={checkmarkCircleOutline}/>}
                        {!shop.delivered  && !shop.validated && shop.transaction_code === "waiting..." && <IonIcon color='secondary' icon={helpCircleOutline}/>}
                        {!shop.delivered && !shop.validated && shop.transaction_code !=="waiting..." &&  <IonSpinner name="crescent" color="tertiary"></IonSpinner>}
                        {!shop.delivered && shop.validated && shop.transaction_code !=="waiting..." &&   <IonIcon color='success' icon={giftOutline}/>}
                      </IonItem>
                      <IonItem color="primary"  style={{border:'1px solid rgba(0,0,0,0.1)'}} lines="none" className='ion-no-margin '>
                        <IonAvatar slot="start">
                         <IonIcon color='primary' style={{background:'rgba(255,255,255,1)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'10%',padding:'5px'}} icon={analyticsOutline} size='large'/>
                        </IonAvatar>
                        <IonText color="light">
                          <p>
                        {shop.delivered && shop.validated && shop.transaction_code !=="waiting..." && "Completed"}
                        {!shop.delivered && shop.validated && shop.transaction_code !=="waiting..." && "On delivery"}
                        {!shop.delivered && !shop.validated && shop.transaction_code !=="waiting..." && "Validating"}
                        {!shop.delivered  && !shop.validated && shop.transaction_code === "waiting..." && "On progress"}
                          </p> 
                        </IonText>
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