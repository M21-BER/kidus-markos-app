import { IonPage } from "@ionic/react";
import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import SpecialEvent from "../SpecialEvent/SpecialEvent";

const Home: React.FC = () => {
  return (
    <IonPage>
      <ToolBarMain title="Home" />
       <SpecialEvent/>
      <HomeTab />
    </IonPage>
  );
};
export default Home;
