import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core';
import { useState } from 'react';
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import pdf from '../../assets/floor_plan.pdf'
import { url } from '../../utils/utils';


interface Props{
modal:React.RefObject<HTMLIonModalElement>
onWillDismiss:(ev: CustomEvent<OverlayEventDetail>)=>void
openModal: boolean
setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
setTaskStatus:React.Dispatch<any>
confirm: ()=>void;
taskStatus:any;
}

const ViewFileModal: React.FC<Props> = ({setTaskStatus,taskStatus,modal,onWillDismiss,openModal,setOpenModal,confirm}) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [defaultPdfFile] = useState(pdf);
  
    return (
        <IonModal 
        className='modal-task'
        ref={modal}
        trigger="open-modal-task"
        isOpen={openModal}
        onWillDismiss={(ev) => onWillDismiss(ev)}>
       <IonHeader>
         <IonToolbar color="primary">
           <IonButtons slot="start">
             <IonButton onClick={() =>{
                setTaskStatus(null);
                setOpenModal(false);
                }}>Back</IonButton>
           </IonButtons>
           <IonButtons slot="end">
             <IonButton strong={true} onClick={() => confirm()}>
               OK
             </IonButton>
           </IonButtons>
         </IonToolbar>
       </IonHeader>
         <IonContent>
           <div className="pdf-container">
            {
                defaultPdfFile && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer  fileUrl={pdf} plugins={[defaultLayoutPluginInstance]}/>
                </Worker>
            }
           </div>
         </IonContent>
         </IonModal>
    );
};

export default ViewFileModal;