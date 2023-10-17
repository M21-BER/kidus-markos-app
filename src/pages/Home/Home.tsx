import { IonPage } from "@ionic/react";
import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import SpecialEvent from "../SpecialEvent/SpecialEvent";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const { pushStack,route} =
  useContext(UserContext); 
  useEffect(()=>{
    pushStack!({path:'Home',id:route?.id,info:route?.info});
  },[]);
  return (
    <IonPage>
      <ToolBarMain title="Home" />
       {/* <SpecialEvent/> */}
      <HomeTab />
    </IonPage>
  );
};
export default Home;
