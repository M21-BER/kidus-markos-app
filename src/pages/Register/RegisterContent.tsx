import { IonCardContent, IonInput, IonButton, IonIcon, IonCard, IonCardHeader, IonContent, IonTitle } from "@ionic/react"
import { logInOutline, createOutline } from "ionicons/icons"

interface Props{
 handleSubmit:(event:React.FormEvent)=>void  
}
const RegisterContent:React.FC<Props> = ({handleSubmit})=> {
  return (
    <IonContent className="ion-padding">
    <IonCard>
        <IonCardHeader>
            <IonTitle></IonTitle>
        </IonCardHeader> 
        <IonCardContent>
    <form onSubmit={handleSubmit}>
        <IonInput fill='outline' labelPlacement='floating' label='Email' placeholder='user@kidusmarkos.com' type='email'></IonInput>
        <IonInput className='ion-margin-top' fill='outline' labelPlacement='floating' label='Password' placeholder='password' type='password'></IonInput>
        <IonButton className='ion-margin-top' type='submit' expand='block'>Sign In <IonIcon icon={logInOutline} slot='end'/> </IonButton>
        <IonButton  routerLink='/register' color="secondary" className='ion-margin-top' type='button' expand='block'>Sign up  <IonIcon icon={createOutline} slot='end'/> </IonButton>
    </form>
   </IonCardContent>

      </IonCard>
    </IonContent>
   
  )
}

export default RegisterContent