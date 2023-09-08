import { useIonToast } from "@ionic/react";

const [present] = useIonToast();

export const Toast = (msg:string,icon:string,color?:string)=>{
    present({
      message: msg,
      duration: 3000,
      position: "bottom",
      icon:icon,
      color:color?color:"primary"
    });
  }

