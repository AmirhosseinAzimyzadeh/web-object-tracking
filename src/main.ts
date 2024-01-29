import initiateTracker from './initiateTracker';
import initiateCanvasElement from './initiateCanvasElement';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import drawBoundingBox, { Point } from './drawBoundingBox';

import './style.css';


function main() {
  const [canvas, video] = initiateCanvasElement();

  // add video element to DOM
  const parent = document.createElement('div');
  parent.classList.add('video-container');
  parent.appendChild(video);
  parent.appendChild(canvas);
  document.getElementById('app')!.appendChild(parent);

  initiateTracker().then((tracker: handPoseDetection.HandDetector | null) => {
    if (tracker === null) return;

    const frameHandler = () => {
      tracker.estimateHands(video).then((hands) => {
        const hand2DPoints: Array<Array<Point>> = hands.map((hand) => {
          return hand.keypoints.map((k) => ({ x: k.x, y: k.y }))
        });
        drawBoundingBox(hand2DPoints, canvas);
        requestAnimationFrame(frameHandler);
      });
    }

    frameHandler();

  });
}

main();
