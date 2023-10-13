import { IonIcon, IonLabel } from '@ionic/react';
import { homeSharp, cartSharp, calendarOutline, personCircleSharp } from 'ionicons/icons';
import React from 'react';
import './Drawer.css'
interface Props{
changeScreen:(screen: string) => void;
route:string | undefined
}
const Drawer:React.FC<Props>  = ({changeScreen,route}) => {
    const paths: { name: string; screen: string; icon: string }[] = [
        { name: "Home", screen: "Home", icon: homeSharp },
        { name: "Shop", screen: "MyShop", icon: cartSharp },
        { name: "Task", screen: "Task", icon: calendarOutline },
        { name: "Account", screen: "Account", icon: personCircleSharp },
      ];
    return (
        <section  className="bottom-drawer" >
        {paths.map((item, index) => {
         return (
           <div className="bottom-tab-icon"   key={index} >
               <div onClick={()=>{changeScreen(item.screen)}}>
                <div>
                <IonIcon
             className={route===item.screen?"on":""}   
             icon={item.icon}
             style={{color:route===item.screen?"#361705":"#6e6e6e",border:route===item.screen?"1px solid rgba(54,23,5,0.4)":"1px solid rgba(0,0,0,0.1)"}}
           > 
           </IonIcon>
                </div>
           <IonLabel color={route===item.screen?"primary":"medium"}>{item.name}</IonLabel>
               </div>
           </div>    
         );
       })}
         </section>
    );
};

export default Drawer;