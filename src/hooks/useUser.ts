import {useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import { jsonCheck, login_key } from "../utils/utils";
import {useContext} from 'react';
import {UserContext} from '../context/ContextProvider'
import jwt_decode from "jwt-decode";

const useUser = () => {
  const {user,setUser} = useContext(UserContext)
  const [data,setData] = useState<any>(null)
  const [logged,setLogged] = useState<boolean>(false);
  const [isPendingStatus, setIsPendingStatus] = useState<boolean>(true);
  const removeUser = async()=>{
    await Preferences.remove({ key: login_key })
    setData(null)
    setLogged(false);
    setIsPendingStatus(false); 
  }
  useEffect(() => {
    const checkUser = async ()=>{
    const userData = await Preferences.get({ key: login_key }); 
    if(userData && userData.value){
      const parsedUserData = jsonCheck(userData.value);
        if(parsedUserData.token) {
        const userD:any = jwt_decode(parsedUserData.token);
          if (userD) { 
             let currentDate = new Date();
                if (userD.exp * 1000 > currentDate.getTime()) {
                setData(parsedUserData);  
                setLogged(true);  
                setIsPendingStatus(false);
                setUser!({client_id:parsedUserData.client_id,first_name:parsedUserData.first_name,last_name:parsedUserData.last_name,gender:parsedUserData.gender,email:parsedUserData.email,phone_number:parsedUserData.phone_number,token:parsedUserData.token,logged:true})   
                }else{
                await removeUser();
                }
            }else{
            await removeUser();
          }
        }else{
        await removeUser();
        }
      }else{
      setData(null)
      setLogged(false);
      setIsPendingStatus(false); 
      } 
    } 
    checkUser();
  }, []);

  return [data,logged,isPendingStatus];
};

export { useUser };
