import {
  IonPage,
  useIonRouter,
  useIonLoading,
  useIonToast,
} from "@ionic/react";

import React, { useRef, useEffect, useContext, useState } from "react";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import RegisterContent from "./RegisterContent";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Toast } from "../../utils/CustomToast";
import { SIGNUP_KEY, failMessage, jsonCheck, url } from "../../utils/utils";
import { errorResponse } from "../../utils/errorResponse";
import Verify from "./Verify";
import { Preferences } from "@capacitor/preferences";
const Register: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const first_name = useRef<null | HTMLIonInputElement>(null);
  const last_name = useRef<null | HTMLIonInputElement>(null);
  const gender = useRef<null | HTMLIonRadioGroupElement>(null);
  const email = useRef<null | HTMLIonInputElement>(null);
  const phone_number = useRef<null | HTMLIonInputElement>(null);
  const password = useRef<null | HTMLIonInputElement>(null);
  const confirm_password = useRef<null | HTMLIonInputElement>(null);
  const [verify,setVerify] =useState<any>(null);
  const [presentIonToast] = useIonToast();
  const { isAuthed } = useContext(UserContext);
  const [verifyStatus,setVerifyStatus] = useState<boolean>(false);
  const [VRes,setVRes] = useState<any>(null);
  const reset = (field: React.MutableRefObject<HTMLIonInputElement | null>) => {
    field.current ? (field.current.value = field.current.value) : "";
    // field.current ? (field.current.value = "") : "";
  };
  const setSignStatus = (data:any)=>{
    Preferences.set({
      key: SIGNUP_KEY,
      value: JSON.stringify(data),
    });
  }
  const getSignStatus = async()=>{
    try {
      const SData = await Preferences.get({ key: SIGNUP_KEY });
      if (SData && SData.value) {
        const parsedSData = jsonCheck(SData.value);
           setVRes(parsedSData)
           setVerifyStatus(true);
      }else{
        setVRes(null);
        setVerifyStatus(false);
      }
    } catch (error) {
      setVRes(null);
      setVerifyStatus(false);
    }
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      first_name: first_name.current?.value,
      last_name: last_name.current?.value,
      gender: gender.current?.value,
      email: email.current?.value,
      phone_number: phone_number.current?.value,
      password: password.current?.value,
      confirm_password: confirm_password.current?.value,
    };
    const regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const sign_up = async () => {
      try {
        await present("Signing...");
        const sign = await axios.post(`${url}/api/clients/signup`, data);
        dismiss();
        if (sign.data.status === true || sign.status === 200) {
          if (sign.data.newClient && sign.data.OTP) {
            console.log(sign.data);
            Toast(presentIonToast, sign.data.message, checkmarkCircleOutline);
            const VData= {
             OTP:sign.data.OTP,
             token: sign.data.token,
             client_id: sign.data.client_id
            }
            setSignStatus(JSON.stringify(VData))
            setVRes(VData);
            setVerifyStatus(true);
          } else {
            throw new Error(failMessage);
          }
        } else {
          throw new Error(failMessage);
        }
      } catch (error) {
        dismiss();
        setVerifyStatus(false);
        const { message, status } = errorResponse(error);
        if (message && status) {
          Toast(presentIonToast, message, closeCircleOutline);
        } else {
          Toast(presentIonToast, failMessage, closeCircleOutline);
        }
        reset(first_name);
        reset(last_name);
        reset(email);
        reset(phone_number);
        reset(password);
        reset(confirm_password);
      }
    };
      if (
        data.first_name &&
        data.last_name &&
        data.gender &&
        data.email &&
        data.phone_number &&
        data.password &&
        data.confirm_password
      ) {
      if(regex.test(data.email)){
        if(data.password == data.confirm_password){
          if(strongPassword.test(data.password)){
          sign_up();
          }else{
            Toast(
              presentIonToast,
              "password not strong enough",
              informationCircleOutline,6000
            );
            reset(password);
            reset(confirm_password);
          }
        }else{
          Toast(
            presentIonToast,
            "password mismatch",
            informationCircleOutline
          );
          reset(password);
          reset(confirm_password);
        }
      }else{
        Toast(
          presentIonToast,
          "please enter valid email address",
          informationCircleOutline
        );
        reset(email);
      }
      } else {
        Toast(
          presentIonToast,
          "registration filled can not be empty",
          informationCircleOutline
        );
      }
  };
  
  const handleVerify = async(e:React.FormEvent)=>{
    e.preventDefault(); 
    if(verify){
        if(parseInt(verify) === parseInt(VRes.OTP)){
          try {
          await axios.patch(`${url}/api/clients/${VRes.client_id}`,{active:true},{
            headers:{
              'Authorization': VRes.token
            }
          }); 
          await Preferences.remove({ key: SIGNUP_KEY });
          setVerifyStatus(false);
          Toast(
            presentIonToast,
            "account verified successfully",
            checkmarkCircleOutline
          ); 
          router.push('/app/login','root','replace'); 
          } catch (error) {
            Toast(
              presentIonToast,
              "account verified code expired",
              informationCircleOutline
            ); 
          }
        }else{
          Toast(
            presentIonToast,
            "invalid code",
            informationCircleOutline
          );
        }
   }else{
    Toast(
      presentIonToast,
      "code can not be empty",
      informationCircleOutline
    );
   } 
  }

  useEffect(() => {
    if (isAuthed) {
      router.goBack();
    }
  }, [isAuthed]);

  useEffect(()=>{
    getSignStatus();
  },[])
  return (
    <IonPage>
      <ToolBarMain title="Sign up" />
       {
        verifyStatus?
        <Verify verify={verify} setVerify={setVerify} handleVerify={handleVerify}/>:
        <RegisterContent
        first_name={first_name}
        last_name={last_name}
        gender={gender}
        email={email}
        phone_number={phone_number}
        password={password}
        confirm_password={confirm_password}
        handleSubmit={handleSubmit}
      />
       }
      
    </IonPage>
  );
};

export default Register;
