import axios from "axios";
import { jsonCheck, url } from "../../../utils/utils";
import { Device } from "@capacitor/device";


export const watched = async (id:any) => {
  try {
    const info: any = await Device.getId();
    if (info.identifier) {
      const getUUID = await axios.get(`${url}/api/shops/index/${id.id}`);
       if(getUUID.data.product.s_product_view !== undefined){
        if(getUUID.data.product.s_product_view === null){
       await axios.patch(`${url}/api/shops/view/${id.id}/empty`, { s_product_view: info.identifier });
      }else{
          const isUUIDExist: string[] = jsonCheck(getUUID.data.product.s_product_view);
          if (!isUUIDExist.includes(info.identifier)) {
            await axios.patch(`${url}/api/shops/view/${id.id}/empty`, { s_product_view: info.identifier });
          }             
        }
      
       }
   
    }
  } catch (error) {   
  }
};
