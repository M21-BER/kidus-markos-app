import { IonAvatar, IonCard, IonCardContent, IonChip, IonIcon, IonItem, IonLabel, IonText} from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import React from 'react';
interface Props{
carts:any[]   
}
const CartsList: React.FC<Props> = ({carts}) => {
  
    if(carts.length === 0 ){
        return (
            <div className="ion-text-center NDA">
            <IonText color="medium">No items in your shopping cart</IonText>
          </div>    
  );
    }else{
        return (
            <>
             {
                carts.map((cart, index) => (
                  <IonCard key={index} onClick={() => {}}>
                    <IonCardContent className="ion-no-padding">
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                         <IonIcon color='light' style={{background:'rgba(54,23,5,1)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'100%',padding:'5px'}} icon={cartOutline} size='large'/>
                        </IonAvatar>
                        <IonLabel className='ion-margin-top'>
                          {cart.name}
                          <p>{cart.mode}</p>
                        </IonLabel>
                        <IonChip slot="end" color={'primary'}>
                          {cart.price}
                        </IonChip>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                ))
             }
            </>
            );
    }
  
};

export default CartsList;