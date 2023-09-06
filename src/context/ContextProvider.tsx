import {ReactNode, useState, createContext, Dispatch, SetStateAction } from "react";

export type User = {
 name:string;
 email:string;
 logged:boolean;
}
export interface UserContextInterface {
 user:User,
 setUser:Dispatch<SetStateAction<User>>   
}
 
export const UserContext = createContext<Partial<UserContextInterface>>({})


export default function UserProvider({children}:{children:ReactNode}){
 const [user,setUser]=  useState<User>({
  name:"",
  email:"",
  logged:false
 });
  
  return (
    <UserContext.Provider value={{user,setUser}}>
     {children}
    </UserContext.Provider>
  )

}