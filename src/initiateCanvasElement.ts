// This function will not add the element to the DOM
export default function initiateCanvasElement(
  drawAfter?: (canvas: HTMLCanvasElement) => void
): [HTMLCanvasElement, HTMLVideoElement] {
  const canvasElement = document.createElement('canvas');
  const videoElement = document.createElement('video');
  canvasElement.width = 640;
  canvasElement.height = 480;
  videoElement.width = 640;
  videoElement.height = 480;

  // connect webcam to video element
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then((stream) => {
    // render frame from webcam to canvas
    videoElement.srcObject = stream;

    videoElement.addEventListener('loadeddata', () => {
      videoElement.play();
    });

    const frameHandler = () => {
      const context = canvasElement.getContext('2d');
      // flip image horizontally
      context.scale(-1, 1);
      requestAnimationFrame(frameHandler);
    }
    frameHandler();

  }).catch(console.error);
  
  return [canvasElement, videoElement];
}