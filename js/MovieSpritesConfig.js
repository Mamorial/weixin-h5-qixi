$(function() {
  var frameStep = 1;
  var frameSpeed = 40;

  var movieGirl1 = new MovieSprites($('.girl1')[0], { //选取目标dom
    classAni: 'sprite-icons-girl1', //每个小图的css类名去除最后的序号
    classOrigin: 'girl1 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 35, //总的帧数
    loop: true, //是否循环播放
  });
  // movieGirl1.play();

  var movieGirl2 = new MovieSprites($('.girl2')[0], { //选取目标dom
    classAni: 'sprite-icons-girl2', //每个小图的css类名去除最后的序号
    classOrigin: 'girl2 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 35, //总的帧数
    loop: true, //是否循环播放
  });
  // movieGirl2.play();

  var movieGirl3 = new MovieSprites($('.girl3')[0], { //选取目标dom
    classAni: 'sprite-icons-girl3', //每个小图的css类名去除最后的序号
    classOrigin: 'girl3 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 35, //总的帧数
    loop: true, //是否循环播放
  });
  // movieGirl3.play();

  var movieGirl4 = new MovieSprites($('.girl4')[0], { //选取目标dom
    classAni: 'sprite-icons-girl4', //每个小图的css类名去除最后的序号
    classOrigin: 'girl4 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 70, //总的帧数
    loop: true, //是否循环播放
  });
  // movieGirl4.play();

  var movieBoy1 = new MovieSprites($('.boy1')[0], { //选取目标dom
    classAni: 'sprite-icon-boy1', //每个小图的css类名去除最后的序号
    classOrigin: 'boy1 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 26, //总的帧数
    loop: true, //是否循环播放
  });
  // movieBoy1.play();

  var movieBoy2 = new MovieSprites($('.boy2')[0], { //选取目标dom
    classAni: 'sprite-boy2-boy2', //每个小图的css类名去除最后的序号
    classOrigin: 'boy2 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 26, //总的帧数
    loop: true, //是否循环播放
  });
  // movieBoy2.play();
  
  var movieBoy3 = new MovieSprites($('.boy3')[0], { //选取目标dom
    classAni: 'sprite-boy3-boy3', //每个小图的css类名去除最后的序号
    classOrigin: 'boy3 sprites', //目标dom如果需要额外的类，写在这里，eg：'sprite move'
    frameLastTime: frameSpeed, //每一帧的持续时间
    step: frameStep, //切换类时的等差，（1，2，3，4）
    totalFrame: 28, //总的帧数
    loop: true, //是否循环播放
  });
  // movieBoy3.play();
});
