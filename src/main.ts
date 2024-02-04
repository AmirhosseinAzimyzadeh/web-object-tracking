import initiateTracker from './initiateTracker';
import createMediaElements from './initiateCanvasElement';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import drawBoundingBox, { Point } from './drawBoundingBox';
import Utils from './Utils';

import './style.css';


function main() {
  const [canvas, video] = createMediaElements();


  const parent = document.createElement('div');
  parent.classList.add('video-container');
  // show video and canvas on top of each other
  parent.appendChild(video);
  parent.appendChild(canvas);
  document.getElementById('app')!.appendChild(parent);

  const fingerDistance = document.createElement('div');
  fingerDistance.classList.add('finger-distance');
  document.getElementById('app')!.appendChild(fingerDistance);

  initiateTracker().then((tracker: handPoseDetection.HandDetector | null) => {
    if (tracker === null) return;

    const frameHandler = () => {
      tracker.estimateHands(video).then((hands) => {
        // console.log(hands);
        
        let thumbTip: Point | null = null;
        let indexFingerTip: Point | null = null;

        const hand2DPoints: Array<Array<Point>> = hands.map((hand) => {
          return hand.keypoints.map((k) => {
            if (k.name === 'thumb_tip') thumbTip = { x: k.x, y: k.y };
            if (k.name === 'index_finger_tip') indexFingerTip = { x: k.x, y: k.y };
            return { x: k.x, y: k.y }
          });
        });
        drawBoundingBox(hand2DPoints, canvas);
        fingerDistance.innerText = Utils.distance(thumbTip, indexFingerTip).toFixed(2);
        requestAnimationFrame(frameHandler);
      });
    }

    frameHandler();

  });
}

main();
