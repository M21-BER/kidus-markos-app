export const url: string = "http://localhost:5000";
export const url_dev: string = "https://server.kidusmarkos.com";

export const failMessage = "Oops, something went wrong. Please try again later";

export const login_key: string = "5twB8F5o5ya#rz4OqE9J";

export const CART_KEY = "KidusMarkosCart436";

export const SIGNUP_KEY = "KidusMarkosSIGNUP12066";

export const INTRO_KEY = 'intro-seen-FOA9goHffY';

export const jsonCheck = (json: any) => {
  try {
    if (typeof json === "object") {
      return json;
    } else {
      let tempo = JSON.parse(json);
      if (typeof tempo === "string") {
        return JSON.parse(tempo);
      } else {
        return tempo;
      }
    }
  } catch (error) {
    return json;
  }
};
