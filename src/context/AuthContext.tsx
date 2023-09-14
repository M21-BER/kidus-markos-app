import {ReactNode, createContext} from "react";
import { useUser } from "../hooks/useUser";
interface Props {
user:any;
isAuthed:boolean;
}
export const UserContext = createContext<Partial<Props>>({})


export default function UserProvider({children}:{children:ReactNode}){
 const {user,isAuthed} = useUser(); 
  return (
    <UserContext.Provider value={{user,isAuthed}}>
     {children}
    </UserContext.Provider>
  )

}