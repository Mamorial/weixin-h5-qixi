/**
 * 微信分享工具库
 *
 * 依赖:
 * 1. http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 * 2. jquery或zepto
 */
window.wxshare = (function() {
  var opts = {
    title: '微信分享标题',
    desc: '微信分享描述',
    link: '微信分享链接',
    imgUrl: '微信分享图片',
    timelineText: null,
    timelineLink: null,
    timelineImgUrl: null,
    friendTitle: null,
    friendDesc: null,
    friendLink: null,
    friendImgUrl: null,
    onSuccess: null,
    onCancel: null
  };
  var isReady = false;

  function config(optsArg) {
    $.extend(opts, optsArg);
//  alert('isReady=' + isReady);
	if (!isReady) {
      getSign();
      return;
   }

    if (!window.wx) return;
    var wx = window.wx;

    wx.onMenuShareTimeline({
      title: opts.timelineText || opts.desc,
      link: opts.timelineLink || opts.link,
      imgUrl: opts.timelineImgUrl || opts.imgUrl,
      success: function() {
        _smq.push(['custom', 'DurexFY17真心话树洞', '分享', '分享至朋友圈']);
        _gaq.push(['_trackEvent', 'DurexFY17真心话树洞', '分享', '分享至朋友圈']);
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'Timeline', '分享到朋友圈成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'Timeline', '分享到朋友圈取消']);
        if (opts.onCancel) {
          opts.onCancel();
        }
      }
    });

    wx.onMenuShareAppMessage({
      title: opts.friendTitle || opts.title,
      desc: opts.friendDesc || opts.desc,
      link: opts.friendLink || opts.link,
      imgUrl: opts.friendImgUrl || opts.imgUrl,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        _smq.push(['custom', 'DurexFY17真心话树洞', '分享', '分享给好友']);
        _gaq.push(['_trackEvent', 'DurexFY17真心话树洞', '分享', '分享给好友']);
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'AppMessage', '分享给好友成功']);
        if (opts.onSuccess) {
          opts.onSuccess();
        }
      },
      cancel: function() {
        window._hmt && window._hmt.push(['_trackEvent', 'wxshare', 'AppMessage', '分享给好友取消']);
        if (opts.onCancel) {
          opts.onCancel();
        }
      }
    });

    wx.onMenuShareQQ(opts);
    wx.onMenuShareWeibo(opts);
    wx.onMenuShareQZone(opts);
  }
	//弹层授权
  function getSign() {
//	alert('getsign');
  	var appid = "wxe7f8cddc17829dde";
	var secret = "05041e05ba66a667ba9ad52724ff0e32";
	var _url = "http%3A%2F%2Fprod.didadiandan.com%2Fprod1%2F";
	var code = "";
	var url_code = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+_url+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
//	console.log(window.location.href);
  		code = GetQueryString('code', true);
//			alert("code = " + code);
			if(!code) {
				window.open(url_code);
				code = GetQueryString('code', true);
			}
			alert(app.postUrl)

    $.ajax({
      type:"GET",
      url:  app.postUrl + "/wechart/api/code/" + code,
      success: function(rsp) {
      	app.user_uuid = rsp.object;
      	console.log("uuid = " + rsp);
        if (rsp.code == 101) {
//        alert(rsp.object);
          window.open(url_code);
        } else if(rsp.code == 100) {
        	var obj = rsp.object;
        	sessionStorage.setItem('uuid', obj);
        	takeSignString(appid, code, obj);
        }


      }
    });
  }
  function takeSignString(appid, code, uuid) {
  	var url1 = "http%3A%2F%2Fprod.didadiandan.com%2Fprod1%2F";
  	var url2 = "http://prod.didadiandan.com/prod1";
  	var me = this;
    if (me.success) return;
    if (me.running) return;
    me.running = true;
  	$.ajax({
		type:"GET",
		url: app.postUrl + "/wechart/api/url/" + code,
		data: {uuid: uuid},
		success: function(data) {
			console.log('chenggong');
			if (!window.wx) return;
	        var wx = window.wx;
	        var debug = (window.location.search.indexOf('__wxdebug__=1') !== -1);
			var data = data.object;
	        wx.config({
	          debug: debug,
	          appId: appid,
	          timestamp: data.timestamp,
	          nonceStr: data.nonceStr,
	          signature: data.signature,
	          jsApiList: [
	            'onMenuShareTimeline',
	            'onMenuShareAppMessage',
	            'onMenuShareQQ',
	            'onMenuShareWeibo',
	            'onMenuShareQZone',
	            'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'
	          ]
	        });
	        wx.ready(function() {
	          isReady = true;
	          config(opts);
	          opts.onReady && opts.onReady();
	        });
	        me.success = true;
		},
		complete: function() {
        me.running = false;
      }
	});
  }
  function GetQueryString(name, type)
		{
//			alert(type);
			if(type) {
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}

		}

  return {
    config: config
  };

})();
