import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
    useIonRouter
  } from "@ionic/react";
  import { analyticsOutline } from "ionicons/icons";
  import { formatDistance } from "date-fns";
  interface Props {
    tasks: any[];
  }
  const TasksList: React.FC<Props> = ({ tasks }) => {
    const navigate = useIonRouter();
    if (tasks.length === 0) {
      return (
        <div className="ion-text-center NDA">
          <IonText color="medium">No available product order</IonText>
        </div>
      );
    } else {
      return (
        <>
          {tasks.map((task, index) => (
            <IonCard key={index} onClick={()=>{
             navigate.push(`/task_view/${task.task_id}`)
            }}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonIcon size="large" style={{background:'rgba(54,23,5,0.1)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'100%',padding:'5px'}} icon={analyticsOutline} />
                  </IonAvatar>
                  <IonLabel>
                    {task.task_title}
                    <p>{formatDistance(new Date(task.createdAt), new Date(), {
      addSuffix: true,
    })}</p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}>
                    {task.completed?'completed':'on progress'}
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </>
      );
    }
  };
  
  export default TasksList;
  