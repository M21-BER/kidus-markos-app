import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonText, useIonToast } from "@ionic/react";
import { informationCircleOutline, paperPlaneSharp, personCircleOutline } from "ionicons/icons";
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
    if (e.detail.value.length >= 200) {
      // @ts-ignore
      review.current.value = e.detail.value.toString().slice(0, 200);
      Toast(presentIonToast,"review must be below 200 character",informationCircleOutline);
    }
  };
  const rev  = (arr:[])=>{
    let arr1:[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      arr1.push(arr[i]);
    }
    return arr1;
  }

return (
    <>
<IonCard className='km-detail-review' color='warning'>
    <IonCardContent className="ion-padding">
    <div>
    <form onSubmit={handleReview} >
    <IonInput   clearInput={true} className="ionInput" onIonInput={handleReviewSub} ref={review} fill='outline'  placeholder='Write your message here' type='text' required={false}></IonInput>
    <IonButton className='ion-margin-top' type='submit' expand='block'>Send Review <IonIcon icon={paperPlaneSharp} size="small" slot='start'/> </IonButton>
    </form>
    </div>
    </IonCardContent>
</IonCard>
    <>
      {
        (reviewList.length === 0)? 
        <div className='km-card-content ion-text-center'><IonText color='medium'>No reviews for this item</IonText></div>:
        rev(jsonCheck(reviewList)).map((r:any,index:number)=>{
           return <IonCard key={index}   color='warning'>
              <IonCardContent className="ion-no-padding review-card-parent"  color='warning'>
                <div className="review-card">
                <IonText style={{textTransform:'capitalize',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'3px'}}><IonIcon icon={personCircleOutline}/> {r.name}</IonText>
                <IonText className="ion-margin-top" color="medium">{formatDistance(new Date(parseInt(r.reviewTime)), new Date(),{addSuffix: true, })}</IonText>
                <IonText className="ion-margin-bottom review-card-msg" color="medium">{r.msg}</IonText>
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