import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkDoneCircleSharp, addSharp, cartSharp } from "ionicons/icons";

interface Props{
cartExist:boolean;
addToCart:()=>void; 
shopping:()=>void; 
}
const ActionControls: React.FC<Props> = ({cartExist,addToCart,shopping}) => {

    return (
        <div className='km-btns'>
        {cartExist? <IonButton onClick={addToCart} fill='outline' disabled={cartExist}><IonIcon icon={checkmarkDoneCircleSharp}/>Item in Cart</IonButton>: <IonButton onClick={addToCart} fill='outline'><IonIcon icon={addSharp}/>Add to Cart</IonButton>}
        <IonButton onClick={shopping}><IonIcon icon={cartSharp}/>Shop</IonButton>
    </div>
    );
};

export default ActionControls;