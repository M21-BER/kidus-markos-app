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
  };
  const refresh = () => {
    setWait(true);
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
          setUser(userData);
          setIsAuthed(true);
          setWait(true);
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
            console.log("Rendered with error");
            await removeUser();
          }
        } else {
          console.log("Rendered with error");
          setWait(false);
          setUser(null);
          setIsAuthed(false);
        }
      } catch (error) {     
        console.log("Rendered with error");
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

  return { user, isAuthed, wait,refresh, updateSavedData };
};

export { useUser };
