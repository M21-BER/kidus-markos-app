import {IonPage} from "@ionic/react";
import HomeTab from "./HomeTab";
import {ToolBarMain} from "../../components/ToolBar/ToolBar";

const Home: React.FC = () => {
  const clearList = () => {};
  return (
    <IonPage>
      <ToolBarMain  title="Home"/>
      <HomeTab />
    </IonPage>
  );
};
export default Home;
