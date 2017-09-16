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
//      alert('[onUploadError] ' + JSON.stringify(rsp));
      }
    })
  }

  function initEvents() {
    var recordTimeout;
    var startTime;
    var endTime;
    var isRecording = false;
    //分享抽奖按钮
    $('.share-entrance').click(function() {
    	var state = app.stateshare;
    	if(!state) {
    		app.showDialog('share');
    	} else {
    		app.showDialog('dianshang');

    	}

    });
		//我的奖品按钮
    $('.real-perfume').click(function() {
    	var uuid = sessionStorage.getItem('uuid');
    	$.ajax({
			type:"get",
			url: app.postUrl + "/wechart/api/getAward",
			data: {uuid: uuid},
			success: function(res) {
				console.log(res);
				$("#awardList").html("");
				if(res.code == 101) {
					var _div = "<div class='list'>";
					var _span = "<span class='listNoAward'>";
					var htm = _div + _span + res.object + "</span></div>";
					$("#awardList").append(htm);
				} else {
					var _div = "<div class='list'>";
//					var _div = "<div class='list' onclick=\"erweima()\">"; onclick=\"erweima(" + v.record.awardId + ")\"
					var _span = "<span>";

					var _qrcode = "<div id=\"qrcode\" class='ds-none'></div>";
					res.object.map(function(v, i, a) {
						var _div = "<div class='list'>";
						var state = '';
						if(v.record.catch) {
							state = '已兑奖';
						} else {
							state = '未兑奖';
						}
						var _btn = "<div class=\"btnerweima\" award_id='" + v.record.id + "'>生成二维码</div>";
						var htm = _div + _span + v.awards.awardName + "</span>" + _span + state + '</span>' + _span + v.record.createDate + "</span>" + _btn + "</div>";

//						$(".list").attr('award_id', v.record.awardId);
						$("#awardList").append(htm);

					})
				}
			}
			});
    	app.showDialog('myawards');
    });
<<<<<<< HEAD
    //开始录音
    $('.start-record').on('touchstart', function(e) {
			$(".luyinDivD").removeClass('ds-none');
=======
    $('.start-record').on('touchstart', function(e) {

>>>>>>> c65faae30c4fa9e6142996647303baaa24d3eb46
    	$('.luyin').removeClass('ds-none').addClass('luyin2');
//  	if($('.luyin').hasClass('ds-none')) {
//  		$('.pre_luyin').removeClass('ds-none').attr('src', 'img/count_down.gif');
//  	}
//  	setTimeout(function() {
//  		$('.pre_luyin').addClass('ds-none');
//        setTimeout(function() {
//        	$('.pre_luyin').removeAttr('src');
//        }, 500);
//  	}, 3000)
      recordTimeout = setTimeout(function() {
				//去掉倒计时
//    	$('.pre_luyin').addClass('ds-none');
//        setTimeout(function() {
//        	$('.pre_luyin').removeAttr('src');
//        }, 500);
        // log('开始录音');
        if (app.keepPlaying) {
          // log('暂停背景');
          app.bgm.audio.pause();
        }
        startTime = new Date().getTime();
        voiceApi.startRecord(function() {
          isRecording = true;
//        $('.luyin').removeClass('ds-none');
        });
      }, 3000);
      e.preventDefault();
      e.stopPropagation();
    });


    $('.start-record').on('touchend', function() {
    	$('.luyin').removeClass('luyin2').addClass('ds-none');
<<<<<<< HEAD
    	$(".luyinListen").removeClass('ds-none');
    	$(".luyinDivD").addClass('ds-none');
=======
>>>>>>> c65faae30c4fa9e6142996647303baaa24d3eb46
      // app.showPage(2, 2);
//    $('.pre_luyin').addClass('ds-none');
//    setTimeout(function() {
//    	$('.pre_luyin').removeAttr('src');
//    }, 200);
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
		//进入第二页 展示音频列表
		$('.confirm').click(function() {
      app.showPage(2, 1);
      function show() {
          app.hideDialog('loading');
          ajaxLoad();
//        $('.share-entrance,.real-perfume').fadeIn(500).removeClass('ds-none');
          $('.slide-text,.slide-pointer').fadeIn(500).removeClass('ds-none');
//        $('.listen-local').fadeIn(500);
//        $(".head").attr('src', 'img/bg2.jpg');
        }
        if (app.showPage(2, 3)) {
          show();
        } else {
          setTimeout(function() {
            app.showPage(2, 3);
            show();
          }, 1000)
        };
        setTimeout(function() {
        	$(".p2-1").attr('style', 'display: block');
//      $(".p2-2").hide();
        }, 1000);
      
    });
		//上传音频
    $('.upload').click(function() {
      app.showDialog('loading');
      voiceApi.uploadVoice(voiceApi.voice.localId, function() {
        function show() {
          app.hideDialog('loading');
          ajaxLoad();
          $('.share-entrance,.real-perfume').fadeIn(500).removeClass('ds-none');
          $('.slide-text,.slide-pointer').fadeIn(500).removeClass('ds-none');
<<<<<<< HEAD
          $(".luyinDiv").hide();
=======
>>>>>>> c65faae30c4fa9e6142996647303baaa24d3eb46
          $('.listen-local').fadeIn(500);
          $(".head").attr('src', 'img/bg2.jpg');
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
         log('app.keepPlaying:' + app.keepPlaying);
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
        beforeSend: function() {
          $('.ajax-loading').show();
        },
        success: function(data) {
        	console.log(data);
          if (data.code == 100) {
            console.log('成功');
            console.log(data);
//          $('#wrap .cont').last().after(randomAppend('root', undefined, data.object));
//            console.log('add cont root');
//            setTimeout(function() {
//              app.iscroll.refresh();
//            }, 500);

						if (currentCount == 1) {
							randomAppend(undefined, $('#first-cont'), data.object);
							currentCount++;
						} else {
							$('#wrap .cont').last().after(randomAppend('root', undefined, data.object));
							setTimeout(function() {
                app.iscroll.refresh();
              }, 500);
              page.root = true;
						}


//          if (data.object.count == 1) {
//            $('#wrap .cont').last().after(randomAppend('root', undefined, data.object.voice));
//            console.log('add cont root');
//            setTimeout(function() {
//              app.iscroll.refresh();
//            }, 500);
//            // app.iscroll.refresh();
//            page.root = true;
//          } else {
//            console.log('currentCount:', currentCount)
//            if (currentCount == 1) {
//              randomAppend(undefined, $('#first-cont'), data.object.voice);
//              console.log('first cont')
//            } else {
//              $('#wrap .cont').last().after(randomAppend('body', undefined, data.object.voice));
//            }
//            console.log('add cont');
//            app.iscroll.refresh();
//            currentCount++;
//          }
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
    [55, 3],
    [55, 10],
    [55, 17],
    [55, 24],
    [55, 31],
    [55, 39],
    [55, 46],
    [55, 53],
    [55, 60],
    [55, 67],
    [55, 74],
    [55, 81],
    [55, 89],
    [55, 96],
    [55, 103],
    [55, 110],
    [55, 83],
    [55, 88],
    [55, 93],
    [55, 98]
  ];
//	ajaxLoad();
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
<<<<<<< HEAD
      	var len = $(".body[src='img/root.jpg']").length;
      	if(len == 0) {
      		$cont.append('<img src="img/root.jpg" alt="" class="body">');
      	}
=======
        $cont.append('<img src="img/root.jpg" alt="" class="body">')
>>>>>>> c65faae30c4fa9e6142996647303baaa24d3eb46
        interval = 2;
        length = 0;
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
      if(!item.imageUrl) {
        	item.imageUrl = 'img/nullImg.jpg';
        }
      if (flag) {
        img.src = 'img/record-left.png';

        $record = $('<div class="record record-left" data-voice="' + item.path + '"></div>'). /*append(img).*/ append('<div class="time">' + item.time + '\"</div>').append('<div class=\"record_imgL\"><img src=\"' + item.imageUrl + '\" width=\"40px\" height=\"40px\" /></div>').prependTo($cont).css({
          'right': 50 + '%',
//        'right': 4 + basePosition[i][0] + '%',
          'top': basePosition[i][1] + '%'
        });
      } else {
        img.src = 'img/record-right.png';
        $record = $('<div class="record record-right" data-voice="' + item.path + '"></div>') /*.append(img)*/ .append('<div class="time">' + item.time + '\"</div>').append('<div class=\"record_imgR\"><img src=\"' + item.imageUrl + '\" width=\"40px\" height=\"40px\" /></div>').prependTo($cont).css({
          'left': 50 + '%',
//        'left': 4 + basePosition[i][0] + '%',
          'top': basePosition[i][1] + '%'
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
  
  function running() {
  	alert('p2  is running');
  }
	
	
  return page;
})();
