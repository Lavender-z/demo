let startingPoint
/* css 选择 */
const header = document.querySelector('header')

/* 事件监听，对鼠标放上时进行监听 */
header.addEventListener('mouseenter', (e) => {
  startingPoint = e.clientX
  header.classList.add('moving')
})

/* 事件监听，对鼠标移开时进行监听 */
header.addEventListener('mouseout', (e) => {
  header.classList.remove('moving')
  header.style.setProperty('--percentage', 0.5)
})

header.addEventListener('mousemove', (e) => {
  let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5

  header.style.setProperty('--percentage', percentage)
})