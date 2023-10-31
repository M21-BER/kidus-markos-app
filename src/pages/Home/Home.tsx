import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import SpecialEvent from "../SpecialEvent/SpecialEvent";
import { useContext, useEffect,useState } from "react";
import { UserContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const [spacer,setSpacer] = useState<string>("130px");
  const spacerFunc = (state:number)=>{
  if(state = 0){
    setSpacer('130px'); 
  }else{
    setSpacer('330px')
  }
  }
  const { pushStack,route} =
  useContext(UserContext); 
  useEffect(()=>{
    pushStack!({path:'Home',id:route?.id,info:route?.info});
  },[]);
  return (
    <>
      <ToolBarMain title="Home" />
       <SpecialEvent spacerFunc={spacerFunc}/>
      <HomeTab spacer={spacer}/>
    </>
  );
};
export default Home;
