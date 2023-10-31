import { IonText } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
interface Props1{
totalSec:any;
task:()=>void;
}
interface Props2{
hours:any;
minutes:any;
seconds:any;
completed:any;
api:any;

}
const CountdownTimer: React.FC<Props1> = ({ totalSec, task }) => {
  const countRef = useRef<Countdown| null>(null);
  const [time, setTime] = useState(Date.now() + totalSec);

  const resendVerificationCode = (e:any, api:any) => {
    e.preventDefault();
    setTime(Date.now() + totalSec);
    task();
  };

  const renderer = ({ hours, minutes, seconds, completed, api }:Props2) => {
    if (completed) {
      return (
        <div>
          <IonText
            color="secondary"
            className="countdownTimer"
            onClick={(e) => resendVerificationCode(e, api)}
          >
            Resend Code Again
          </IonText>
        </div>
      );
    } else {
      return (
        <div className="countdownTimer">
          <span>Didn't get the code resend in </span>
          <span>{minutes > 9 ? minutes : `0${minutes}`}</span>
          <span>{" : "}</span>
          <span>{seconds > 9 ? seconds : `0 ${seconds}`}</span>
        </div>
      );
    }
  };

  useEffect(() => {
    countRef?.current?.start();
  }, [time]);

  return (
    <Countdown
      date={time}
      renderer={renderer}
      autoStart={false}
      ref={countRef}
    ></Countdown>
  );
};

export default CountdownTimer;
