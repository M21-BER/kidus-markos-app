export const url:string = "http://localhost:5000";

export const jsonCheck =  (json:any)=>{
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
}