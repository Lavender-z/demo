console.clear();
console.log('');

const config = {
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
  rows: 15,
  cols: 7 };


// 公用

const randomRange = (min, max) => min + Math.random() * (max - min);

const randomIndex = array => randomRange(0, array.length) | 0;

const removeFromArray = (array, i) => array.splice(i, 1)[0];

const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));

const removeRandomFromArray = array => removeFromArray(array, randomIndex(array));

const getRandomFromArray = (array) =>
array[randomIndex(array) | 0];



const resetPeep = ({ stage, peep }) => {
  const direction = Math.random() > 0.5 ? 1 : -1;

  // 使用 ease 函数将随机值倾斜到较低的值
  const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
  const startY = stage.height - peep.height + offsetY;
  let startX;
  let endX;

  if (direction === 1) {
    startX = -peep.width;
    endX = stage.width;
    peep.scaleX = 1;
  } else {
    startX = stage.width + peep.width;
    endX = 0;
    peep.scaleX = -1;
  }

  peep.x = startX;
  peep.y = startY;
  peep.anchorY = startY;

  return {
    startX,
    startY,
    endX };

};

const normalWalk = ({ peep, props }) => {
  const {
    startX,
    startY,
    endX } =
  props;

  const xDuration = 10;
  const yDuration = 0.25;

  const tl = gsap.timeline();
  tl.timeScale(randomRange(0.5, 1.5));
  tl.to(peep, {
    duration: xDuration,
    x: endX,
    ease: 'none' },
  0);
  tl.to(peep, {
    duration: yDuration,
    repeat: xDuration / yDuration,
    yoyo: true,
    y: startY - 10 },
  0);

  return tl;
};

const walks = [
normalWalk];



class Peep {
  constructor({
    image,
    rect })
  {
    this.image = image;
    this.setRect(rect);

    this.x = 0;
    this.y = 0;
    this.anchorY = 0;
    this.scaleX = 1;
    this.walk = null;
  }

  setRect(rect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];

    this.drawArgs = [
    this.image,
    ...rect,
    0, 0, this.width, this.height];

  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    ctx.drawImage(...this.drawArgs);
    ctx.restore();
  }}


const img = document.createElement('img');
img.onload = init;
img.src = config.src;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const stage = {
  width: 0,
  height: 0 };


const allPeeps = [];
const availablePeeps = [];
const crowd = [];

function init() {
  createPeeps();

  // 调整大小-填充阶段
  resize();

  gsap.ticker.add(render);
  window.addEventListener('resize', resize);
}

function createPeeps() {
  const {
    rows,
    cols } =
  config;
  const {
    naturalWidth: width,
    naturalHeight: height } =
  img;
  const total = rows * cols;
  const rectWidth = width / rows;
  const rectHeight = height / cols;

  for (let i = 0; i < total; i++) {
    allPeeps.push(new Peep({
      image: img,
      rect: [
      i % rows * rectWidth,
      (i / rows | 0) * rectHeight,
      rectWidth,
      rectHeight] }));


  }
}

function resize() {
  stage.width = canvas.clientWidth;
  stage.height = canvas.clientHeight;
  canvas.width = stage.width * devicePixelRatio;
  canvas.height = stage.height * devicePixelRatio;

  crowd.forEach(peep => {
    peep.walk.kill();
  });

  crowd.length = 0;
  availablePeeps.length = 0;
  availablePeeps.push(...allPeeps);

  initCrowd();
}

function initCrowd() {
  while (availablePeeps.length) {
    // 设置随机的两个进程
    addPeepToCrowd().walk.progress(Math.random());
  }
}

function addPeepToCrowd() {
  const peep = removeRandomFromArray(availablePeeps);
  const walk = getRandomFromArray(walks)({
    peep,
    props: resetPeep({
      peep,
      stage }) }).

  eventCallback('onComplete', () => {
    removePeepFromCrowd(peep);
    addPeepToCrowd();
  });

  peep.walk = walk;

  crowd.push(peep);
  crowd.sort((a, b) => a.anchorY - b.anchorY);

  return peep;
}

function removePeepFromCrowd(peep) {
  removeItemFromArray(crowd, peep);
  availablePeeps.push(peep);
}

function render() {
  canvas.width = canvas.width;
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);

  crowd.forEach(peep => {
    peep.render(ctx);
  });

  ctx.restore();
}
