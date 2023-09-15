export const Toast = (
  presentIonToast: any,
  msg: string,
  icon: string,
  duration:number = 3000,
  color?: string
) => {
  presentIonToast({
    message: msg,
    duration: duration,
    position: "bottom",
    icon: icon,
    color: color ? color : "primary",
  });
};
