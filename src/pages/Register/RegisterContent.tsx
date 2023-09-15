import {IonInput, IonButton, IonIcon, IonContent, IonRadio, IonRadioGroup, IonLabel, IonText } from "@ionic/react"
import { addCircleOutline, eye, eyeOff } from "ionicons/icons"
import './Radio.css'
import { useState } from "react";
interface Props{
 handleSubmit:(event:React.FormEvent)=>void,
 first_name: React.MutableRefObject<HTMLIonInputElement | null>;
 last_name: React.MutableRefObject<HTMLIonInputElement | null>;  
 gender: React.MutableRefObject<HTMLIonRadioGroupElement | null>;  
 email: React.MutableRefObject<HTMLIonInputElement | null>;  
 phone_number: React.MutableRefObject<HTMLIonInputElement | null>;  
 password: React.MutableRefObject<HTMLIonInputElement | null>;  
 confirm_password: React.MutableRefObject<HTMLIonInputElement | null>;  
}

const RegisterContent:React.FC<Props> = ({handleSubmit,first_name,last_name,gender,email,phone_number,password,confirm_password})=> {
  const [showPassword,setShowPassword] = useState<boolean>(false)
  return (
   <IonContent className="ion-padding">
   <div className="form-app">
     <div className="form-app-core form-app-core-register">
      <h3>Create Account</h3>
       <IonText color="medium">Register with us to get access to exclusive content and feature</IonText>
       <form onSubmit={handleSubmit}>
      <IonInput  ref={first_name} name="first_name" fill='outline' labelPlacement='floating' label='First Name' placeholder='First Name' type='text'className='ion-margin-top' required={false}></IonInput>
      <IonInput  ref={last_name} name="last_name" fill='outline' labelPlacement='floating' label='Last Name' placeholder='Last Name' type='text'className='ion-margin-top ion-margin-bottom' required={false}></IonInput>
      <IonRadioGroup  name="gender" value="Male" ref={gender}  className='ion-margin-top custom-radio-km'>
      <IonLabel>Sex: </IonLabel>
      <IonRadio value="Male"><span className="sm">M</span><span className="lg">Male</span></IonRadio>
      <IonRadio value="Female"><span className="sm">F</span><span className="lg">Male</span></IonRadio>
      </IonRadioGroup>
      <IonInput ref={email} name="email" fill='outline' labelPlacement='floating' label='Email' placeholder='user@kidusmarkos.com' type='text' className='ion-margin-top' required={false}></IonInput>
      <IonInput ref={phone_number}name="phone_number" fill='outline' labelPlacement='floating' label='Phone Number' placeholder='+251---' type='text'  className='ion-margin-top' required={false}></IonInput>
      <IonInput ref={password}name="password" fill='outline' labelPlacement='floating' label='Password' placeholder='password'   type={showPassword?"text":"password"}  className='ion-margin-top' required={false}></IonInput>
      <IonInput ref={confirm_password} name="confirm-password" fill='outline' labelPlacement='floating' label='Confirm Password' placeholder='confirm password'   type={showPassword?"text":"password"}  className='ion-margin-top' required={false}></IonInput>
      <small  id="password-icon-parent">
                        
                        <IonIcon
                      onClick={()=>{
                       setShowPassword(!showPassword)
                        
                      }}     
                      id="password-icon"
                      color="medium"
                      icon={showPassword?eye:eyeOff}
                        />
                        <span>show password</span>
                        </small>
      <IonButton className='ion-margin-top' type='submit' expand='block'>Sign up<IonIcon icon={addCircleOutline} slot='end'/> </IonButton>
      </form>
     </div>
   </div>
 </IonContent>
  )
}

export default RegisterContent