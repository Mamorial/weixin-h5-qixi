var voiceApi = (function() {

  var opts = {
    maxRecordTimeMs: 60000,
    onUploadStart: function() {
      console.log('onUploadStart');
    },
    onUploadSuccess: function(rsp) {
//    alert(JSON.stringify(rsp));
    },
    onUploadError: function(rsp) {
//    alert('[onUploadError] ' + JSON.stringify(rsp));
    }
  };
  var voice = {};
  var started = false;
  var stopRecordId = 0;
//var url = 'http://192.168.0.108:8080/common/upload/file';
//if (window.location.host.indexOf('m.durex.com.cn') < 0) {
//  url = 'api/?m=home&c=index&a=add';
//}
	//上传音频
  function addVoice(mediaId, callback) {
  	var uuid = sessionStorage.getItem('uuid');
//	alert(mediaId);
    $.ajax({
    	type: 'post',
      url:  app.postUrl + "/common/upload/file",
      data: {
        videoId: mediaId,
        uuid: uuid,
        time: app.pages[2].lastTime
      },
      beforeSend: function() {},
      success: function(data) {
      	if(data.code == 101) {
      		alert(data.object);
//    		sessionStorage.getItem('')
      	}
//    	var state = sessionStorage.getItem('state');
//    	console.log(state);
//    	if(state) {
//    		$(".real-perfume").attr({'src': 'img/myAwards.png', 'onclick': 'getMyPrize'});
//    	} else {
//    		$(".real-perfume").removeAttr('src onclick');
//    	}
        // if (data.code === 0) {
        callback && callback();
        // log('保存数据库处理成功');
        //   opts.onUploadSuccess && opts.onUploadSuccess(data.data);
        // } else {
        //   opts.onUploadError && opts.onUploadError(data.msg);
        // }
      },
      error: function(xhr, errorType, error) {

        // opts.onUploadError && opts.onUploadError('请求失败: ' + error);
      },
      complete: function() {}
    });
  }

  function getRandomVoice() {
    $.ajax({
      url: 'api/',
      type: 'POST',
      dataType: 'json',
      // timeout: 5000,
      data: {},
      beforeSend: function() {},
      success: function(data) {
        if (data.code === 0) {
          console.log('处理成功');
          opts.onUploadSuccess && opts.onUploadSuccess(data.data);
        } else {
          opts.onUploadError && opts.onUploadError(data.msg);
        }
      },
      error: function(xhr, errorType, error) {
        opts.onUploadError && opts.onUploadError('请求失败: ' + error);
      },
      complete: function() {}
    });
  }
	//上传音频
  function uploadVoice(localId, callback) {
  	console.log(localId);
    wx.uploadVoice({
      localId: localId,
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function(res) {
        voice.serverId = res.serverId;
        console.log(res.serverId);
        // log('vocie upload weixin sucess,serverId is', res.serverId);
        addVoice(res.serverId, callback);
      },
      fail:function() {
        uploadVoice(localId,callback);
      }
    });
  }
	//开始录音
  function startRecord(callback) {
//  console.log('[startRecord]');
    started = true;
//  alert(!opts.isMock)
    if (!opts.isMock) {
      wx.startRecord({
        success: function() {
//      	alert('录音成功')
        	$('.luyin').attr('src', 'img/luyin.gif').removeClass('luyin2');
          callback && callback();
        },
        cancel: function() {
          alert('用户拒绝授权录音');
        }
      });
    }
    // log('最长时间为(ms):' + opts.maxRecordTimeMs);
    // console.log('最长时间为(ms):',opts.maxRecordTimeMs);
    stopRecordId = setTimeout(stopRecord, opts.maxRecordTimeMs);
  }
		//结束录音
  function stopRecord() {
    // log('[stopRecord] started:' + started + opts.isMock);
    if (!started) return;
    started = false;
    clearTimeout(stopRecordId);

    // opts.onUploadStart && opts.onUploadStart();

    // getRandomVoice();

    wx.stopRecord({
      success: function(res) {
        voice.localId = res.localId;
        // log('res:' + res);
        // log('localId:' + res.localId);
//      wx.translateVoice({
//				   localId: voice.localId, // 需要识别的音频的本地Id，由录音相关接口获得
//				    isShowProgressTips: 1, // 默认为1，显示进度提示
//				    success: function (res) {
//				        alert(res.translateResult); // 语音识别的结果
//				    }
//				});
        app.showPage(2, 2);
        $(".luyinListen").removeClass('ds-none');
        $('.luyin').addClass('ds-none').attr('src', 'img/count_down.gif');
        $('.listen-local .time').html(app.pages[2].lastTime + '"');
        $('.listen-local').fadeIn(500);
        
        // log('showPage 2-2');
        // uploadVoice(voice.localId);
      },
      fail: function(res) {
        // log('stopRecord fail' + JSON.stringify(res));
      }
    });


  }

  function init(argOpts) {
    opts = $.extend(opts, argOpts);

    // 监听录音播放停止
    wx.ready(function() {
      wx.onVoicePlayEnd({
        success: function(res) {
          started = false;
          voice.localId = res.localId; // 返回音频的本地ID
          // log('localId:' + res.localId, true);
          $('.listen-local').removeClass('playing');
          if (app.keepPlaying) {
            app.bgm.audio.play();
          }
        }
      });
    })

  }

  function playVoice(localId) {
    wx.playVoice({
      localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }

  return {
    voice: voice,
    init: init,
    startRecord: startRecord,
    stopRecord: stopRecord,
    uploadVoice: uploadVoice,
    playVoice: playVoice
  };

})();
