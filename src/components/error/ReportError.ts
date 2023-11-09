import axios from "axios";
import { url } from "../../utils/utils";

export const ReportError:any = async (props:any) => {
  try {
    await axios.post(`${url}/api/report/error`, {
      err_message:props.err_message,
      error_occurrence:props.error_occurrence,
    });
  } catch (error) {
  }
};
