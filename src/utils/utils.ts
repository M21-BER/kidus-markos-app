export const url:string = "http://localhost:5000";

export const jsonCheck =  (json:any)=>{
    if(typeof json === "object"){
     return json; 
    }else{
     return JSON.parse(json)   
    }
}