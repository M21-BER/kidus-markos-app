import EnterPhoneNumber from "./EnterPhoneNumber";
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
import {useIonToast } from "@ionic/react";

interface Props {
  phone_number: React.MutableRefObject<HTMLIonInputElement | null>;
  otp: React.MutableRefObject<HTMLIonInputElement | null>;
  newPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  repeatPassword: React.MutableRefObject<HTMLIonInputElement | null>;
  reset: (field: React.MutableRefObject<HTMLIonInputElement | null>) => void;
  present: any;
  dismiss: any;
  navigate:any;
}

const ResetPasswordContent: React.FC<Props> = ({
  phone_number,
  otp,
  newPassword,
  repeatPassword,
  reset,
  present,
  dismiss,
  navigate
}) => {
  const [presentIonToast] = useIonToast();
  const [resetState, setResetState] = useState<number>(0);
  const [generatedOTP, seGeneratedOTP] = useState<number>(0);
  const [userTempo, setUserTempo] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>("");
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

  const handlePhoneNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputPhoneNumber = phone_number.current?.value;
    const checkPhoneNumber = async () => {
      try {
        await present("checking...");
        const changePhoneNumberRes = await axios.get(
          `${url}/api/clients/search/${inputPhoneNumber}`
        );
        if (changePhoneNumberRes.status === 200) {
          if (changePhoneNumberRes.data && changePhoneNumberRes.data.items) {
            if (changePhoneNumberRes.data.items.length !== 0) {
              setUserEmail(changePhoneNumberRes.data.items[0].email);
              sendOTP(changePhoneNumberRes.data.items[0].email);
            } else {
              dismiss();
              Toast(
                presentIonToast,
                "client with this phone number not found",
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
    if (inputPhoneNumber) {
      checkPhoneNumber();
    } else {
      Toast(presentIonToast, "please enter phone number", informationCircleOutline);
    }
    reset(phone_number);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputOtp = otp.current?.value;
    if (inputOtp) {
      if (generatedOTP == inputOtp) {
        Toast(
          presentIonToast,
          "code validated successfully",
          checkmarkCircleOutline
        );
        reset(otp);
        setResetState(2);
      } else {
        Toast(
          presentIonToast,
          "code mismatch please try again",
          informationCircleOutline
        );
      }
    } else {
      dismiss();
      Toast(presentIonToast, "code can not be empty", informationCircleOutline);
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
        const changePassword = await axios.patch(
          `${url}/api/clients/${userTempo.client_id}`,
          { password: newPass },
          {
            headers: {
              Authorization: userTempo.token,
            },
          }
        );
        dismiss();
        if (
          changePassword.data.status === true ||
          changePassword.status === 200
        ) {
          if (changePassword.data.updatedItem) {
            Toast(
              presentIonToast,
              changePassword.data.message,
              checkmarkCircleOutline
            );
            navigate("Login",null,null)
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
        if (newPass.toString().length >= 6) {
          if (newPass.toString().length <= 19) {
            if (strongPassword.test(newPass.toString())) {
              resetPassword();
            } else {
              Toast(
                presentIonToast,
                "password not strong enough",
                informationCircleOutline,
                6000
              );
            }
          } else {
            Toast(
              presentIonToast,
              "password length must be below 32 character",
              informationCircleOutline
            );
          }
        } else {
          Toast(
            presentIonToast,
            "password length must be at least 6 character",
            informationCircleOutline
          );
        }
      } else {
        Toast(presentIonToast, "password mismatch", informationCircleOutline);
      }
    } else {
      Toast(
        presentIonToast,
        "please enter new password to reset",
        informationCircleOutline
      );
    }
    reset(newPassword);
    reset(repeatPassword);
  };

  const handleOTPChange = (e: any) => {
    if (e.detail.value.length >= 4) {
      // @ts-ignore
      otp.current.value = parseInt(e.detail.value.toString().slice(0, 4));
    }
  };

  if (resetState === 0) {
    return <EnterPhoneNumber phone_number={phone_number} handlePhoneNumberSubmit={handlePhoneNumberSubmit} />;
  } else if (resetState === 1) {
    return (
      <OTP
        sendOTP = {sendOTP}
        otp={otp}
        userEmail={userEmail}
        handleOTPChange={handleOTPChange}
        handleOtpSubmit={handleOtpSubmit}
      />
    );
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
