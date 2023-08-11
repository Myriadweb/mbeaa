import React, {useEffect, forwardRef, useImperativeHandle, useRef} from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
const Track = forwardRef((props, ref) => {
  /*
  set initial Y coordinate for keypoint
  set keypoints based on Y coordinate
  chapter click calls animateRect and passes in new Y coordinate;
  if y coordinate is less than begin keypoint then reverse begin and end keypoint;
  otherwise set end keypoint to new Y coordinate
  update rest of keypoints adding .02 to beginning and end keypoint
   */
  const [keyPoints, setKeyPoints] = React.useState(['.01;.06']);
  const [keyPoints2, setKeyPoints2] = React.useState(['.03;.085']);
  const [keyPoints3, setKeyPoints3] = React.useState(['.05;.11']);
  const [keyPoints4, setKeyPoints4] = React.useState(['.07;.135']);
  useImperativeHandle(ref, () => ({
    AnimateRect(num: number) {
      setKeyPoints([`${keyPoints[0].split(';')[1]};${num}`]);
      setKeyPoints2([`${keyPoints2[0].split(';')[1]};${num + .025}`]);
      setKeyPoints3([`${keyPoints3[0].split(';')[1]};${num + .05}`]);
      setKeyPoints4([`${keyPoints4[0].split(';')[1]};${num + .075}`]);
      document.querySelectorAll('animateMotion').forEach((el) => {
        // @ts-ignore
        el.beginElement();
    });
  }
  }));

  return (
    <div className="Track">
      <svg viewBox="0 0 120 900" xmlns="http://www.w3.org/2000/svg" style={{height: '100%' }}>
        <path
          fill="none"
          stroke="none"
          id="Track"
          d="m 29.06,2.98 c-4.66,22.05,37.26,40.69,41.99,72.29,4.88,32.62-37.56,91.21-37.71,116.72-.14,25.51,31.02,41.83,27.59,66.17-3.43,24.34-46.93,25.5-45.98,56.98.94,31.49,41.08,68.33,40.47,100.18-.97,50.29,58.65,60.29,56.1,88.23-2.55,27.94-98.26,47.15-96.56,85.47,1.69,38.33,27.37,78.62,26.67,106.61-.59,23.45-44.22,53.92-38.63,90.07,5.62,36.3,56.66,30.82,78.76,30.35,m82.76,816.05c.08,0,.17,0,.25,0" />
        <AnimatedTrain kp={keyPoints} points="0,0 20,0 20,8 0,8" />
        <AnimatedTrain kp={keyPoints2} points="0,0 20,0 20,8 0,8" />
        <AnimatedTrain kp={keyPoints3} points="0,0 20,0 20,8 0,8" />
        <AnimatedTrain kp={keyPoints4} points="0,0 20,0 25,4 20,8 0,8" />
      </svg>
    </div>
  );
});
const AnimatedTrain = ({kp, points}: {kp: string[], points?: string}) => {
  return (
    <polygon x="0" y="0" fill="black" stroke="black" rx="2" points={points}>
      <animateMotion
        dur="2s"
        repeatCount="0"
        rotate="auto"
        keyPoints={kp.join(';')}
        keyTimes="0;1"
        fill="freeze"
        restart="always"
      >
        <mpath xlinkHref="#Track" />
      </animateMotion>
    </polygon>
  )
}
export default Track;