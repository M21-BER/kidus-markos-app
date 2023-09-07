import {IonPage} from "@ionic/react";
import HomeTab from "./HomeTab";
import {ToolBarMain} from "../../components/ToolBar/ToolBar";
import { useUser } from "../../hooks/useUser";

const Home: React.FC = () => {
  
  const [user,logged,isPending] = useUser();
  if(!isPending){
     if(!logged){
     }
  }
  return (
    <IonPage>
      <ToolBarMain  title="Home"/>
      <HomeTab />
    </IonPage>
  );
};
export default Home;
