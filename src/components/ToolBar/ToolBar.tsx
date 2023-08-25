import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton,} from "@ionic/react"
interface Props{
  backButton:boolean;
  backHref?:string;
}
const ToolBar:React.FC<Props> = ({backButton,backHref})=> {
  return (
    <IonHeader>
        <IonToolbar color="success">
             {
             backButton &&  <IonButtons slot='end'>
             <IonBackButton defaultHref={backHref}></IonBackButton>
            </IonButtons>
             }
            <IonButtons slot="start"><IonMenuButton /></IonButtons>
            <IonTitle>Kidus Markos</IonTitle>
        </IonToolbar>
    </IonHeader> 

  )
}

export default ToolBar










