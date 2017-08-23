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

    $('.rule-btn.confirm').click(function() {
      app.showPage(2, 1);
      // $('.listen-local').fadeOut(500);
    });

    $('.logo').click(function() {
      $('.c-logo').fadeOut(500);
      $('.c-rule').fadeIn(500);
      window._hmt && window._hmt.push(['_trackEvent', 'DurexFY17真心话树洞', '首页', '开始']);
      _smq.push(['custom','DurexFY17真心话树洞','首页','开始']);
      _gaq.push(['_trackEvent','DurexFY17真心话树洞','首页','开始']);
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
