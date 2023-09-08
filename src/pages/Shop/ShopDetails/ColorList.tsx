import { IonIcon, IonText } from "@ionic/react";
import { checkmarkCircleSharp } from "ionicons/icons";

interface Props {
colors:[]
updateColor:(i:number)=>void
selectedColor:React.SetStateAction<number>
}
const ColorList: React.FC<Props> = ({colors,updateColor,selectedColor}) => {
  if(colors.length === 0){
    return <div className='km-card-content ion-text-center'><IonText color='medium'>No Color List Found</IonText></div>
  }else{
     return (
        <div className='km-card-content'>
        {
             colors.map((color:string,index:number)=>{
                 return (<div key={index} className='pickColorParent' style={{background:color}}>  
                   <div onClick={()=>{updateColor(index)}}>
                    {(selectedColor == index) && <IonIcon icon={checkmarkCircleSharp} /> }
                    <p>{color}</p>
                    </div>
                    </div>  
                 )})
        }
     </div>
     )
  }
};

export default ColorList;