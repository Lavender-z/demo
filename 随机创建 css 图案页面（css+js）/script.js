/**
 * 现在利用 js 动态创建 css样式
 * 定义数量(这里定义了21个)和后面需要随机的颜色组
 */
var pet_count = 21;
var colors = [
  "Peru",
  "SaddleBrown",
  "#333",
  "Gray",
  "DarkSlateGray",
  "LightSlateGray",
  "Sienna",
  "Chocolate",
  "#f7f7f7",
  "Black"
];

/**
 * 定义函数 buildPet
 * 动态创建 div 标签
 * 产生随机数，由随机数确定 div 的 className
 * 设置表格行的开始和结束标签之间的 html
 */
function buildPet() {
  var p = document.createElement("div");
  p.className = Math.random() < 0.5 ? "dog" : "cat";
  p.innerHTML = `<div class="head"></div>
                 <div class="body"></div>
                 <div class="legs"></div>`;
/**
 * setProperty() 方法用于设置一个新的 css 属性
 * Math.floor() 返回小于或等于一个给定数字的最大整数
 * 需要从 colors 数组中随机选择一个值，根据数组长度获取随机索引
 * 颜色 + 头部选择
 */
  p.style.setProperty(
    "--color-main",
    colors[Math.floor(Math.random() * colors.length)]
  );
  p.style.setProperty(
    "--head-height",
    Math.floor(Math.random() * 25) + 25 + "px"
  );
  
  document.body.appendChild(p);
}

/**
 * 创建动物图像的过程
 */
function addPet() {
  for (var i = 0; i < pet_count; i++) {
    buildPet();
  }
}

/**
 * 重置页面
 */
function resetPage() {
  document.body.innerHTML = "";
  addPet();
}
resetPage();

/**
 * 事件监听 click,当点击时重置页面
 */
window.addEventListener('click', resetPage);