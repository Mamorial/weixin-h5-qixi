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

      $('.ineedperfume').click(function() {
      	var uuid = sessionStorage.getItem('uuid');
        $.ajax({
		   type: "GET",
		   url: app.postUrl +  "/wechart/api/awards",
		   data: {uuid: uuid},
		   success: function(res){
//		   	alert(res.code);
		   	sessionStorage.setItem('state', true);
//				   	$(".award_info").css("display", "block");
		   	if(res.code == 101) {
//		   		$(".award_info").css("display", "block");
				$(".bg-dianshang").attr("src", 'img/thanks.png');
				$(".ineedperfume").css('display', 'none');
//		   		$(".award_info").html("").html(res.object);
		   	} else if(res.object.awards.awardLevel == 0){
//				   		$(".bg-dianshang").css("display", 'none');
//				   		$("#content_htm").html(res.object.awardName);
		   	} else {
		   		$(".bg-dianshang").css("display", 'none');
		   		$(".award_info").css("display", "block");
		   		$("#content_level").html(res.object.awards.awardType);
		   		$("#content_htm").html(res.object.awards.awardName);
		   		$(".shengchengerweima").css('display', 'block');
		   		$(".ineedperfume").css('display', 'none');
		   		$("#qrcode").attr('level', res.object.record.id);
		   	}
		   }
		});
      });
      //生成二维码
      $(".shengchengerweima").click(function() {
			var len = $("#qrcode").find('img').length;
	        console.log(len);
	        if(len < 1) {
	        	var qrcode = new QRCode(document.getElementById("qrcode"), {
	            width : 120,//设置宽高
	            height : 120
	        });
	        var str = $("#qrcode").attr('level');
	        	qrcode.makeCode(str);
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


      $('.admit').click(function() {
        var $tel = $('.tel-input').val().trim();
        var rep = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if ($tel == '') {
          // alert('请输入您的手机号码！');
          $('.prompt').text('请输入您的手机号码！');
          $('.sure-box').fadeIn(500);
        } else if (!rep.test($tel)) {
          // alert('请输入正确的手机号码！');
          $('.prompt').text('请输入正确的手机号码！');
          $('.sure-box').fadeIn(500);
        } else {
          if (sendNum == 1) {
            // alert('您已经提交过了！');
            $('.prompt').text('您已经提交过了！');
            $('.sure-box').fadeIn(500);
          } else {
            ajax_sendTel($tel);
          }
        }
      });

      function ajax_sendTel($mobile) {
        $.ajax({
          url: 'http://w.benbun.com/durex/qingrenjie/api/?m=home&c=index&a=saveMobile',
          type: 'get',
          dataType: 'jsonp',
          data: {
            mobile: $mobile
          },
          beforeSend: function() {
            app.showDialog('loading');
          },
          success: function(data) {
            if (data.code === 0) {
              sendNum = 1;
              // alert('提交成功！');
              $('.prompt').text('提交成功！');
              $('.sure-box').fadeIn(500);
            } else {
              // alert(data.msg);
              $('.prompt').text(data.msg);
              $('.sure-box').fadeIn(500);
            }
          },
          error: function(xhr, errorType, error) {
            // alert('提交失败，请检查您的网络设置！');
            $('.prompt').text('提交失败，请检查您的网络设置！');
            $('.sure-box').fadeIn(500);
          },
          complete: function() {
            app.hideDialog('loading');
          }
        });
      }
    }
  };
})();
