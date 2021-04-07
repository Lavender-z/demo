/* 仅展示需要，对于 .hover */
/* 当鼠标重新触碰到 .hover 时，恢复原本样式 */
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);

