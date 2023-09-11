import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { jsonCheck, login_key } from "../utils/utils";
import jwt_decode from "jwt-decode";

const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const removeUser = async () => {
    await Preferences.remove({ key: login_key });
    setUser(null);
    setIsAuthed(false);
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await Preferences.get({ key: login_key });
        if (userData && userData.value) {
          const parsedUserData = jsonCheck(userData.value);
          if (parsedUserData.token && jwt_decode(parsedUserData.token)) {
            let currentDate = new Date();
            const userD: any = jwt_decode(parsedUserData.token);
            if (userD.exp * 1000 > currentDate.getTime()) {
              setUser(parsedUserData);
              setIsAuthed(true);
            } else {
              await removeUser();
            }
          } else {
            await removeUser();
          }
        } else {
          setUser(null);
          setIsAuthed(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthed(false);
      }
    };
    checkUser();
  }, []);

  return { user, isAuthed };
};

export { useUser };
