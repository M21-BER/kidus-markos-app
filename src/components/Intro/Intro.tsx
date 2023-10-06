import { IonButton, IonText,} from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import Intro1 from '../../assets/intro/01.jpg';
import Intro2 from '../../assets/intro/02.jpg';
import Intro3 from '../../assets/intro/03.jpg';
import './Intro.css';

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={Intro1} alt="Intro 1" />
        <IonText className='ion-padding ion-no-margin intro-text' color="medium">Kidus Markos Woodworks, a leading woodworking company est. in 1987 G.C. to create high-quality wooden products
 for a variety of uses thanks to a talented team of craftsmen and modern machineries.</IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={Intro2} alt="Intro 2" />
        <IonText className='ion-padding ion-no-margin intro-text' color="medium">We have created our distinctive antique-style furniture for Kuriftu Resort (Debre Zeyit & Bahirdar), Diplomat Restaurant, 
Negash Lodge, Paradise Lodge, Yod Abyssinia Cultural Restaurant,
 Capital Hotel, Wudasse Hotel, and many others</IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      
      <SwiperSlide>
        <img src={Intro3} alt="Intro 3" />
        <IonText className='ion-padding ion-no-margin intro-text' color="medium">Our team of experts can help you plan, design, and furnish your space to create the perfect environment for your family or business.</IonText>
        <IonButton onClick={() => onFinish()}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;


