$(document).ready(function() {
  
  var scrolling = false,
      curPage = 1,
      pages = $(".img-cont").length / 2,
      $left = $(".img-cont.left"),
      $right = $(".img-cont.right");
  
  function doMargins(paramPage) {
    
    scrolling = true;
    
    var _page = paramPage || curPage;
    
    $left.each(function() {
      var marginMult = parseInt($(this).attr("data-helper"), 10) + _page - 1;
      $(this).attr("style", "margin-top: "+ marginMult * 100 +"vh");
    });
    
    $right.each(function() {
      var marginMult = parseInt($(this).attr("data-helper"), 10) - _page + 1;
      $(this).attr("style", "margin-top: "+ marginMult * 100 +"vh");
    });
    
    setTimeout(function() {
      scrolling = false;
    }, 1000);
  }
  
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage);
      doMargins();
    }
  }
  
  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
      doMargins();
    }
  }
  
  function pagination(page) {
    $(".page-dots li").removeClass("active");
    $(".page-dots li[data-page="+ page +"]").addClass("active");
    $(".page-names li").removeClass("active");
    $(".page-names li[data-page="+page+"]").addClass("active");
    curPage = page;
  }
  
  $(document).on("click", ".page-dots li", function() {
    if (!scrolling) {
      var page = parseInt($(this).attr("data-page"), 10);
      pagination(page);
      doMargins(page);
    }
  });
  
  function openContent() {
    var number = $(this).attr("data-blocks");
    $(".scene").addClass("active");
    setTimeout(function() {
      $(".img-cont.cont-"+number).addClass("active");
      
      $(document).off("click", ".img-cont", openContent);
      $(document).unbind("keydown mousewheel DOMMouseScroll");
      
      setTimeout(function() {
        $(".content.cont-"+number).show();
        $(".content.cont-"+number).css("top");
        $(".content.cont-"+number).addClass("visible");
      }, 300);
    }, 300);
  }
  
  function initHandlers() {
    
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      if (!scrolling) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          navigateUp();
        } else { 
          navigateDown();
        }
      }
    });

    $(document).on("keydown", function(e) {
      if (!scrolling) {
        if (e.which === 38) {
          navigateUp();
        } else if (e.which === 40) { 
          navigateDown();
        }
      }
    });
    
    $(document).on("click", ".img-cont:not(.active)", openContent);
    
  }
  
  initHandlers();
  
  $(document).on("click", ".close", function() {
    scrolling = true;
    var $content = $(this).parent();
    $content.removeClass("visible");
    setTimeout(function() {
      
      $content.hide();
      $content.css('top');
      $(".img-cont").removeClass("active").addClass("closing");
      
      setTimeout(function() {
        $(".scene").removeClass("active");
        initHandlers();
        
        setTimeout(function() {
          $(".img-cont").removeClass("closing");
          scrolling = false;
        }, 300);
        
      }, 300);
      
    }, 800);
  });
  
});