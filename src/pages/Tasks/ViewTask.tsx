import { formatDuration, intervalToDuration } from 'date-fns'
import { useIonAlert,useIonLoading,IonAvatar, IonCard, IonCardContent, IonChip, IonContent, IonItem, IonLabel, IonPage, IonSkeletonText, IonRefresher, IonRefresherContent, IonText, IonButton, IonIcon, IonCardHeader, IonTitle, useIonToast, IonList, IonRadio, IonRadioGroup, IonTextarea } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ToolBarDetails } from '../../components/ToolBar/ToolBar';
import {failMessage, jsonCheck, url } from '../../utils/utils';
import './Tasks.css'
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';
import ErrorFallBack from '../../components/error/ErrorFallBack/ErrorFallBack';
import { OverlayEventDetail } from '@ionic/core';
import ViewFileModal from './ViewFileModal';
import { analyticsOutline, checkmarkCircle, checkmarkCircleOutline, checkmarkDone, chevronDownCircleSharp, chevronDownSharp, chevronUpCircleSharp, chevronUpSharp, closeCircle, helpOutline, informationCircleOutline, paperPlaneSharp } from 'ionicons/icons';
import { Toast } from '../../utils/CustomToast';
import InputModal from './InputModal';
import { errorResponse } from '../../utils/errorResponse';
import { Keyboard } from "@capacitor/keyboard";

const ViewTask: React.FC = () => {
  const defaultTaskTitle = "View Task";  
  const defaultDropDown = {
   work_order:false,
   design_agreement:false,
   color_agreement:false 
  }
  type defaultDropDownType = {
   work_order:boolean,
   design_agreement:boolean,
   color_agreement:boolean 
  }
  const [loading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>(defaultTaskTitle);
  const [error, setError] = useState<any>(null);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [dropDown, setDropDown] = useState<defaultDropDownType>(defaultDropDown);
  const [dropDownHeader, setDropDownHeader] = useState<boolean>(false);
  const select = useRef<null | HTMLIonRadioGroupElement>(null);
  const [present, dismiss] = useIonLoading();
  const controller: AbortController = new AbortController();
  const {user,route,pushStack} = useContext(UserContext); 
  const comment = useRef<HTMLIonTextareaElement>(null);
  const du = useRef<HTMLParagraphElement>(null);
  const ti = useRef<HTMLParagraphElement>(null);
  const du_strong = useRef<HTMLElement>(null);
  const ti_strong = useRef<HTMLElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const modal1 = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [insertOpenModal, setOpenInsertModal] = useState<boolean>(false);
  const [taskUpdate, setTaskUpdate] = useState<boolean>(false);
  const {id}: any = {id:route?.id};
  const [presentIonToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [formPosition, setFormPosition] = useState<object>({});
  useEffect(()=>{
    (async () => {
      const taskRes = await getTasks();
      if(taskRes){
        setTask(taskRes);
        setTaskTitle(taskRes.task_title)
        setLoading(false);
        stepCheckerPercentage(taskRes);
      }
      processTaskTime();
    })()
  },[taskUpdate])


  function processTaskTime(){
    let durationPara =  du.current?.innerText; 
    let TimePara =  ti.current?.innerText; 
    if(durationPara?.split(":")[1].toString().trim() !== "Not Available" || TimePara?.split(":")[1].toString().trim() !== "Not Available"){
        // @ts-ignore
        du_strong.current.style.color= "#383838";
        // @ts-ignore
        ti_strong.current.style.color= "#383838";
        // @ts-ignore
        du.current.style.color= "#39C5CF";
        // @ts-ignore
        ti.current.style.color= "#F95E50";
    }else{
        // @ts-ignore
        du_strong.current.style.color= "#383838";
        // @ts-ignore
        ti_strong.current.style.color= "#383838";
    }
  }
  function timeLeft(start:any,end:any){
    let duration = intervalToDuration({
    start: start, 
    end:  end,
    });
    const units = ['years', 'months', 'weeks', 'days']
    const nonzero = Object.entries(duration).filter(([_, value]) => value || 0 > 0).map(([unit, _]) => unit)
    return formatDuration(duration, {
    format: units.filter(i => new Set(nonzero).has(i)).slice(0, 3),
    delimiter: ', '
    })
  }  
  const getTasks = async () => {   
    try {
      const data = await axios(`${url}/api/tasks/client/index/${id}`, {
        signal: controller.signal,
        headers:{
          Authorization:user.token
        }
      });
      setError(null);
      return data.data.item;
    } catch (error: any) {      
      if (error.name !== "CanceledError") {
        setTask([]);
        setTaskTitle(defaultTaskTitle);
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
    setTaskUpdate(!taskUpdate);
    setTask(data);
    setTaskTitle(data.task_title)
    setLoading(false);
    event.detail.complete();
  };
  const reload = async () => {
    setLoading(true);
    await present("Refreshing...");
    const data = await getTasks();
    dismiss();
    setTask(data);
    setTaskTitle(data.task_title)
    setLoading(false);
  };
  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }
  function confirm_1() {
    modal1.current?.dismiss(input.current?.value, "confirm");
    setTaskUpdate(!taskUpdate);
  }
  function handleDropDown(type:string) {
   setDropDown((pre:any)=>{
      return {
        ...pre,
        [type]:!pre[type]
      }
   });
  }  
  function validator(task:any,child:any,type = "str"){
   if(type === 'str'){
    if(child){
      return task?task[child]:""; 
     }else{
      return task?task:"";  
     }
   }
   if(type === 'bool'){
    if(child){
      return task?task[child]:false; 
     }else{
      return task?task:false;  
     }
   }
   if(type === 'arr'){
    if(child){
      return task?jsonCheck(task[child]):[]; 
     }else{
      return task?task:[];  
     }
   }
   if(type === 'num'){
    if(child){
      return task?task[child]:0; 
     }else{
      return task?task:0;  
     }
   }
  }
  function stepCheckerPercentage(taskU:any){
    let defaultReturn = {
      step1:0,
      step2:0,
      step3:0,
      step4:0,
      step5:0,
      step6:0,
      step7:0,
      step8:0,
      step9:0,
      step10:0,
      step11:0,
      step12:0,
      step13:0,
      step14:0,
      step15:0,
      step16:0,
      step17:0,
      step18:0,
    }
    if(!validator(task,'completed','bool')){
    if(validator(taskU,'work_order') !== "Empty"){
      if(validator(taskU,'work_order_state') === "Agree"){
        setPercentage(1);
        if(validator(taskU,'second_measurement',"bool")){
          setPercentage(2)
        if(validator(taskU,'design_agreement') !== "Empty"){
          if(validator(taskU,'design_agreement_state') === "Agree"){
            setPercentage(3)
          if(validator(taskU,'color_agreement') !== "Empty"){
            if(validator(taskU,'color_agreement_state') === "Agree"){
              setPercentage(4)
            if(validator(taskU,'key_handed',"bool")){
                setPercentage(5)
              if(validator(taskU,'accessories',"arr") && validator(taskU,'accessories',"arr").length > 0){
                setPercentage(6)
                  if(validator(taskU,'showroom_detail_design',"bool")){
                    setPercentage(7);
                    if(validator(taskU,'workshop_production_team',"bool")){
                      setPercentage(8);
                      if(validator(taskU,'final_measure',"bool")){
                        setPercentage(10);
                        if(validator(taskU,'machine',"bool")){
                          setPercentage(40)
                          if(validator(taskU,'carpentry',"bool")){
                            setPercentage(55)
                            if(validator(taskU,'sanding',"bool")){
                              setPercentage(70)
                              if(validator(taskU,'final_payment_request',"bool")){
                                setPercentage(75);
                                if(validator(taskU,'painting',"bool")){
                                  setPercentage(87)
                                  if(validator(taskU,'assembly',"bool")){
                                    setPercentage(97)
                                    if(validator(taskU,'delivered',"bool")){
                                      setPercentage(100);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          }
        }
        }
      }
    }
    }else{
      setPercentage(100);
    }
    return defaultReturn;
  }
  function stepChecker(){
    let defaultReturn = {
      step1:0,
      step2:0,
      step3:0,
      step4:0,
      step5:0,
      step6:0,
      step7:0,
      step8:0,
      step9:0,
      step10:0,
      step11:0,
      step12:0,
      step13:0,
      step14:0,
      step15:0,
      step16:0,
      step17:0,
      step18:0,
    }
    let defaultReturnDone = {
      step1:2,
      step2:2,
      step3:2,
      step4:2,
      step5:2,
      step6:2,
      step7:2,
      step8:2,
      step9:2,
      step10:2,
      step11:2,
      step12:2,
      step13:2,
      step14:2,
      step15:2,
      step16:2,
      step17:2,
      step18:2,
    }
    if(!validator(task,'completed','bool')){
    if(validator(task,'work_order') !== "Empty"){
      defaultReturn.step1 = 1;
      if(validator(task,'work_order_state') === "Agree"){
        defaultReturn.step1 = 2;
        defaultReturn.step2 = 1;
        if(validator(task,'second_measurement',"bool")){
          defaultReturn.step2 = 2;
        if(validator(task,'design_agreement') !== "Empty"){
          defaultReturn.step3 = 1;
          if(validator(task,'design_agreement_state') === "Agree"){
            defaultReturn.step3 = 2;
          if(validator(task,'color_agreement') !== "Empty"){
            defaultReturn.step4 = 1;
            if(validator(task,'color_agreement_state') === "Agree"){
              defaultReturn.step4 = 2;
              defaultReturn.step5 = 1;
            if(validator(task,'key_handed',"bool")){
                defaultReturn.step5 = 2;
                defaultReturn.step6 = 1;
              if(validator(task,'accessories',"arr") && validator(task,'accessories',"arr").length > 0){
                defaultReturn.step6 = 2;
                defaultReturn.step7 = 1;
                  if(validator(task,'showroom_detail_design',"bool")){
                    defaultReturn.step7 = 2;
                    defaultReturn.step8 = 1;
                    if(validator(task,'workshop_production_team',"bool")){
                      defaultReturn.step8 = 2;
                      defaultReturn.step9 = 1;
                      if(validator(task,'final_measure',"bool")){
                        defaultReturn.step9 = 2;
                        defaultReturn.step10 = 1;
                        if(validator(task,'machine',"bool")){
                          defaultReturn.step10 = 2;
                          defaultReturn.step11 = 1;
                          if(validator(task,'carpentry',"bool")){
                            defaultReturn.step11 = 2;
                            defaultReturn.step12 = 1;
                            if(validator(task,'sanding',"bool")){
                              defaultReturn.step12 = 2;
                              defaultReturn.step13 = 1;
                              if(validator(task,'final_payment_request',"bool")){
                                defaultReturn.step13 = 2;
                                defaultReturn.step14 = 1;
                                if(validator(task,'painting',"bool")){
                                  defaultReturn.step14 = 2;
                                  defaultReturn.step15 = 1;
                                  if(validator(task,'assembly',"bool")){
                                    defaultReturn.step15 = 2;
                                    defaultReturn.step16 = 1;
                                    if(validator(task,'delivered',"bool")){
                                      defaultReturn.step16 = 2;
                                      defaultReturn.step17 = 1;
                                      if(validator(task,'customer_satisfaction') !== "Pending"){
                                        defaultReturn.step17 = 2;
                                        defaultReturn.step18 = 1;
                                        if(validator(task,'comment') !== "Empty"){
                                          defaultReturn.step18 = 2;
                                        }
                                        if(!validator(task,'completed','bool')){
                                          taskCompleted(); 
                                        }
                                     
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          }
        }
        }
      }
    }
    }else{
     defaultReturn = defaultReturnDone;
    }
    return defaultReturn;
  }
  async function taskCompleted(){
  try {
   await axios.patch(`${url}/api/tasks/client/${id}`,{completed:true},{
    headers:{
     Authorization:user.token 
    }
   })  
   Toast(presentIonToast,"Task completed successfully!",checkmarkCircleOutline) 
  } catch (error) {
   const {message,status} = errorResponse(error);
   if(message && status){
     Toast(presentIonToast,message,informationCircleOutline);
   }else{
    Toast(presentIonToast,failMessage,informationCircleOutline)
   }  
  }
  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setOpenModal(false)
    setOpenInsertModal(false);
  }
  const handleModal = (type:any)=>{
   setTaskStatus({
    ...task,
    type
   });
   setOpenModal(true); 
  }
  const handleInsertModal = (type:any)=>{
   setTaskStatus({
    ...task,
    type,
    token:user && user.token?user.token:""
   });
   setOpenInsertModal(true); 
  }
  const handleCheckStep = (step:number)=>{
    Toast(presentIonToast,step === 2?"Task already completed":"Task is on progress",analyticsOutline)    
  }
  const handleDelivered = (step:number)=>{
    presentAlert({
    header:'Delivery Conformation',  
    message: "Have you received your product? Let us know and we'll be sure to take care of you.",
    backdropDismiss:false,
    buttons: [
    {
    text: 'NO',
    role: 'cancel',
    handler: () => {
   
    },
    },
    {
    text: 'YES',
    role: 'confirm',
    handler: async() => {
      try {
      await axios.patch(`${url}/api/tasks/client/${validator(task,'task_id','num')}`,{delivered:true},{
        headers:{
          Authorization:user.token
        }
      })
      setTaskUpdate(!taskUpdate);
      Toast(presentIonToast,"Task Completed Successfully",checkmarkCircleOutline);
    } catch (error) {
      const {message,status} = errorResponse(error);
      if(message && status){
        Toast(presentIonToast,message,informationCircleOutline)
      }else{
        Toast(presentIonToast,failMessage,informationCircleOutline)
      } 
    }
    },
    },
    ],
    onDidDismiss: (e: CustomEvent) => {
      
    },
    })
 
  }
  const headerDropDownHandler =  ()=>{
   setDropDownHeader(!dropDownHeader);
  }
  const handle_customer_satisfaction = async(e:React.FormEvent)=>{
    e.preventDefault();
  const InputComment = comment.current?.value?.toString().trim(); 
  const InputSelect = select.current?.value?.toString().trim(); 
  const add_customer_satisfaction = async()=>{
    try {
      await axios.patch(`${url}/api/tasks/client/${id}`,{
        customer_satisfaction:InputSelect,
        comment:InputComment?InputComment:"Empty"
      },{
        headers:{
          Authorization:user.token
        }
      }) 
      dismiss()
      setTaskUpdate(!taskUpdate);
    Toast(presentIonToast,"task completed",informationCircleOutline);
    } catch (error) {
      dismiss()
      const {message,status} = errorResponse(error);
         if(message && status){
          Toast(presentIonToast,message,informationCircleOutline);
         }else{
          Toast(presentIonToast,failMessage,informationCircleOutline);
         }
    }
  }
   if(InputSelect){
    await present("finishing task...");
    add_customer_satisfaction();
   }else{
    Toast(presentIonToast,"select customer satisfaction",informationCircleOutline);
   }
  }
  const handleCommentSub = (e: any) => {
    if (e.detail.value.length >= 80) {
      // @ts-ignore
      comment.current.value = e.detail.value.toString().slice(0, 80);
      Toast(presentIonToast,"comment must be below 80 character",informationCircleOutline);
    }
  };
  const finalPaymentCheck = ()=>{
    var y = new Date().getFullYear();
    var m = new Date().getMonth();
    var d = new Date().getDay();  
   const lastTimeUpdatedAt = async()=>{
     const lastTime = await getTasks();
     if(lastTime){
      let temp = lastTime.updatedAt.toString().split("T")[0].split("-");
      return  `${temp[1]}/${temp[2]}/${temp[0]}`;
     }else{
      return `${m}/${d}/${y}`;
     }
   }  
   let step = stepChecker().step13;
   let res = true;
   var date = `${m}/${d}/${y}`;
   var lastTimeUpdatedAtReturn:any = lastTimeUpdatedAt();
   let Difference_In_Time = new Date(date).getTime() -  new Date(lastTimeUpdatedAtReturn).getTime();
   var Difference_In_Days = Math.round(Math.abs(Difference_In_Time / (1000 * 3600 * 24))); 
  
   if(step === 1){
    if(Difference_In_Days > 15){
     res = false;
    }
   }
   return res;
  }
  const handleClientClick = (drop:string,tk:string,status:boolean)=>{
   const toastStep = ()=>{
    switch(drop){
     case 'work_order':
      return "Work order"
     case 'design_agreement':
      return "Design"
     case 'color_agreement':
      return "Color"
    }
   }
   (async()=>{
    try {
     await axios.patch(`${url}/api/tasks/client/${id}`,{
        [tk]:status?"Agree":"Disagree"
      },
     {
            headers: {
              Authorization: user.token,
            },
          }
      );
      setTaskUpdate(!taskUpdate);
      if(status){
        Toast(presentIonToast,`${toastStep()} step completed`,checkmarkCircleOutline);
      }else{
        setDropDown((pre)=>{
          return{
             ...pre,
             [drop]:false
          }
        })
        Toast(presentIonToast,"we will contact you soon",checkmarkCircleOutline);
      }
    } catch (error) {
      Toast(presentIonToast,"Task on load please wait..",informationCircleOutline);
    }
   })()
  
  }
  useEffect(()=>{
    pushStack!({path:'task_view',id:route?.id,info:route?.info});
  },[]);

  Keyboard.addListener('keyboardDidShow', info => {
    setFormPosition({top:`-${info.keyboardHeight + 20}px`})
  });

  Keyboard.addListener('keyboardDidHide', () => {
   setFormPosition({top:0})
  });

  if (error) {
    return (
      <IonPage>
       <ToolBarDetails defaultValue={{path:"Task",id:null,info:null}} title={taskTitle}/>
        <ErrorFallBack error={error} reload={reload} />
      </IonPage>
    );
  } else {
  return (
    <IonPage>
       <ToolBarDetails defaultValue={{path:"Task",id:null,info:null}} title={taskTitle}/>
       <IonCard className='ion-no-padding ion-no-margin'>
         <IonCardHeader className='ion-text-center tps-progress-bar-header'>
          <IonTitle>Task Progress</IonTitle>
          <span onClick={headerDropDownHandler} className='tps-progress-bar-icon'><IonIcon color='primary' size='large' icon={dropDownHeader?chevronUpCircleSharp:chevronDownCircleSharp}/></span>
         </IonCardHeader>
          <IonCardContent className='ion-padding'>
               <section className={dropDownHeader?`tps-progress-bar bar-on`:`tps-progress-bar bar-off`}>
              <div className="single-chart">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                <path className="circle-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{percentage}%</text>
                </svg>
              </div>
               <div className='tps-progress-bar-day'>
                <p ref={du}><strong ref={du_strong}>Task Duration : </strong>{!validator(task,'completed','bool')?(finalPaymentCheck() && stepChecker().step7 !== 0  &&  validator(task,'task_due_date') && validator(task,'task_due_date').split(":").length === 2?validator(task,'task_due_date').split(":")[1]:"Not Available"):<span style={{color:'#76B440'}}>Completed</span>}</p>
                <p ref={ti}><strong ref={ti_strong}>Time Left : </strong> {!validator(task,'completed','bool')?(finalPaymentCheck() && stepChecker().step7 !== 0  && validator(task,'task_due_date') && validator(task,'task_due_date').split(":").length === 2 ?timeLeft(new Date(),new Date(validator(task,'task_due_date').split(":")[0])):"Not Available"):<span style={{color:'#76B440'}}>Completed</span>}</p>
               </div>
            </section>
            
          </IonCardContent>
         </IonCard>
       <IonContent>
       <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
            {!loading && <IonRefresherContent />}
       </IonRefresher>
        {loading && stepChecker().step17  !== 1 &&
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
        {stepChecker().step17  === 1 ?( 
           <div className="form-app" style={formPosition}>
            <div className="form-app-core">
              <h3>
                <span>How was it?</span>
              </h3>
            <div  className='customer_feedback'>
              <form onSubmit={handle_customer_satisfaction} className='customer_satisfaction'>
              <IonList>
                <IonRadioGroup allowEmptySelection={false} ref={select}>
                  <IonItem lines='none'>
                  <IonLabel>BAD</IonLabel>
                  <IonRadio aria-label='BAD' slot="end" value="BAD"></IonRadio>
                  </IonItem>
                  <IonItem lines='none'>
                  <IonLabel>UNSATISFIED</IonLabel>
                  <IonRadio  aria-label='UNSATISFIED' slot="end" value="UNSATISFIED"></IonRadio>
                  </IonItem>
                  <IonItem lines='none'>
                  <IonLabel>NEUTRAL</IonLabel>
                  <IonRadio aria-label='NEUTRAL' slot="end" value="NEUTRAL"></IonRadio>
                  </IonItem>
                  <IonItem lines='none'>
                  <IonLabel>GOOD</IonLabel>
                  <IonRadio aria-label='GOOD' slot="end" value="GOOD"></IonRadio>
                  </IonItem>
                  <IonItem lines='none'>
                  <IonLabel>SATISFIED</IonLabel>
                  <IonRadio aria-label='BAD' slot="end" value="SATISFIED"></IonRadio>
                  </IonItem>
                </IonRadioGroup>
              </IonList>
              <IonText style={{paddingLeft:'2%'}} className='ion-margin'>Comment <IonText color="medium">(optional)</IonText></IonText>
              <IonTextarea className="ionInput ion-margin comment_section" onIonInput={handleCommentSub} ref={comment} fill='outline'  placeholder='Write your comment here'  required={false}></IonTextarea>
              <IonButton className='ion-margin-top' type='submit' expand='block'>Comment <IonIcon icon={paperPlaneSharp} size="small" slot='start'/> </IonButton>
              </form>
            </div>    
            </div></div>):(<section className='task_progress'>
         <div className='task_progress-box'>
          <div className='task_progress-box--items task_progress-box--items_confirm_parent'>
            <div>
            <IonChip>1</IonChip>
            <IonText>Work Order</IonText>
            <IonButton onClick={()=>{handleModal("work_order")}}id="open-modal-task">View</IonButton>
            <h4>{stepChecker().step1 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
             {stepChecker().step1 === 1 && validator(task,'work_order_state') !=="Agree" && 
              <span onClick={()=>{
              handleDropDown("work_order")}} className='choice_dropdown'>
                <IonIcon size='large'  icon={dropDown.work_order?chevronUpSharp:chevronDownSharp}/> 
              </span>}
            </div>
            <div className={stepChecker().step1 === 1 && dropDown.work_order?'on':'off'}>
                <IonButton onClick={()=>{handleClientClick('work_order','work_order_state',true)}} color="primary"><IonIcon slot='end' color='success' icon={checkmarkCircle}/> Yes</IonButton>
                <IonButton onClick={()=>{handleClientClick('work_order','work_order_state',false)}} color="primary"><IonIcon slot="end" color='danger' icon={closeCircle}/>  No</IonButton>
            </div>
              {stepChecker().step1 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step1 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step1 === 2 &&  <div className={`view_task_backdrop green` }></div>}   
          </div>
          <div className='task_progress-box--items'>
            <IonChip>2</IonChip>
            <IonText>Second Measurement</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step2)
            }}>{stepChecker().step2 === 0 || stepChecker().step2 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step2 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step2 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step2 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step2 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>    
          <div className='task_progress-box--items task_progress-box--items_confirm_parent'>
            <div>
            <IonChip>3</IonChip>
            <IonText>Design Agreement</IonText>
            <IonButton onClick={()=>{handleModal("design_agreement")}}id="open-modal-task">View</IonButton>
            <h4>{stepChecker().step3 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
             {stepChecker().step3 === 1 && validator(task,'design_agreement_state') !=="Agree" &&  <span onClick={()=>{
              handleDropDown("design_agreement")
             }} className='choice_dropdown'><IonIcon size='large'  icon={dropDown.design_agreement?chevronUpSharp:chevronDownSharp}/> </span>}
            </div>
            <div className={stepChecker().step3 === 1 && dropDown.design_agreement?'on':'off'}>
                <IonButton onClick={()=>{handleClientClick('design_agreement','design_agreement_state',true)}} color="primary"><IonIcon slot='end' color='success' icon={checkmarkCircle}/> Yes</IonButton>
                <IonButton onClick={()=>{handleClientClick('design_agreement','design_agreement_state',false)}} color="primary"><IonIcon slot="end" color='danger' icon={closeCircle}/>  No</IonButton>
            </div>
            {stepChecker().step3 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step3 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step3 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items task_progress-box--items_confirm_parent'>
            <div>
            <IonChip>4</IonChip>
            <IonText>Color Agreement</IonText>
            <IonButton onClick={()=>{handleModal("color_agreement")}}id="open-modal-task">View</IonButton>
            <h4>{stepChecker().step4 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
             {stepChecker().step4 === 1 && validator(task,'color_agreement_state') !=="Agree" &&  <span onClick={()=>{
              handleDropDown("color_agreement")
             }} className='choice_dropdown'><IonIcon size='large'  icon={dropDown.color_agreement?chevronUpSharp:chevronDownSharp}/> </span>}
            </div>
            <div className={stepChecker().step4 === 1 && dropDown.color_agreement?'on':'off'}>
                <IonButton onClick={()=>{handleClientClick('color_agreement','color_agreement_state',true)}} color="primary"><IonIcon slot='end' color='success' icon={checkmarkCircle}/> Yes</IonButton>
                <IonButton onClick={()=>{handleClientClick('color_agreement','color_agreement_state',false)}} color="primary"><IonIcon slot="end" color='danger' icon={closeCircle}/>  No</IonButton>
            </div>
            {stepChecker().step4 === 0 &&  <div className={`view_task_backdrop red`}></div>} 
            {stepChecker().step4 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step4 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div> 
          <div className='task_progress-box--items'>
            <IonChip>5</IonChip>
            <IonText>Key Handed</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step5)
            }}>{stepChecker().step5 === 0 || stepChecker().step5 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step5 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step5 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step5 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step5 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>6</IonChip>
            <IonText>Accessories</IonText>
            <IonButton onClick={()=>{handleInsertModal(stepChecker().step6)}} id="open-modal-insert-acc">Add</IonButton>
            <h4>{stepChecker().step6 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step6 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step6 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step6 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>7</IonChip>
            <IonText>Showroom Detail Design</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step7)
            }}>{stepChecker().step7 === 0 || stepChecker().step7 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step7 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step7 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step7 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step7 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>8</IonChip>
            <IonText>Workshop Production Team</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step8)
            }}>{stepChecker().step8 === 0 || stepChecker().step8 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step8 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step8 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
            {stepChecker().step8 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
            {stepChecker().step8 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>9</IonChip>
            <IonText>Final Measure</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step9)
            }}>{stepChecker().step9 === 0 || stepChecker().step9 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step9 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step9 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step9 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step9 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>10</IonChip>
            <IonText>Machine</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step10)
            }}>{stepChecker().step10 === 0 || stepChecker().step10 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step10 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step10 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step10 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step10 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>11</IonChip>
            <IonText>Carpentry</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step11)
            }}>{stepChecker().step11 === 0 || stepChecker().step11 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step11 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step11 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step11 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step11 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>12</IonChip>
            <IonText>Sanding</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step12)
            }}>{stepChecker().step12 === 0 || stepChecker().step12 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step12 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step12 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step12 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step12 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>13</IonChip>
            <IonText>Final Payment Request</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step13)
            }}>{stepChecker().step13 === 0 || stepChecker().step13 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step13 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step13 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step13 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step13 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>14</IonChip>
            <IonText>Painting</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step14)
            }}>{stepChecker().step14 === 0 || stepChecker().step14 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step14 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step14 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step14 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step14 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>15</IonChip>
            <IonText>Assembly</IonText>
            <IonButton onClick={()=>{
              handleCheckStep(stepChecker().step15)
            }}>{stepChecker().step15 === 0 || stepChecker().step15 === 1?'check':'checked'}</IonButton>
            <h4>{stepChecker().step15 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step15 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step15 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step15 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
          <div className='task_progress-box--items'>
            <IonChip>16</IonChip>
            <IonText>Delivered</IonText>
            <IonButton onClick={()=>{
              handleDelivered(stepChecker().step16)
            }}>{stepChecker().step16 === 0 || stepChecker().step16 === 1?'NO':'Yes'}</IonButton>
            <h4>{stepChecker().step16 === 2?<IonIcon className='done' color='light' icon={checkmarkDone}/>:<IonIcon color='light' className='pending' icon={helpOutline}/>}</h4>
            {stepChecker().step16 === 0 &&  <div className={`view_task_backdrop red` }></div>} 
              {stepChecker().step16 === 1 &&  <div className={`view_task_backdrop backdrop_hide` }></div>} 
              {stepChecker().step16 === 2 &&  <div className={`view_task_backdrop green` }></div>}  
          </div>
        </div>  
      </section>)
        }
       <ViewFileModal setTaskStatus={setTaskStatus} taskStatus={taskStatus} confirm={confirm} modal={modal} openModal={openModal} setOpenModal={setOpenModal} onWillDismiss={onWillDismiss}/>
       <InputModal setTaskStatus={setTaskStatus} taskStatus={taskStatus} confirm={confirm_1} modal={modal1} openModal={insertOpenModal} setOpenModal={setOpenInsertModal} onWillDismiss={onWillDismiss}/>
      </IonContent>
      <div className="spacer_drawer"></div>
    </IonPage>
  );
}
};

export default ViewTask;
