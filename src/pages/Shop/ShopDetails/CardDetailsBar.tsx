import { IonIcon } from "@ionic/react";
import { timeSharp, eyeSharp } from "ionicons/icons";
import { nFormatter } from "../../../utils/numberFormatter";

interface Props{
name:string;
price:string;    
s_product_view:number
distance:any
}

const CardDetailsBar: React.FC<Props> = ({name,price,distance,s_product_view}) => {
    return (
        <div className='km-card-header'>
        <small><IonIcon icon={timeSharp} color='primary'/> {distance.substring(distance.indexOf(distance.match(/\d+/g)))}</small>
        <small><IonIcon icon={eyeSharp} color='primary'/> {nFormatter(s_product_view)}</small>
        <h4>{name}</h4>
        <p>ETB {price}</p>
      </div>
    );
};
export default CardDetailsBar;