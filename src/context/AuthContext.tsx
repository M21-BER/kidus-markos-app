import { ReactNode, createContext, useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { login_key, jsonCheck } from "../utils/utils";
import jwt_decode from "jwt-decode";
export type routeType = {
  path: string;
  id: any | null;
  info: any | null;
};
export type routesFuncType = {
  key: string;
  value: any;
};

interface Props {
  user: any;
  isAuthed: boolean;
  refresh: () => void;
  updateSavedData: (userData: any) => void;
  wait: boolean;
  route: routeType;
  shopColor: string;
  setShopColor: React.Dispatch<React.SetStateAction<string>>;
  navigate: (value: any, id: any, info: any) => void;
  shopPayment: any;
  setShopPayment: React.Dispatch<any>;
  screenStack: routeType[];
  pushStack: (routeHistory: routeType) => void;
  pullStack: (index: number) => void;
}
export const UserContext = createContext<Partial<Props>>({});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [shopPayment, setShopPayment] = useState<any>(null);
  const [shopColor, setShopColor] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [route, setRoute] = useState<routeType>({
    path: "Home",
    id: null,
    info: null,
  });
  const [screenStack, setScreenStack] = useState<routeType[]>([
    {
      path: "Home",
      id: null,
      info: null,
    },
  ]);
  let resetState = false;
  const removeUser = async () => {
    await Preferences.remove({ key: login_key });
    setWait(false);
    setUser(null);
    setIsAuthed(false);
  };
  const refresh = () => {
    setUpdate(!update);
  };
  const updateSavedData = (Data: any) => {
   const replace_user = async () => {
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
          setUpdate(!update);
        }
      } catch (error) {
        removeUser();
      }
    };
    replace_user();
  };
  const navigate = (value: any, id: any = null, info: any = null) => {
    setRoute((pre) => {
      return {
        ...pre,
        path: value,
        id: id ? id : pre.id,
        info: info ? info : pre.info,
      };
    });
  };
  const pushStack = (routeHistory: routeType) => {
     if(screenStack[screenStack.length -1].path !== routeHistory.path){      
    setScreenStack((pre) => {
      return [
        ...pre,
        routeHistory,
      ]
    });
  }
  };
  const pullStack = (index: number) => {
    let newHistory: any = screenStack.filter((item, i) => {
      return index !== i;
    });
    setScreenStack(newHistory);
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await Preferences.get({ key: login_key });
        if (userData && userData.value) {
          resetState = true;
          const parsedUserData = jsonCheck(userData.value);
          if (parsedUserData.token && jwt_decode(parsedUserData.token)) {
            // console.log("Rendered successfully");
            setWait(false);
            setUser(parsedUserData);
            setIsAuthed(true);
          } else {
            await removeUser();
          }
        } else {
          setWait(false);
          setUser(null);
          setIsAuthed(false);
        }
      } catch (error) {
        if (resetState) {
          removeUser();
          resetState = false;
        } else {
          setWait(false);
          setUser(null);
          setIsAuthed(false);
        }
      }
    };
    checkUser();
  }, [update]);
  return (
    <UserContext.Provider
      value={{
        user,
        isAuthed,
        wait,
        refresh,
        updateSavedData,
        shopPayment,
        setShopPayment,
        shopColor,
        setShopColor,
        route,
        navigate,
        screenStack,
        pushStack,
        pullStack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
