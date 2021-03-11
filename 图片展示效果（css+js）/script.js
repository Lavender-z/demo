// 鼠标坐标
var mouse = {
    X   : 0,
    Y   : 0,
    CX  : 0,
    CY  : 0
  },
  block = {
    X   : mouse.X,
    Y   : mouse.Y,
    CX  : mouse.CX,
    CY  : mouse.CY
  },
  imags = [
    'https://source.unsplash.com/qa8VhqvJGIo',
    'https://source.unsplash.com/Qdt0KC3O_V8',
    'https://source.unsplash.com/lT7zmkth3o8',
    'https://source.unsplash.com/cUpp1gAEtiU'
  ];

// 获得鼠标指针在页面中的位置
$('.block').on('mousemove', function(e) {
mouse.X   = (e.pageX - $(this).offset().left) - $('.block').width() / 2;
mouse.Y   = (e.pageY - $(this).offset().top) - $('.block').height() / 2;
})

// 当鼠标指针离开元素时位置
$('.block').on('mouseleave', function(e) {
mouse.X   = mouse.CX;
mouse.Y   = mouse.CY;
})

// setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
setInterval(function(){

block.CY   += (mouse.Y - block.CY) / 12;
block.CX   += (mouse.X - block.CX) / 12;

$('.block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)')
$('.block').css({
  transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
})

}, 20);

// 为匹配的元素执行动作
$('.slider .item').each(function(i){

if(i == 0){
  
  $(this).addClass('active');
  $(this).next().addClass('next');
  $(this).prev().addClass('prev');
}

// 使用 attr() 方法：--$(this).attr(); 获取节点属性名的值，相当于 getAttribute() 方法
$(this).attr('id', 'slide-'+i);

// prepend() 方法：在被选元素的开头（仍位于内部）插入指定内容。
$(this).prepend(
  $('<div>', {class: 'blur', style: 'background-image: url(' + imags[i] + ');'}),
  $('<div>', {class: 'bg', style: 'background-image: url(' + imags[i] + ');'})
)

// 设置背景
$(this).find('.block').css('background-image', 'url(' + imags[i] + ')')

$('.navigations .dots').append(
  $('<li>', {class: i == 0 ? 'active' : '', id: i}).on('click', function(){
  var cSlide = $('.slider #slide-'+$(this).attr('id'));
    
    $('.navigations .dots li').removeClass('active');
    $(this).addClass('active');
    
    $('.slider .item').removeClass('active prev next');
    cSlide.addClass('active');
    cSlide.next().addClass('next');
    cSlide.prev().addClass('prev');
   })
  )
})


