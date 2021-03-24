/*
动画原型参看https://dribbble.com/shots/3055734-Have-a-Happy-Halloween 和 https://dribbble.com/shots/3878696-Happy-Halloween!
*/

// 设定参数
class Ghost {
    constructor(el) {
      this.scene = el;
      this.clone = el.cloneNode(true);
      this.isEscaping = false;
      this.ghost = el.querySelector('.ghost');
      this.face = el.querySelector('.ghost-face');
      this.eyes = el.querySelector('.eyes-row');
      this.leftEye = this.eyes.querySelector('.left');
      this.rightEye = this.eyes.querySelector('.right');
      this.mouth = el.querySelector('.mouth');
      this.mouthState = 'neutral';
      this.shadow = el.querySelector('.shadow-container');
      this.leftCheek = el.querySelector('.left.cheek');
      this.leftCheek = el.querySelector('.right.cheek');
      this.leftHand = el.querySelector('.hand-left');
      this.rightHand = el.querySelector('.right-hand');
      this.activityInterval = null;
    }
    
    reset() {
      this.scene.remove();
      this.scene = this.clone.cloneNode(true);
      this.resetRefs();
      this.scene.classList.remove('stars-out');
      this.scene.style.position = 'absolute';
      this.scene.style.left = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().width - 140)) + 'px';
      this.scene.style.top = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().height - 160)) + 'px';
      this.scene.classList.add('descend');
      this.shadow.classList.add('disappear');
      document.querySelector('body').append(this.scene);
      this.enter();
    }
    
    resetRefs() {
      this.ghost = this.scene.querySelector('.ghost');
      this.face = this.scene.querySelector('.ghost-face');
      this.eyes = this.scene.querySelector('.eyes-row');
      this.leftEye = this.eyes.querySelector('.left');
      this.rightEye = this.eyes.querySelector('.right');
      this.mouth = this.scene.querySelector('.mouth');
      this.mouthState = 'neutral';
      this.isEscaping = false;
      this.shadow = this.scene.querySelector('.shadow-container');
      this.leftCheek = this.scene.querySelector('.left.cheek');
      this.leftCheek = this.scene.querySelector('.right.cheek');
      this.leftHand = this.scene.querySelector('.hand-left');
      this.rightHand = this.scene.querySelector('.right-hand');
    }

    // 眨眼睛
    blink() {
      this.leftEye.classList.add('blink');
      this.rightEye.classList.add('blink');
      setTimeout(() => {
        this.leftEye.classList.remove('blink');
        this.rightEye.classList.remove('blink');
      }, 50)
    }
    
    // 挥手动作
    wave() {
      this.leftHand.classList.add('waving');
      setTimeout(() => {
        this.leftHand.classList.remove('waving');
      }, 500);
    }
    
    // 嘴
    openMouth() {
      this.mouth.classList.remove('closed');
      this.mouth.classList.add('open');
      this.mouthState = 'open';
    }
    
    closeMouth() {
      this.mouth.classList.remove('open');
      this.mouth.classList.add('closed');
      this.mouthState = 'closed';
    }
    
    neutralMouth() {
      this.mouth.classList.remove('open');
      this.mouth.classList.remove('closed');
      this.mouthState = 'neutral';
    }
    
    // 鼠标放上时的状态
    hover() {
      this.ghost.classList.add('hover');
    }
    
    surprise() {
      this.face.classList.add('surprised');
    }
    
    // 逃离状态
    runAway() {
      clearInterval(this.activityInterval);
      if (!this.isEscaping) {
        this.isEscaping = true;
        this.scene.classList.add('run-away', 'move-stars-in');
        this.scene.classList.remove('stars-out');
        setTimeout(() => {
          this.shadow.classList.add('disappear');
          setTimeout(() => {
            this.reset();
          }, Math.floor(Math.random()*1000) + 500);
        }, 450);
      }
    }
    
    // 回来时状态
    enter() {
      setTimeout(() => {
        this.shadow.classList.remove('disappear');
      }, 5);
      setTimeout(() => {
        this.scene.classList.remove('descend');
        this.scene.classList.add('stars-out', 'move-stars-out');
      }, 600);
      setTimeout(() => {
        this.hover();
        this.prepareEscape();
        this.startActivity();
      }, 1200)
    }
    
    startActivity() {
      this.activityInterval = setInterval(() => {
        switch (Math.floor(Math.random()*4)) {
          case 0:
            this.blink();
            setTimeout(() => { this.blink() }, 400);
            setTimeout(() => { this.blink() }, 1300);
            break;
          case 1:
            this.wave();
            break;
          default:
            break;
        }
      }, 7000);
    }
    
    prepareEscape() {
      this.scene.addEventListener('click', () => { this.runAway() }, false);
      this.scene.addEventListener('mouseover', () => { this.runAway() }, false);
      this.scene.addEventListener('focus', () => { this.runAway() }, false);
    }
  }
  
  let ghost = new Ghost(document.querySelector('.scene-container'));

  ghost.hover();
  ghost.startActivity();
  ghost.prepareEscape();