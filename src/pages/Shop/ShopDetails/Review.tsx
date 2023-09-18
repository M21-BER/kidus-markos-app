import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonText, useIonToast } from "@ionic/react";
import { informationCircleOutline, paperPlaneSharp } from "ionicons/icons";
import { jsonCheck } from "../../../utils/utils";
import { formatDistance } from "date-fns";
import { Toast } from "../../../utils/CustomToast";
interface Props{
handleReview:(e:React.FormEvent)=>void;
review:React.MutableRefObject<HTMLIonInputElement | null>;
reviewList:any[];
}
const Review: React.FC<Props> = ({handleReview,review,reviewList}) => {
  const [presentIonToast] = useIonToast();
  const handleReviewSub = (e: any) => {
    if (e.detail.value.length >= 80) {
      // @ts-ignore
      review.current.value = e.detail.value.toString().slice(0, 80);
      Toast(presentIonToast,"review must be below 80 character",informationCircleOutline);
    }
  };

return (
    <>
<IonCard className='km-detail-review' color='warning'>
    <IonCardContent className="ion-padding">
    <div>
    <form onSubmit={handleReview} >
    <IonInput className="ionInput" onIonInput={handleReviewSub} ref={review} fill='outline'  placeholder='Write your message here' type='text' required={false}></IonInput>
    <IonButton className='ion-margin-top' type='submit' expand='block'>Send Review <IonIcon icon={paperPlaneSharp} size="small" slot='start'/> </IonButton>
    </form>
    </div>
    </IonCardContent>
</IonCard>
    <>
      {
        (reviewList.length === 0)? 
        <div className='km-card-content ion-text-center'><IonText color='medium'>No reviews for this item</IonText></div>:
        jsonCheck(reviewList).map((r:any,index:number)=>{
           return <IonCard key={index}   color='warning'>
              <IonCardContent className="ion-no-padding review-card-parent"  color='warning'>
                <div className="review-card">
                <IonText>{r.name}</IonText>
                <IonText className="ion-margin-top" color="medium">{formatDistance(new Date(parseInt(r.reviewTime)), new Date(),{addSuffix: true, })}</IonText>
                <IonText className="ion-margin-bottom" color="medium">{r.msg}</IonText>
                </div>
              </IonCardContent>
           </IonCard>
        }) 
      }
    </>
 </>
);
};

export default Review;