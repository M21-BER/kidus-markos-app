import { Preferences } from "@capacitor/preferences";
import { login_key } from "./utils";

export const logout = async () => {
  let status = false;
  try {
    await Preferences.remove({ key: login_key });
    status = true;
  } catch (error) {
    status = false;
  }
  return status;
};
