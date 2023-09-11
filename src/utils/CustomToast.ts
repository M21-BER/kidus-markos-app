export const Toast = (
  presentIonToast: any,
  msg: string,
  icon: string,
  color?: string
) => {
  presentIonToast({
    message: msg,
    duration: 3000,
    position: "bottom",
    icon: icon,
    color: color ? color : "primary",
  });
};
