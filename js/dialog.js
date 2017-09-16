app.dialogs = (function() {

  return {
    init: function() {
      var sendNum = 0;

      $('.d-share').click(function() {
        app.hideDialog('share');
      });

      $('.tel-box .close').click(function() {
        app.hideDialog('quchenshi');
      });

      $('.btn-rule').click(function() {
        $('.rule-box').show();
      });

      $('.rule-box .close').click(function() {
        $('.rule-box').hide();
      });

      $('.d-dianshang .close').click(function() {
        app.hideDialog('dianshang');
      });
      $('.d-result .close').click(function() {
        app.hideDialog('result');
      });
      $('.d-erweima .close').click(function() {
        app.hideDialog('erweima');
      });
      $('.d-overtime .close').click(function() {
        app.hideDialog('overtime');
      });
      $('.d-myawards .close').click(function() {
        app.hideDialog('myawards');
      });

//			$(window).on('load', function() {
//    setTimeout(function() {
//      app.iscroll = new IScroll('#awardList', {
//        probeType: 3,
//        mouseWheel: true,
//        bounce: false,
//        click: true
//      });
//      var reg = new RegExp("translate\\(0px,\\s?\\-?(\\d*[.]*\\d*)px\\)");
//      var clientHeight = document.documentElement.clientHeight;
//      app.iscroll.on('scroll', update);
//      // app.iscroll.on('scrollEnd', update);
//      function update() {
//
//
//      }
//    }, 100);
//  });

      $('.ineedperfume').click(function() {
      	var uuid = sessionStorage.getItem('uuid');
      	$(".bg-dianshang").addClass('xuanzhuan');
        setTimeout(function() {
        	$.ajax({
				   type: "GET",
				   url: app.postUrl +  "/wechart/api/awards",
				   data: {uuid: uuid},
				   success: function(res){
				   	console.log(res);
				   	app.hideDialog('dianshang');
				   	app.showDialog('result');
				   	app.stateshare = false;
				   	$(".bg-dianshang").removeClass('xuanzhuan');
				   	awardResult(res.code, res.object);
				   }
				});
        }, 1000);
      });

      //继续录音
      $(".shengchengerweima").click(function() {

      	$(".share-entrance").addClass('ds-none');
      	$(".real-perfume").addClass('ds-none');
      	$(".slide-text").addClass('ds-none');
      	$(".slide-pointer").addClass('ds-none');


      	app.hideDialog('dianshang');
      	app.showPage(2, 1);
	      $('.listen-local').fadeOut(500).removeClass('playing');
	      wx.stopVoice({
	        localId: voiceApi.voice.localId
	      })
	      if (app.keepPlaying) {
	        app.bgm.audio.play();
	      }

      })

      $('.sure').click(function() {
        if (sendNum == 1) {
          $('.sure-box').fadeOut(500);
          app.hideDialog('quchenshi');
        } else {
          $('.sure-box').fadeOut(500);
        }
      });


//    $('.admit').click(function() {
//      var $tel = $('.tel-input').val().trim();
//      var rep = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
//      if ($tel == '') {
//        // alert('请输入您的手机号码！');
//        $('.prompt').text('请输入您的手机号码！');
//        $('.sure-box').fadeIn(500);
//      } else if (!rep.test($tel)) {
//        // alert('请输入正确的手机号码！');
//        $('.prompt').text('请输入正确的手机号码！');
//        $('.sure-box').fadeIn(500);
//      } else {
//        if (sendNum == 1) {
//          // alert('您已经提交过了！');
//          $('.prompt').text('您已经提交过了！');
//          $('.sure-box').fadeIn(500);
//        } else {
//          ajax_sendTel($tel);
//        }
//      }
//    });
			//抽奖结果页面
			function awardResult(code, object) {
				if(code == 104) {
					$(".award_result").html(object);
				} else {
					var _img;
//					$(".award_result").html('中奖')
					if(code == 101) {
						_img = "<img src=\"img/thanks.png\" style=\"width: 80%\" />";

					} else if(code == 100) {
						if(object.awards.awardLevel == 1) {
							_img = "<img src=\"img/tickets.png\" style=\"width: 80%\" />";
						} else {
							_img = "<img src=\"img/bags.png\" style=\"width: 80%\" />";
						}

					}
					$(".award_result").html('').append(_img);

				}
			}
			//奖品生产二维码页面
//			$("#awardList.list").click(function() {
//				var award_id = $(this).attr('award_id');
//				alert(award_id);
//				$(this).find("#qrcode").removeClass('ds-none').siblings().find('#qrcode').addClass('ds-none');
//				var qrcode = new QRCode($("#qrcode"), {
//          width : 150,//设置宽高
//          height : 150
//      });
//      qrcode.makeCode(award_id);
//			})



//    function ajax_sendTel($mobile) {
//      $.ajax({
//        url: 'http://w.benbun.com/durex/qingrenjie/api/?m=home&c=index&a=saveMobile',
//        type: 'get',
//        dataType: 'jsonp',
//        data: {
//          mobile: $mobile
//        },
//        beforeSend: function() {
//          app.showDialog('loading');
//        },
//        success: function(data) {
//          if (data.code === 0) {
//            sendNum = 1;
//            // alert('提交成功！');
//            $('.prompt').text('提交成功！');
//            $('.sure-box').fadeIn(500);
//          } else {
//            // alert(data.msg);
//            $('.prompt').text(data.msg);
//            $('.sure-box').fadeIn(500);
//          }
//        },
//        error: function(xhr, errorType, error) {
//          // alert('提交失败，请检查您的网络设置！');
//          $('.prompt').text('提交失败，请检查您的网络设置！');
//          $('.sure-box').fadeIn(500);
//        },
//        complete: function() {
//          app.hideDialog('loading');
//        }
//      });
//    }
    }
  };
})();
