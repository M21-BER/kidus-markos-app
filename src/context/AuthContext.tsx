import { ReactNode, createContext, useState } from "react";
import { useUser } from "../hooks/useUser";
interface Props {
  user: any;
  isAuthed: boolean;
  refresh: () => void;
  updateSavedData: (userData: any) => void;
  wait: boolean;
  backHref:string;
  setBackHref:React.Dispatch<React.SetStateAction<string>>;
  backBtn:boolean;
  setBackBtn:React.Dispatch<React.SetStateAction<boolean>>
}
export const UserContext = createContext<Partial<Props>>({});

export default function UserProvider({ children }: { children: ReactNode }) {
  const { user, isAuthed, refresh, wait, updateSavedData } = useUser();
  const [backHref,setBackHref]= useState<string>("/");
  const [backBtn,setBackBtn]= useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{ user, isAuthed, refresh, wait, updateSavedData,backHref,setBackHref,backBtn,setBackBtn }}
    >
      {children}
    </UserContext.Provider>
  );
}
