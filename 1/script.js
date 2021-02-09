// Made with Zdog

// ----- variables ----- //

const TAU = Zdog.TAU;
const dotCount = 96;
const loopCount = 3;
const alpha = 0.7;
const stroke = 10;
let isSpinning = true;

// ----- model ----- //

let illo = new Zdog.Illustration({
  element: '.illo',
  zoom: 7,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

function getFoilPoint( i ) {
  let theta = i/dotCount * TAU;
  let x1 = Math.cos( theta ) * ( 1 - alpha );
  let y1 = Math.sin( theta ) * ( 1 - alpha );
  let x2 = Math.sin( theta * ( loopCount - 1 ) ) * alpha;
  let y2 = Math.cos( theta * ( loopCount - 1 ) ) * alpha;
  let z = Math.cos( theta * loopCount );
  let x = ( x1 + x2 ) * 20;
  let y = ( y1 + y2 ) * 20;
  z *= 7;
  
  return { x, y, z };
}

for ( let i=0; i < dotCount; i++ ) {
  let point0 = getFoilPoint( i );
  let point1 = getFoilPoint( i + 1 );
  let hue = Math.round( Math.cos( i/dotCount * TAU ) * 60 ) + 330;
  
  new Zdog.Shape({
    path: [ point0, point1 ],
    addTo: illo,
    stroke,
    color: `hsl(${hue}, 80%, 50%)`,
  });
}

 

// ----- animate ----- //
let t = 0;

function animate() {
  if ( isSpinning ) {
    t += 1/240;
    illo.rotate.y = Zdog.easeInOut( t % 1 ) * TAU * 2;
  }

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();