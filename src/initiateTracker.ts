import * as tf from '@tensorflow/tfjs';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

export default async function initiateTracker(): Promise<handPoseDetection.HandDetector | null> {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;

  if (tf == null || tf == undefined) {
    alert('Error: Tensorflow not loaded');
    return null;
  }

  const detectorConfig: any = {
    runtime: 'tfjs',
    modelType: 'full'
  };


  const handTracker = await handPoseDetection.createDetector(model, detectorConfig);
  return handTracker;
}