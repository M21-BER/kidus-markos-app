import axios from "axios";
import { jsonCheck, url } from "../../../utils/utils";
import { Device } from "@capacitor/device";

export const watched = async ({ id }: any) => {
  try {
    const info: any = await Device.getInfo();
    if (info.uuid) {
      const getUUID = await axios.get(`${url}/api/shops/${id}`);
      const isUUIDExist: string[] = jsonCheck(getUUID.data.s_product_view).view;
      if (!isUUIDExist.includes(info.uuid)) {
        axios.patch(`${url}/api/shop`, { uuid: info.uuid });
      }
    }
  } catch (error) {}
};
