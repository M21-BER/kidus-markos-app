import {useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import { jsonCheck, login_key } from "../utils/utils";
import {useContext} from 'react';
import {UserContext} from '../context/ContextProvider'
import jwt_decode from "jwt-decode";

const useUser = () => {
  const {user,setUser} = useContext(UserContext)
  const [logged,setLogged] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);
  const removeUser = async()=>{
    await Preferences.remove({ key: login_key })
    setLogged(false);
    setIsPending(false);
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
    setLogged(true);  
    setIsPending(false);
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
    setLogged(false);
    setIsPending(false);
    return [null,logged,isPending] 
    } 
    } 
    checkUser();
  }, []);

  return [user,logged,isPending];
};

export { useUser };
