app.pages[2] = (function() {

  var page = {
    init: init,
    onLoad: onLoad,
    onLeave: onLeave,
    dependingTask: 'p2',
    isFlipReady: false,
    hasBranch: true,
    root: false,
    isLoading: false,
    lastTime: 0,
    playingEle: null //当前正处于播放状态的元素
  };

  function init() {
    initEvents();
    voiceApi.init({
      maxRecordTimeMs: 60000,
      onUploadStart: function() {
        console.log('onUploadStart');
      },
      onUploadSuccess: function(rsp) {
        // alert(JSON.stringify(rsp));
        console.log('上传成功', JSON.stringify(rsp));
      },
      onUploadError: function(rsp) {
        alert('[onUploadError] ' + JSON.stringify(rsp));
      }
    })
  }

  function initEvents() {
    var recordTimeout;
    var startTime;
    var endTime;
    var isRecording = false;
    $('.share-entrance').click(function() {
      app.showDialog('share');
      window._hmt && window._hmt.push(['_trackEvent', 'DurexFY17真心话树洞', '录音完成页', '分享引导']);
      _smq.push(['custom', 'DurexFY17真心话树洞', '录音完成页', '分享引导']);
      _gaq.push(['_trackEvent', 'DurexFY17真心话树洞', '录音完成页', '分享引导']);
    });

    $('.real-perfume').click(function() {
      $('.prompt').text('');
      $('.tel-input').val('');
      // 屈臣氏
      // app.showDialog('quchenshi');
      // 电商
      app.showDialog('dianshang');
      // if (app.source == 'quchenshi') {
      //   app.showDialog('quchenshi');
      // } else if (app.source == 'dianshang') {
      //   app.showDialog('dianshang');
      // }
      window._hmt && window._hmt.push(['_trackEvent', 'DurexFY17真心话树洞', '录音完成页', '真心话用真香水']);
      _smq.push(['custom', 'DurexFY17真心话树洞', '录音完成页', '真心话用真香水']);
      _gaq.push(['_trackEvent', 'DurexFY17真心话树洞', '录音完成页', '真心话用真香水']);
    });

    $('.start-record').on('touchstart', function(e) {
      recordTimeout = setTimeout(function() {
        // log('开始录音');
        if (app.keepPlaying) {
          // log('暂停背景');
          app.bgm.audio.pause();
        }
        startTime = new Date().getTime();
        voiceApi.startRecord(function() {
          isRecording = true;
          $('.luyin').fadeIn(200);
        });
      }, 500);
      e.preventDefault();
      e.stopPropagation();
    });


    $('.start-record').on('touchend', function() {
      // app.showPage(2, 2);
      clearTimeout(recordTimeout);
      if (isRecording) {
        isRecording = false;
        if (app.keepPlaying) {
          app.bgm.audio.play();
        }
        endTime = new Date().getTime();
        page.lastTime = Math.ceil((endTime - startTime) / 1000);
        // log('结束录音录音');
        voiceApi.stopRecord();
      }

    });


    $('.upload').click(function() {
      app.showDialog('loading');
      //上线前删除
      // if (app.showPage(2, 3)) {
      //   ajaxLoad();
      //   $('.share-entrance,.real-perfume').fadeIn(500);
      //   $('.slide-text,.slide-pointer').fadeIn(500);
      //   $('.listen-local').fadeIn(500);
      //   log(voiceApi.voice.serverId);
      // };
      voiceApi.uploadVoice(voiceApi.voice.localId, function() {
        function show() {
          app.hideDialog('loading');
          ajaxLoad();
          $('.share-entrance,.real-perfume').fadeIn(500);
          $('.slide-text,.slide-pointer').fadeIn(500);
          $('.listen-local').fadeIn(500);
        }
        if (app.showPage(2, 3)) {
          show();
        } else {
          setTimeout(function() {
            app.showPage(2, 3);
            show();
          }, 1000)
        };
      });
    });

    $('.say-again').click(function() {
      app.showPage(2, 1);
      $('.listen-local').fadeOut(500).removeClass('playing');
      wx.stopVoice({
        localId: voiceApi.voice.localId
      })
      if (app.keepPlaying) {
        app.bgm.audio.play();
      }
    });

    $('.listen,.listen-local').click(function() {
      // voiceApi.playVoice(voiceApi.voice.localId);
      $('.listen-local').addClass('playing');
      if (app.keepPlaying) {
        app.bgm.audio.pause();
      }
      // log(voiceApi.voice.localId);
      wx.playVoice({
        localId: voiceApi.voice.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    });

    $('.player')[0].onended = function() {
      page.playingEle.removeClass('playing');
      page.playingEle = null;
      // log('app.keepPlaying:' + app.keepPlaying);
      if (app.keepPlaying) {
        app.bgm.audio.play();
      }
    }

    /*听录音*/
    $('.cont-box').on('click', '.record', function() {
      page.playingEle && page.playingEle.removeClass('playing');
      $(this).addClass('playing');
      page.playingEle = $(this);
      if ($(this).data('loaded') == 'yes') {
        // $(this).find('.voice')[0].play();
        $('.player')[0].src = $(this).data('voice');
        $('.player')[0].play();
        // log('播放音频');
        if (app.keepPlaying) {
          // log('暂停背景');
          app.bgm.audio.pause();
        }
      } else {
        var audio = new Audio();
        audio.autoplay = false;
        audio.src = $(this).data('voice');
        $(audio).appendTo(this).addClass('voice');
        // log('插入并播放音频');
        $(this).data('loaded', 'yes');
        $('.player')[0].src = $(this).data('voice');
        $('.player')[0].play();
        if (app.keepPlaying) {
          // log('暂停背景');
          app.bgm.audio.pause();
        }
      }
    });

    /*录音*/
    // $('.cont-box').on('click', '.record', function() {
    //   $.each($('.voice'),function() {
    //     this.pause();
    //     this.currentTime=0;
    //   });
    //   if ($(this).find('.voice').length !== 0) {
    //     $(this).find('.voice')[0].play();
    //     log('播放音频');
    //   } else {
    //     var audio = new Audio();
    //     audio.autoplay = true;
    //     // audio.src = 'media/bgm.mp3';
    //     audio.src = $(this).data('voice');
    //     $(audio).appendTo(this).addClass('voice');
    //     log('插入并播放音频');
    //     // page.audios.push(audio);
    //   }
    // });

    $(window).on('load', function() {
      setTimeout(function() {
        app.iscroll = new IScroll('#wrap', {
          probeType: 3,
          mouseWheel: true,
          bounce: false,
          click: true
        });
        var reg = new RegExp("translate\\(0px,\\s?\\-?(\\d*[.]*\\d*)px\\)");
        var clientHeight = document.documentElement.clientHeight;
        app.iscroll.on('scroll', update);
        // app.iscroll.on('scrollEnd', update);
        function update() {

          var scrollTop = $('#cont-box')[0].style.transform.match(reg)[1];
          console.log('scrollTop = ' + scrollTop);
          var height = $('#cont-box').height();
          console.log('height = ' + height);
          var maxScrollTop = height - clientHeight;
          console.log(maxScrollTop - scrollTop);
          if (page.root == false) {
            if (maxScrollTop - scrollTop < 400) {
              if (!page.isLoading) {
                page.isLoading = true;
                ajaxLoad();
              }
            }
          } else {
            if (maxScrollTop - scrollTop < 100) {
              $('.onland').show();
              $('.slide-text,.slide-pointer').hide();
            } else {
              $('.onland').hide();
              $('.slide-text,.slide-pointer').show();
            }
          }
        }
      }, 100);
    });
  }

  var ajaxLoad = (function() {
    var currentCount = 1;
    var url = 'http://w.benbun.com/durex/qingrenjie/api/?m=home&c=index&a=getList';
    if (window.location.host.indexOf('m.durex.com.cn') < 0) {
      url = 'api/?m=home&c=index&a=getList';
    }
    return function() {
      $.ajax({
        url: app.postUrl + '/common/api/voices',
        type: 'GET',
        data: {
          pageNumber: currentCount,
          pageSize: 20
        },
        beforeSend: function() {
          $('.ajax-loading').show();
        },
        success: function(data) {
        	console.log(data);
          if (data.code == 100) {
            console.log('成功');
            console.log(data.object.count);
            if (data.object.count == 1) {
              $('#wrap .cont').last().after(randomAppend('root', undefined, data.object.voice));
              console.log('add cont root');
              setTimeout(function() {
                app.iscroll.refresh();
              }, 500);
              // app.iscroll.refresh();
              page.root = true;
            } else {
              console.log('currentCount:', currentCount)
              if (currentCount == 1) {
                randomAppend(undefined, $('#first-cont'), data.object.voice);
                console.log('first cont')
              } else {
                $('#wrap .cont').last().after(randomAppend('body', undefined, data.object.voice));
              }
              console.log('add cont');
              app.iscroll.refresh();
              currentCount++;
            }
            $('.ajax-loading').hide();
            page.isLoading = false;
          }
          console.log(currentCount);
        },
        error: function() {
          console.log('ajaxLoad fail');
          ajaxLoad();
        },
        complete: function() {}
      });
    }
  })();

  var basePosition = [
    [55, 5],
    [55, 5],
    [55, 15],
    [55, 15],
    [55, 25],
    [55, 25],
    [55, 35],
    [55, 35],
    [55, 45],
    [55, 45],
    [55, 55],
    [55, 55],
    [55, 65],
    [55, 65],
    [55, 75],
    [55, 75],
    [55, 85],
    [55, 85],
    [55, 95],
    [55, 95]
  ];

  function randomAppend(type, $cont, list) {
    console.log(list);
    var interval = 1;
    var fade = true;
    var length = list.length;
    if (!$cont) {
      var $cont = $('<div></div>').addClass('cont');
      fade = false;
      if (type == 'body') {
        $cont.append('<img src="img/flower1.png" alt="" class="flower1"><img src="img/flower2.png" alt="" class="flower2"><img src="img/flower3.png" alt="" class="flower3"><img src="img/flower4.png" alt="" class="flower4"><img src="img/flower2.png" alt="" class="flower5"><img src="img/body.jpg" alt="" class="body">')
      } else {
        $cont.append('<img src="img/root.jpg" alt="" class="body">')
//      interval = 3;
//      length = 4;
      }
    }

    for (var i = 0; i < length; i++) {
      if (i % 2 == 0) {
        append($cont, list[i], true, fade, interval * i);
        console.log('tianjia left')
      } else {
        append($cont, list[i], false, fade, interval * i);
        console.log('tianjia right')
      }

    }

    return $cont;

    function append($cont, item, flag, fade, i) {
      var img = new Image();
      var $record;
      console.log(basePosition[i]);
      if (flag) {
        img.src = 'img/record-left.png';
        $record = $('<div class="record record-left" data-voice="' + item.path + '"></div>'). /*append(img).*/ append('<div class="time">' + item.time + '\"</div>').prependTo($cont).css({
          'right': random(5) + basePosition[i][0] + '%',
          'top': random(2) + basePosition[i][1] + '%'
        });
      } else {
        img.src = 'img/record-right.png';
        $record = $('<div class="record record-right" data-voice="' + item.path + '"></div>') /*.append(img)*/ .append('<div class="time">' + item.time + '\"</div>').prependTo($cont).css({
          'left': random(5) + basePosition[i][0] + '%',
          'top': random(2) + basePosition[i][1] + '%'
        });
      }
      if (fade) {
        $record.fadeIn(1000);
      } else {
        $record.show();
      }

    }

    function random(number) {
      return Math.random() * number * 2 - number;
    }
  }


  function onLoad() {
    setTimeout(function() {
      app.iscroll.refresh();
    }, 200);
    setTimeout(function() {
      page.isFlipReady = true;
    }, 1000);
  }

  function onLeave() {
    page.isFlipReady = false;
  }

  return page;
})();
