app.pages[3] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask:'p3',
    isFlipReady: false,
    hasBranch: true,
  };

  function init() {
    initEvents();
  }

  function initEvents() {

  }

  function onLoad() {
    setTimeout(function(){
      page.isFlipReady = true;
    },1000);
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
