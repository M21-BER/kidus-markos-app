import {ReactNode, useState, createContext, Dispatch, SetStateAction } from "react";

export type User = {
 client_id:number;
 email:string;
 first_name:string;
 last_name:string;
 gender:string;
 phone_number:string;
 logged:boolean;
 token:string;
}
export interface UserContextInterface {
 user:User,
 setUser:Dispatch<SetStateAction<User>>   
}
 
export const UserContext = createContext<Partial<UserContextInterface>>({})


export default function UserProvider({children}:{children:ReactNode}){
 const [user,setUser]=  useState<User>({
  client_id:0,
  email:"",
  first_name:"",
  last_name:"",
  gender:"",
  phone_number:"",
  token:"",
  logged:false
 });
  
  return (
    <UserContext.Provider value={{user,setUser}}>
     {children}
    </UserContext.Provider>
  )

}