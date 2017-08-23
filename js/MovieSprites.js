(function() {

  function MovieSprites(elmt, opt) {
    if (!elmt) {
      return this;
    }
    var t = this;

    t.elmt = elmt;
    t.classOrigin = opt.classOrigin ;
    t.classAni = opt.classAni || null;
    t.frameLastTime = opt.frameLastTime || 40;
    t.totalFrame = opt.totalFrame || 1;
    t.loop = opt.loop || false;
    t.step = opt.step || 1;
    t.direction = opt.direction || 1;
    t.currentFrame = opt.currentFrame || 1;
    t.stopCallback = opt.stopCallback || null;
    t.finishCallback = opt.finishCallback || null;
    t.revertCallback = opt.revertCallback || null;

    t.playing = false;
    t.interval = null;

    t.play = function(speed) {
      speed = speed || t.frameLastTime ;
      t.interval = setInterval(function() {
        // console.log('currentFrame',t.currentFrame);
        // console.log('speed',speed);
        
        if(t.direction) {
            t.currentFrame +=  t.step;
            t.currentFrame = t.currentFrame >= t.totalFrame ? t.totalFrame : t.currentFrame ;
        }else{
            t.currentFrame -=  t.step;
            t.currentFrame = t.currentFrame < 1 ? 1 : t.currentFrame ;
            if(t.currentFrame==1){
                t.stop();
                t.direction = 1;
                if( t.revertCallback ){
                    t.revertCallback();
                }
            }
        }
        if ( t.loop && t.currentFrame == t.totalFrame) {
            t.currentFrame = 1;
        }
        if(!t.loop && t.currentFrame == t.totalFrame){
            t.stop();
            if(t.finishCallback){
              t.finishCallback();
            }
        }
        $(elmt).attr('class', t.classOrigin + ' ' + t.classAni + t.currentFrame );
      }, speed);
    };
    t.stop = function() {
        // console.log('MovieSprites stop');
        clearInterval( t.interval);
        if(t.stopCallback){
          t.stopCallback();
        }
    };
    t.revert = function() {
        t.direction = 0;
    };
    t.resume = function() {
        t.totalFrame = opt.totalFrame || 1;
        t.currentFrame = opt.currentFrame || 1;
    };

    t.speedUp = function(speed,stepnum){
        t.frameLastTime = speed || t.frameLastTime-5 ;
        if(t.frameLastTime<20){
            t.step = stepnum;
            t.frameLastTime = 20;
        }
        t.stop();
        t.play(t.frameLastTime);
    };

    t.speedDown = function(speed){
        if(t.frameLastTime == 20 && t.step!=1){
            t.step = t.step - 1;
        }else{
            t.frameLastTime = speed || t.frameLastTime + 30;
        }
        t.stop();
        t.play(t.frameLastTime);
    };
  }
  window.MovieSprites = MovieSprites;
})();
