import { IonPage, useIonViewWillEnter } from "@ionic/react";
import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";

const Home: React.FC = () => {
  const { refresh } = useContext(UserContext);
  useIonViewWillEnter(() => {
    refresh!();
  });
  return (
    <IonPage>
      <ToolBarMain title="Home" />
      <HomeTab />
    </IonPage>
  );
};
export default Home;
