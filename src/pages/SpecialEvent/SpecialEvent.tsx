import './SpecialEvent.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { jsonCheck, url } from '../../utils/utils';
import ImageComponent from '../../components/UI/Image';
import { useAxios } from '../../hooks/useAxios';
const settings = {
    showThumbs: false,
    infiniteLoop: true,
    emulateTouch: true,
    interval: 4000,
  };
const SpecialEvent: React.FC = () => {
    const [detail, isPending, error] = useAxios(
        `${url}/api/event`
      );
  const checkEventDate = ()=>{
    var y = new Date().getFullYear();
    var m = new Date().getMonth();
    var d = new Date().getDay();  
    var date = `${m}/${d}/${y}`;
    let Difference_In_Time =   new Date(detail[0].event_due_date).getTime() - new Date(date).getTime();
    var Difference_In_Days = Math.round((Difference_In_Time / (1000 * 3600 * 24))); 
    if(Difference_In_Days > 0){
      return true;
    }else{
      return false;
    }
  }      
 if(!isPending){
    if(error){
      return null
    }else{
       if(detail && detail.length !== 0 && checkEventDate() ){
        return (
             <div className="special-event">
            <Carousel {...settings} autoPlay>
              {jsonCheck(detail[0].event_images).map(
                  (image: any, index: number) => {
                    return (
                      <div key={index}>
                        <ImageComponent
                         className = ""
                        src={image.url}
                        hash={image.hash}
                        label={detail[0].event_name}
                      />
                       <p className="legend">{detail[0].event_quota}</p>
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