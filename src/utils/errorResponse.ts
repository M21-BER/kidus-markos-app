export const errorResponse = (error: any) => {
  let ErrorMessage: any = null;
  let ErrorStatus: any = null;
  if (error) {
    if (error.response) {
      if (error.response.status && error.response.status !== 500) {
        if (error.response.data) {
          if (error.response.data.error) {
            if (error.response.data.error.message) {
              ErrorStatus = error.response.status;
              if (error.response.status == 420) {
                ErrorMessage = "check input value carefully!";
              } else {
                ErrorMessage = error.response.data.error.message;
              }
            }
          }
        }
      }
    }
  }
  return { message: ErrorMessage, status: ErrorStatus };
};
