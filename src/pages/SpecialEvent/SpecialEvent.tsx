import './SpecialEvent.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { failMessage, jsonCheck, url } from '../../utils/utils';
import ImageComponent from '../../components/UI/Image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { errorResponse } from '../../utils/errorResponse';
const settings = {
    showThumbs: false,
    infiniteLoop: true,
    emulateTouch: true,
    interval: 4000,
  };
interface Props{
  spacerFunc:(state:number)=>void;
  updateEvent:boolean;
}  
const SpecialEvent: React.FC<Props> = ({spacerFunc,updateEvent}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [afterUpdate, setAfterUpdate] = useState<boolean>(false);
  const controller = new AbortController();
  const checkEventDate = ()=>{
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();  
    var date = `${y}/${m}/${d}`;
    let Difference_In_Time =   new Date(events[0].event_due_date).getTime() - new Date(date).getTime();
    var Difference_In_Days = Math.round((Difference_In_Time / (1000 * 3600 * 24))); 
    if(Difference_In_Days > 0){
      return true;
    }else{
      return false;
    }
  }
  const getEvents = async () => {
    try {
      const data = await axios(`${url}/api/event`, {
        signal: controller.signal,
      });
      setError(null);
      return data.data;
    } catch (error: any) {
     if(error.code !== "ERR_NETWORK"){
      if (error.name !== "CanceledError") {
        setEvents([]);
        const {message,status}= errorResponse(error);
        if (message && status) {
          setError(error.response.data.error.message);
        } else {
          setError(failMessage);
        }
      }
    }else{
      setError(error.code);
    }
  }
  };
  useEffect(() => {
   (async () => {
    const shops = await getEvents();
    setEvents(shops);
    setLoading(false);
    setAfterUpdate(!afterUpdate);
  })()
  },[updateEvent]);

  useEffect(()=>{
    if(!error && events && events.length !== 0 && checkEventDate() ){
      spacerFunc(1);
    }else{
      spacerFunc(0);
    }
  },[loading,afterUpdate])
    
 if(!loading){
    if(error){
      return null
    }else{
       if(events && events.length !== 0 && checkEventDate() ){
        return (
             <div className="special-event">
            <Carousel {...settings} autoPlay>
              {jsonCheck(events[0].event_images).map(
                  (image: any, index: number) => {
                    return (
                      <div key={index}>
                        <ImageComponent
                         className = ""
                        src={image.url}
                        hash={image.hash}
                        label={events[0].event_name}
                      />
                       <p className="legend">{events[0].event_quota}</p>
                     </div>
                  
                    );
                  }
                )}
          </Carousel>

                     </div>
    );   
       }else{
        return null
       }
    }
 }else{
  return null
 }
};

export default SpecialEvent;