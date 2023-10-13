import { useIonLoading,IonAvatar, IonCard, IonCardContent, IonChip, IonContent, IonItem, IonLabel, IonPage, IonSkeletonText, IonRefresher, IonRefresherContent, IonText } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { ToolBarMain } from '../../components/ToolBar/ToolBar';
import {failMessage, url } from '../../utils/utils';
import TasksList from './TasksList';
import './Tasks.css'
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';
import ErrorFallBack from '../../components/error/ErrorFallBack/ErrorFallBack';
import Loader from '../../components/UI/Loader/Loader';
const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [present, dismiss] = useIonLoading();
  const controller: AbortController = new AbortController();
  const {isAuthed,user,wait,refresh,navigate} = useContext(UserContext); 
  const [screenLoading,setScreenLoading] = useState<boolean>(wait!);
  useEffect(() => {
    refresh!();
    !isAuthed && navigate!("Login",null,null);
    setScreenLoading(wait!);
  },[]);
  useEffect(() => {
   (async()=>{
    const tasks = await getTasks();
    setTasks(tasks);
    setLoading(false);
   })() 
  },[]);
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
 if(screenLoading){ 
   return (
    <Loader/>
   )
 }else{
  if (error) {
    return (
      <IonPage>
        <ToolBarMain defaultValue='/' title='My Tasks'/>
        <ErrorFallBack error={error} reload={reload} />
      </IonPage>
    );
  } else {
  return (
    <IonPage>
       <ToolBarMain defaultValue='/' title='My Tasks'/>
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
       <TasksList tasks={tasks} navigate={navigate} />
      </IonContent>
      <div className="spacer_drawer"></div>
    </IonPage>
  );
}
 }
};

export default Tasks;