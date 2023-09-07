import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonTitle, IonCardContent, IonInput, IonButton, IonIcon } from "@ionic/react"
import { logInOutline, createOutline } from "ionicons/icons"
import Logo from '../../assets/Logo.png'

  interface Props{
    handleSubmit: (e:React.FormEvent)=>void;
    clientIdentity: React.MutableRefObject<HTMLIonInputElement | null>;
    password: React.MutableRefObject<HTMLIonInputElement | null>;
  } 
  const fixedScreen:any = {
    position:'fixed',
    width:'100%',
    left:'0',
  }

 const LoginContent:React.FC<Props> = ({handleSubmit,clientIdentity,password})=>{
   
  return (
    <IonContent scrollY={true} className="ion-padding">
    <IonGrid fixed style={fixedScreen}>
        <IonRow class="ion-justify-content-center" >
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4" >
            <div className="ion-text-center ion-padding">
             <img src={Logo} alt='Kidus Markos Logo' width='40%'/>
            </div>
            </IonCol>
        </IonRow> 

        <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">  
                <IonCard color="warning">
                    <IonCardHeader>
                      <IonTitle></IonTitle>
                    </IonCardHeader>  
                <IonCardContent>
                    <form onSubmit={handleSubmit} >
                    <IonInput className="ionInput" ref={clientIdentity} fill='outline' labelPlacement='floating' label='Email' placeholder='user@kidusmarkos.com' type='text'></IonInput>
                    <IonInput  ref={password} className='ion-margin-top ionInput' fill='outline' labelPlacement='floating' label='Password' placeholder='password' type='password'></IonInput>
                    <IonButton className='ion-margin-top' type='submit' expand='block'>Sign In <IonIcon icon={logInOutline} slot='end'/> </IonButton>
                    <IonButton fill="clear" size="small" color={'medium'}  routerLink='/app/register' className='ion-margin-top' type='button' expand='block'>Sign up  <IonIcon icon={createOutline} slot='end'/> </IonButton>
                    </form>
                </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>  
    </IonGrid>
</IonContent>
  )
}

export default LoginContent 