/* 定义 body， css 选择 body 部分 */
const body = document.querySelector("body");

/* 定义 lis， css 选择 li 这一整体部分 */
const lis = document.querySelectorAll("li")

/* 事件监听，窗口滑动 */
window.addEventListener("scroll", () => { onscrl(); }, false);

onscrl(false);
function onscrl() {
  const s = (body.scrollHeight - window.innerHeight) / 15;

  lis.forEach((li, ix) => {
    const ang = ((this.scrollY - (s * (ix - 1))) * 360 / (s * 2)) - 180;
    
    li.style.setProperty('--ang',
      Math.max(-180, Math.min(180, ang)) + 'deg'
    );
  });  
}