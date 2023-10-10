import { ReactNode, createContext, useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { login_key, jsonCheck } from "../utils/utils";
import jwt_decode from "jwt-decode";
interface Props {
  user: any;
  isAuthed: boolean;
  refresh: () => void;
  updateSavedData: (userData: any) => void;
  wait: boolean;
  backHref:string;
  shopColor:string;
  setShopColor:React.Dispatch<React.SetStateAction<string>>;
  setBackHref:React.Dispatch<React.SetStateAction<string>>;
  backBtn:boolean;
  setBackBtn:React.Dispatch<React.SetStateAction<boolean>>
  shopPayment:any;
  setShopPayment:React.Dispatch<any>
}
export const UserContext = createContext<Partial<Props>>({});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [backHref,setBackHref]= useState<string>("/");
  const [backBtn,setBackBtn]= useState<boolean>(false);
  const [shopPayment,setShopPayment]= useState<any>(null);
  const [shopColor,setShopColor]= useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  let resetState = false;
  const removeUser = async () => {
    await Preferences.remove({ key: login_key });
    setWait(false);
    setUser(null);
    setIsAuthed(false);
  };
  const refresh = () => {
    setUpdate(!update);
  };
  const updateSavedData = (Data: any) => {
    (async () => {
      try {
        const userData = await Preferences.get({ key: login_key });
        if (userData && userData.value) {
          Preferences.set({
            key: login_key,
            value: JSON.stringify(Data),
          });
          setWait(false);
          setUser(userData);
          setIsAuthed(true);
          setUpdate(!update);
        }
      } catch (error) {
         removeUser();
      }
    });
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await Preferences.get({ key: login_key });
        if (userData && userData.value) {
          resetState = true;
          const parsedUserData = jsonCheck(userData.value);
          if (parsedUserData.token && jwt_decode(parsedUserData.token)) {
            console.log("Rendered successfully");
              setWait(false);
              setUser(parsedUserData);
              setIsAuthed(true);
          } else {   
            await removeUser();
          }
        } else {
          setWait(false);
          setUser(null);
          setIsAuthed(false);
        }
      } catch (error) {     
        if(resetState){
          removeUser();    
          resetState = false;          
        }else{
          setWait(false);
          setUser(null);
          setIsAuthed(false);
        }
      }
    };
    checkUser();
  }, [update]);
  return (
    <UserContext.Provider
      value={{ user, isAuthed,wait, refresh, updateSavedData,backHref,setBackHref,backBtn,setBackBtn,shopPayment,setShopPayment,shopColor,setShopColor }}
    >
      {children}
    </UserContext.Provider>
  );
}
