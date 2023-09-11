export const url: string = "http://localhost:5000";

export const failMessage = "Oops, something went wrong. Please try again later";

export const login_key: string = "5twB8F5o5ya#rz4OqE9J";

export const jsonCheck = (json: any) => {
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
};
