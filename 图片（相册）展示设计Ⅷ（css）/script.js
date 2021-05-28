/**
 * 中间图片是为了演示，所以需要利用 js，将其“锁定”的动画解除
 */
 $(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);
