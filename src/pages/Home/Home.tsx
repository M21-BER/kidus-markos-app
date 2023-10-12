import { IonPage, useIonViewWillEnter } from "@ionic/react";
import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  // const data = useContext(UserContext);
  //  console.log(data);
   
  // useIonViewWillEnter(() => {
  // console.log("Hello Guys");
  
  // });
  return (
    <IonPage>
      <ToolBarMain title="Home" />
      <HomeTab />
    </IonPage>
  );
};
export default Home;
