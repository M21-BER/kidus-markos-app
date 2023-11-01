import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import SpecialEvent from "../SpecialEvent/SpecialEvent";
import { useContext, useEffect,useState } from "react";
import { UserContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const [spacer,setSpacer] = useState<string>("130px");
  const [updateEvent,setUpdateEvent] = useState(false);
  const spacerFunc = (state:number)=>{
  if(state === 0){
    setSpacer('130px'); 
  }else{
    setSpacer('330px')
  }
  }
  const updateEventNow = ()=>{
    setUpdateEvent(!updateEvent);
  }
  const { pushStack,route} =
  useContext(UserContext); 
  useEffect(()=>{
    pushStack!({path:'Home',id:route?.id,info:route?.info});
  },[]);
  return (
    <>
      <ToolBarMain title="Home" />
       <SpecialEvent spacerFunc={spacerFunc} updateEvent={updateEvent}/>
      <HomeTab spacer={spacer} updateEventNow={updateEventNow}/>
    </>
  );
};
export default Home;
