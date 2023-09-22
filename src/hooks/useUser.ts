import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { jsonCheck, login_key } from "../utils/utils";
import jwt_decode from "jwt-decode";

const useUser = () => {
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
    setUpdate(false);
  };
  const refresh = () => {
    setUpdate(true);
  };
  const updateSavedData = (Data: any) => {
    const usd = async () => {
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
          setUpdate(false);
        }
      } catch (error) {
        await removeUser();
      }
    };
    usd();
  };
  useEffect(() => {
    console.log("Rendered");
    
    const checkUser = async () => {
      try {
        const userData = await Preferences.get({ key: login_key });
        if (userData && userData.value) {
          resetState = true;
          const parsedUserData = jsonCheck(userData.value);
          if (parsedUserData.token && jwt_decode(parsedUserData.token)) {
              setWait(false);
              setUser(parsedUserData);
              setIsAuthed(true);
              setUpdate(false);
          } else {
            console.log("error 1");
          
            await removeUser();
          }
        } else {
          setWait(false);
          setUser(null);
          setIsAuthed(false);
          setUpdate(false);
        }
      } catch (error) {
        console.log("error 3");
        
        if(resetState){
          await removeUser();    
          resetState = false;          
        }else{
          setWait(false);
          setUser(null);
          setIsAuthed(false);
          setUpdate(false);
        }
      }
    };
    checkUser();
  }, [update]);

  return { user, isAuthed, refresh, wait, updateSavedData };
};

export { useUser };
