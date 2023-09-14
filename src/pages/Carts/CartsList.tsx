import { IonAvatar, IonButton, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
             <div>
               <IonButton color='primary' expand='block' className='ion-text-center'>Batch Shop</IonButton>
             </div>
             {
                carts.map((cart, index) => (
                  <IonCard key={index} onClick={() => {}}>
                    <IonCardContent className="ion-no-padding">
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                         <IonIcon icon={cartOutline}/>
                        </IonAvatar>
                        <IonLabel>
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