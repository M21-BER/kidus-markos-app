import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkDoneCircleSharp, addSharp, cartSharp, trashBinOutline } from "ionicons/icons";

interface Props{
cartExist:boolean;
addToCart:()=>void; 
shopping:()=>void; 
clearItem:()=>void; 
}
const ActionControls: React.FC<Props> = ({cartExist,clearItem,addToCart,shopping}) => {

    return (
        <div className='km-btns'>
        {cartExist? <IonButton color="tertiary" onClick={clearItem} ><IonIcon icon={trashBinOutline}/> Remove From Cart</IonButton>: <IonButton onClick={addToCart} fill='outline'><IonIcon icon={addSharp}/> Add to Cart</IonButton>}
        <IonButton onClick={shopping}><IonIcon icon={cartSharp}/>Shop</IonButton>
    </div>
    );
};

export default ActionControls;