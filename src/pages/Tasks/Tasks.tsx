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
import { errorResponse } from '../../utils/errorResponse';
const Tasks: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [present, dismiss] = useIonLoading();
  const controller: AbortController = new AbortController();
  const {isAuthed,user,wait,refresh,navigate,pushStack,route} = useContext(UserContext); 
  const [screenLoading,setScreenLoading] = useState<boolean>(wait!);
  useEffect(()=>{
    pushStack!({path:'Task',id:route?.id,info:route?.info});
  },[]);
  useEffect(() => {
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
      if(error.code !== "ERR_NETWORK"){
      if (error.name !== "CanceledError") {
        setTasks([]);
        const {message,status} = errorResponse(error)
        if (message & status) {
          setError(message);
        } else {
          setError(failMessage);
        }
      }}else{
        setError(error.code);
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
  const rev  = (arr:any[])=>{
    let arr1:any[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      arr1.push(arr[i]);
    }
    return arr1;
  }
 if(screenLoading){ 
   return (
    <Loader/>
   )
 }else{
  if (!loading) {
  if (error) {
    return (
      <IonPage>
        <ToolBarMain defaultValue='/' title='My Tasks'/>
        <IonContent>
            <ErrorFallBack error={error} reload={reload} />
        </IonContent>
        <div className="spacer_drawer"></div>
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
         <IonCard className="ion-no-margin">
              <IonCardContent >
              <section className='task-status'>
               <div><IonText>Completed:  <IonChip>{tasks.length !== 0?getCompleted(1,tasks): 0}</IonChip></IonText></div>              
               <div><IonText>On progress: <IonChip>{tasks.length !== 0?getCompleted(2,tasks): 0}</IonChip></IonText></div>              
              </section> 
              </IonCardContent>
            </IonCard>
       <TasksList tasks={rev(tasks)} navigate={navigate} />
      </IonContent>
      <div className="spacer_drawer"></div>
    </IonPage>
  );
}
  }else{
    return (
      <IonPage>
         <ToolBarMain defaultValue='/' title='My Tasks'/>
         <IonContent>
         <IonCard className="ion-no-margin">
              <IonCardContent >
              <section className='task-status'>
               <div><IonText style={{display:'flex',alignItems:'center'}}> <IonSkeletonText animated style={{ width: '70px',height:'10px' }} />  <IonChip> <IonSkeletonText animated /></IonChip></IonText></div>              
               <div><IonText style={{display:'flex',alignItems:'center'}}> <IonSkeletonText animated style={{ width: '70px',height:'10px' }} /><IonChip> <IonSkeletonText animated /></IonChip></IonText></div>              
              </section> 
              </IonCardContent>
            </IonCard>
          {loading &&
            [...Array(20)].map((_, index) => (
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
        </IonContent>
        <div className="spacer_drawer"></div>
      </IonPage>
    );
  }
 }
};

export default Tasks;
