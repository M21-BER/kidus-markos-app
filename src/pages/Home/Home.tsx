import { IonPage, useIonRouter } from "@ionic/react";
import HomeTab from "./HomeTab";
import { ToolBarMain } from "../../components/ToolBar/ToolBar";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

const Home: React.FC = () => {
  // const {refresh} = useUser();

  return (
    <IonPage>
      <ToolBarMain title="Home" />
      <HomeTab />
    </IonPage>
  );
};
export default Home;
