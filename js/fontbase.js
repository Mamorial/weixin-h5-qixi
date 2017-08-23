(function() {

  function resetFontBase() {
    var fontSize = document.documentElement.clientWidth / 37.5;

    // 最大字号为18px；
    fontSize = fontSize > 18 ? 18 : fontSize;

    document.documentElement.style.fontSize = fontSize + 'px';
  }

  resetFontBase();

  window.addEventListener('resize', resetFontBase);

})();
