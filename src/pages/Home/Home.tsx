import {IonPage} from "@ionic/react";
import HomeTab from "./HomeTab";
import ToolBar from "../../components/ToolBar/ToolBar";

const Home: React.FC = () => {
  const clearList = () => {};
  return (
    <IonPage>
      <ToolBar backButton={false} title="Home"/>
      <HomeTab />
    </IonPage>
  );
};
export default Home;
