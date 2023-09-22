import { useIonLoading,IonAvatar, IonCard, IonCardContent, IonChip, IonContent, IonItem, IonLabel, IonPage, IonSkeletonText, useIonViewWillEnter, IonRefresher, IonRefresherContent, IonText, IonModal } from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import {failMessage, url } from '../../utils/utils';
import TasksList from './TasksList';
import './Tasks.css'
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';
import ErrorFallBack from '../../components/error/ErrorFallBack/ErrorFallBack';
import { OverlayEventDetail } from '@ionic/core';
const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [present, dismiss] = useIonLoading();
  const controller: AbortController = new AbortController();
  const {user} = useContext(UserContext); 
  const modal = useRef<HTMLIonModalElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useIonViewWillEnter(async () => {
    const tasks = await getTasks();
    setTasks(tasks);
    setLoading(false);
  });

  const getTasks = async () => {
    try {
      const data = await axios(`${url}/api/tasks/client/clientIndex/${user.client_id}`, {
        signal: controller.signal,
        headers:{
          Authorization:user.token
        }
      });
      setError(null);
      return data.data.items;
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        setTasks([]);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          setError(error.response.data.error.message);
        } else {
          setError(failMessage);
        }
      }
    }
  };
  const doRefresh = async (event: any) => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
    await present("Refreshing...");
    const data = await getTasks();
    dismiss();
    setTasks(data);
    setLoading(false);
  };
  const getCompleted = (state:number,tk:any):number=>{
   if(state === 1){
    return tk.filter((t:any)=> (t.completed === true)).length 
   }else{
    return tk.filter((t:any)=> (t.completed === false)).length 
   }
  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setOpenModal(false); 
   
  }
  const handleModal = (task:any)=>{
   setTaskStatus(task);
   setOpenModal(true); 
  }
  if (error) {
    return (
      <IonPage>
        <ToolBarMain/>
        <ErrorFallBack error={error} reload={reload} />
      </IonPage>
    );
  } else {
  return (
    <IonPage>
       <ToolBarMain/>
       <IonContent>
       <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
          </IonRefresher>
        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: '150px' }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color={'primary'}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
         <IonCard className="ion-no-margin">
              <IonCardContent >
              <section className='task-status'>
               <div><IonText>Completed:  <IonChip>{tasks.length !== 0?getCompleted(1,tasks): 0}</IonChip></IonText></div>              
               <div><IonText>On progress: <IonChip>{tasks.length !== 0?getCompleted(2,tasks): 0}</IonChip></IonText></div>              
              </section> 
              </IonCardContent>
            </IonCard>
       <TasksList tasks={tasks} handleModal={handleModal}/>
       <IonModal 
       className='modal-task'  isOpen={openModal}
      onWillDismiss={(ev) => onWillDismiss(ev)}
      ref={modal}
      trigger="open-modal" 
      initialBreakpoint={1} breakpoints={[0, 1]}>
      <div className="block">Block of Content</div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
};

export default Tasks;