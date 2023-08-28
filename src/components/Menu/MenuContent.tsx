import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonIcon, IonAvatar, IonImg } from "@ionic/react";
import { logOutSharp } from "ionicons/icons";
import Logo from '../../assets/Logo.png'
interface Props{
 paths:{name:string,url:string,icon:string}[]; 
}
const icon:any = {
 width:"30px",
 height:"30px",
 background:"#361705",
 padding:"5px",
 border:"0",
 borderRadius:"100%",
 textAlign:"center",
 marginRight:"10px",
 display:'flex',
 justifyContent:'center',
 alignItems:'center'
}
const MenuContent:React.FC<Props> = ({paths})=>{
  return(
    <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar color="primary" style={{height:"112px"}}>
        <IonTitle className="ion-padding-top">
        </IonTitle>
        <IonAvatar slot="start" className="ion-padding" style={{width:"150px",height:"100px"}}>
          <IonImg src={Logo} />
        </IonAvatar>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {paths.map((item, index) => (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem detail={false} routerLink={item.url} routerDirection="none">
            <i style={icon}><IonIcon slot="start" color="warning" icon={item.icon} /></i>
            {item.name}
          </IonItem>
        </IonMenuToggle>
      ))}

      <IonMenuToggle autoHide={false}>
        <IonItem detail={false} routerLink='/' routerDirection="root">
          <i style={icon}><IonIcon slot="start" color="warning" icon={logOutSharp} /></i>
          Logout
        </IonItem>
      </IonMenuToggle>
    </IonContent>
  </IonMenu>
  )
}

export default MenuContent;