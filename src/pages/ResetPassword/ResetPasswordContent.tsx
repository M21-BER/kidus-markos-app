import EnterEmail from "./EnterEmail";
import OTP from "./OTP";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { Toast } from "../../utils/CustomToast";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import axios from "axios";
import { failMessage, url } from "../../utils/utils";
import { errorResponse } from "../../utils/errorResponse";
import { useIonToast } from "@ionic/react";

interface Props {
  email: React.MutableRefObject<HTMLIonInputElement | null>;
  otp: React.MutableRefObject<HTMLIonInputElement | null>;
  newPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  repeatPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  reset: (field: React.MutableRefObject<HTMLIonInputElement | null>) => void;
  present: any;
  dismiss: any;
}

const ResetPasswordContent: React.FC<Props> = ({
  email,
  otp,
  newPassword,
  repeatPassword,
  reset,
  present,
  dismiss,
}) => {
  const [presentIonToast] = useIonToast();
  const [resetState, setResetState] = useState<number>(0);
  const [generatedOTP, seGeneratedOTP] = useState<number>(0);
  const [userTempo, setUserTempo] = useState<any>(null);

  const sendOTP = async (value: any) => {
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    seGeneratedOTP(OTP);
    try {
      const mailer = await axios.post(`${url}/api/clients/reset`, {
        recipient_email: value,
        OTP: OTP,
      });
       
      if (mailer.status === 200 && mailer.data.status === true) {
        setUserTempo(mailer.data);
        setResetState(1);
        dismiss();
        Toast(
          presentIonToast,
          "4 digit code have been sent on your email",
          checkmarkCircleOutline
        );
      } else {
        throw new Error(failMessage);
      }
    } catch (error) {
      dismiss();
      Toast(presentIonToast, failMessage, closeCircleOutline);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputEmail = email.current?.value;
    const regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const checkEmail = async () => {
      try {
        await present("verifying...");
        const changeEmailRes = await axios.get(
          `${url}/api/clients/searchMany/${inputEmail}`
        );
        if (changeEmailRes.status === 200) {
          if (changeEmailRes.data) {
            if (changeEmailRes.data.length !== 0) {
              sendOTP(inputEmail);
            } else {
              dismiss();
              Toast(
                presentIonToast,
                "Client with this email address not found",
                informationCircleOutline
              );
            }
          } else {
            throw new Error(failMessage);
          }
        } else {
          throw new Error(failMessage);
        }
      } catch (error) {
        dismiss();
        const { message, status } = errorResponse(error);
        if (message && status) {
          Toast(presentIonToast, message, closeCircleOutline);
        } else {
          Toast(presentIonToast, failMessage, closeCircleOutline);
        }
      }
    };
    if (inputEmail) {
      if (regex.test(inputEmail.toString())) {
        checkEmail();
      } else {
        Toast(
          presentIonToast,
          "please enter valid email address",
          informationCircleOutline
        );
      }
    } else {
      Toast(presentIonToast, "please enter email", informationCircleOutline);
    }
    reset(email);
  };

  const handleOtpSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const inputOtp = otp.current?.value;
    if(inputOtp){
    if (generatedOTP == inputOtp) {
      Toast(
        presentIonToast,
        "code validated successfully",
        checkmarkCircleOutline
      );
      dismiss();
      reset(otp);
      setResetState(2);

    } else {
      dismiss();
      Toast(
        presentIonToast,
        "code mismatch please try again",
        informationCircleOutline
      );
    }
    }else{
    dismiss();
    Toast(
      presentIonToast,
      "code can not be empty",
      informationCircleOutline
    );
    }
  };

  const handleUpdatePasswordSubmit = async (event: any) => {
    event.preventDefault();
    const newPass = newPassword.current?.value;
    const repeatPass = repeatPassword.current?.value;
    let strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    async function resetPassword() {
      try {
        await present("Resetting...");
        const changePassword = await axios.post(
          `${url}/api/clients/${userTempo.client_id}`,
          { password: newPassword },
          {
            headers: {
              Authorization: `Basic ${userTempo.token}`,
            },
          }
        );
        dismiss();
        if (
          changePassword.data.status === true ||
          changePassword.status === 200
        ) {
          if (changePassword.data.client && changePassword.data.token) {
            Toast(
              presentIonToast,
              changePassword.data.message,
              checkmarkCircleOutline
            );
            // router.push("/", "root", "replace");
          } else {
            throw new Error(failMessage);
          }
        } else {
          throw new Error(failMessage);
        }
      } catch (error) {
        dismiss();
        const { message, status } = errorResponse(error);
        if (message && status) {
          if (status === 401) {
            Toast(
              presentIonToast,
              "4 digit code have been expired",
              closeCircleOutline
            );
          } else {
            Toast(presentIonToast, message, closeCircleOutline);
          }
        } else {
          Toast(presentIonToast, failMessage, closeCircleOutline);
        }
      }
    }
    if (newPass && repeatPass) {
      if (newPass == repeatPass) {
         if(strongPassword.test(newPass.toString())){
          resetPassword();
         }else{
          Toast(
            presentIonToast,
            "password not strong enough",
            informationCircleOutline,6000
          );
         }
      } else {
        Toast(
          presentIonToast,
          "password mismatch, please confirm password",
          informationCircleOutline
        );
      }
    } else {
      Toast(
        presentIonToast,
        "please enter new password to reset",
        informationCircleOutline
      );
    }
    reset(newPassword);
  };
   
  if (resetState === 0) {
    return <EnterEmail email={email} handleEmailSubmit={handleEmailSubmit} />;
  } else if (resetState === 1) {
    return <OTP otp={otp} handleOtpSubmit={handleOtpSubmit} />;
  } else if (resetState === 2) {
    return (
      <ChangePassword
        newPassword={newPassword}
        repeatPassword={repeatPassword}
        handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
      />
    );
  }
};

export default ResetPasswordContent;
