var ticking = false;

/* 正则表达式，navigator.userAgent 浏览器信息是否含有 Firefox 字样 */
var isFirefox = /Firefox/i.test(navigator.userAgent);

/* 正则表达式，navigator.userAgent 浏览器信息是否含有 MSIE 字样,就是判断是否为 IE 浏览器 */
var isIe = 
  /MSIE/i.test(navigator.userAgent) ||
  /Trident.*vr\:11\./i.test(navigator.userAgent);
var scrollSensitivity = 30;
var slideTime = 600;
var currentSlide = 0;
var totalNumSlide = $(".background").length;

/* 判断浏览器 */
function scroll(evt) {
  if(isFirefox) {
    delta = evt.detail * -120;
  } else if(isIe) {
    delta = -evt.deltaY;
  } else {
    delta = evt.wheelDelta;
  }

  if(ticking != true) {
    if(delta <= -scrollSensitivity) {
      ticking = true;
      if(currentSlide !== totalNumSlide - 1) {
        currentSlide++;
        nextItem();
      }
      slideDurationTimeout(slideTime); /* 滑动 */
    }
    if(delta >= scrollSensitivity) {
      ticking = true;
      if(currentSlide !== 0) {
        currentSlide--;
      }
      previousItem();
      slideDurationTimeout(slideTime);
    }
  }
}

function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

/* 鼠标滚动事件 */
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(scroll, 5), false);

/* 现在已经可以向下滑动 */
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlide - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlide);
  $currentSlide.removeClass("down-scroll").add("up-scroll");
}