export interface Point {
  x: number;
  y: number;
}

export default function drawBoundingBox(
  hands: Array<Array<Point>>,
  canvas: HTMLCanvasElement
) {
  
  const context = canvas.getContext('2d');
  if (context === null) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  hands.forEach((hand) => {
    const boundBox = findBoundBox(hand);
    context.beginPath();
    context.strokeStyle = '#00FF00';
    context.lineWidth = 3;
    context.rect(
      boundBox[0].x,
      boundBox[0].y,
      boundBox[1].x - boundBox[0].x,
      boundBox[1].y - boundBox[0].y
    );
    context.stroke();
  });
}

function findBoundBox(points: Array<Point>): Array<Point> {
  const xValues = points.map(point => point.x);
  const yValues = points.map(point => point.y);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  return [
    { x: xMin, y: yMin },
    { x: xMax, y: yMax }
  ];
}