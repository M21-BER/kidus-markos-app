import { ReactNode, createContext } from "react";
import { useUser } from "../hooks/useUser";
interface Props {
  user: any;
  isAuthed: boolean;
  refresh: () => void;
  updateSavedData: (userData: any) => void;
  wait: boolean;
}
export const UserContext = createContext<Partial<Props>>({});

export default function UserProvider({ children }: { children: ReactNode }) {
  const { user, isAuthed, refresh, wait, updateSavedData } = useUser();
  return (
    <UserContext.Provider
      value={{ user, isAuthed, refresh, wait, updateSavedData }}
    >
      {children}
    </UserContext.Provider>
  );
}
