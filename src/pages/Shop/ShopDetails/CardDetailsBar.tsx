import { IonIcon } from "@ionic/react";
import { timeSharp, eyeSharp } from "ionicons/icons";
import { nFormatter } from "../../../utils/numberFormatter";
import { jsonCheck } from "../../../utils/utils";

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
        <small><IonIcon icon={eyeSharp} color='primary'/> {nFormatter(s_product_view === null?0:typeof jsonCheck(s_product_view) === 'string'?0:jsonCheck(s_product_view).length)}</small>
        <h4>{name}</h4>
        <p>ETB {price}</p>
      </div>
    );
};
export default CardDetailsBar;