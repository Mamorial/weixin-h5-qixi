app.audios = (function() {
  var ROOT = app.root;

  function myAudio(src, loop) {
    var audio = new Audio();
    audio.src = src;
    audio.volume = 1;
    audio.autoplay = false;
    audio.loop = true;
    if (!loop) {
      audio.loop = false;
    }
    // 音频结束后，开始播放背景音乐
    // audio.addEventListener('ended', continueBgm);
    return audio;
  }

  /*如果有背景音乐并且背景音乐开关处于打开状态，则开始播放背景音乐*/
  function continueBgm(event) {
    if (app.bgm && (!$('#icon-bgm').hasClass('tag-music-off'))) {
      // app.bgm.pause();
      app.bgm.play();
    }
  }

  aClick = new myAudio('media/bgm.mp3');

  function initAudios() {
    // $.each(app.audios, function(key, value) {
    //   console.log("Key: " + key + ", Value: ");
    //   // app.audios.aCrow.play();
    // });
  }

  return {
    init: initAudios,
    aClick: aClick,
  };
  /*返回一个对象，包含init方法，和实例化的audio对象*/
})();
