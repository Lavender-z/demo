/* 现在把中间演示的定格部分利用 js 恢复 */
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);