app.pages[1] = (function() {
  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p1',
    isFlipReady: false, //标志页面是否可以翻页, 当页面所有动画运行完之后设置为true,离开页面后再重置为false
    hasBranch: false, //标志页面内是否有分支,默认为false,
  };

  function init() {
    initEvents();
  }

  function initEvents() {
    $('.p1-btn-alert').click(function() {
      app.showDialog('share');
    });
			//进入第二页
<<<<<<< HEAD
//  $('.confirm').click(function() {
//    app.showPage(2, 1);
////    if (app.showPage(2, 3)) {
////        show();
////      } else {
////        setTimeout(function() {
////          app.showPage(2, 3);
////          show();
////        }, 1000)
////      };
//    // $('.listen-local').fadeOut(500);
//  });
=======
    $('.confirm').click(function() {
      app.showPage(2, 1);
      // $('.listen-local').fadeOut(500);
    });
>>>>>>> c65faae30c4fa9e6142996647303baaa24d3eb46

//  $('.logo').click(function() {
//    $('.c-logo').fadeOut(500);
//    $('.c-rule').fadeIn(500);
//    window._hmt && window._hmt.push(['_trackEvent', 'DurexFY17真心话树洞', '首页', '开始']);
//    _smq.push(['custom','DurexFY17真心话树洞','首页','开始']);
//    _gaq.push(['_trackEvent','DurexFY17真心话树洞','首页','开始']);
//  })
		//进入规则页面
    $('.c-logo').click(function() {
      $('.c-logo').fadeOut(500);
      $('.c-rule').fadeIn(500);
    })
    //进入想要聆听页面
    $('.type').click(function() {
      $('.c-rule').fadeOut(500);
      $('.c-type').fadeIn(500);
    })

  }


  function onLoad() {
    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);
    // console.log(app.source);
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
