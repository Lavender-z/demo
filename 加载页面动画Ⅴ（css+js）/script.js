var s = {
  title: {
    el: $("h1"),
    dots: 0
  },
  bowl: {
    el: $(".bowl"),
    top: $(".bowl .top-water")
  }
};

var loading = window.setInterval(function() {
  var str = "";

  if (s.title.dots < 3) {
    s.title.dots++;
  } else {
    s.title.dots = 1;
  }

  for (var i = 0; i < s.title.dots; i++) {
    str += "."
  }

  s.title.el.html("Loading" + str);
}, 500);