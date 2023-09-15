import {ReactNode, createContext} from "react";
import { useUser } from "../hooks/useUser";
interface Props {
user:any;
isAuthed:boolean;
refresh:()=>void
}
export const UserContext = createContext<Partial<Props>>({})


export default function UserProvider({children}:{children:ReactNode}){
 const {user,isAuthed,refresh} = useUser(); 
  return (
    <UserContext.Provider value={{user,isAuthed,refresh}}>
     {children}
    </UserContext.Provider>
  )

}