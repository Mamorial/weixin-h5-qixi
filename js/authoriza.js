$(function() {

})

function getMyPrize() {
	var uuid = sessionStorage.getItem('uuid');
	app.showDialog('dianshang');
	console.log(uuid);
	$.ajax({
	type:"get",
	url: app.postUrl + "/wechart/api/getAward",
	data: {uuid: uuid},
	success: function(res) {
		console.log(res)
		if(res.code == 101) {

//			$(".user-award").css('display', 'none');
		}
		if(res.code == 100) {
			$(".bg-dianshang").css("display", 'none');
	   		$(".award_info").css("display", "block");
	   		$("#content_level").html(res.object.awards.awardType);
	   		$("#content_htm").html(res.object.awards.awardName);
	   		$(".shengchengerweima").css('display', 'block');
	   		$(".ineedperfume").css('display', 'none');
	   		$("#qrcode").attr('level', res.object.record.id);
		} else {
			$(".user-award").css('display', 'none');
		}
	}
	});
}


//var author = {};
//author.fn = function() {
//	console.log('author');
//	console.log(app.user_uuid);
//	$.ajax({
//		type:"get",
//		url:"//192.168.0.108:8080/wechart/api/getAward",
//		data: {uuid: app.user_uuid},
//		success: function(res) {
//			if(res.code == 101) {
//				$(".user-award").css('display', 'none');
//			}
//			if(res.code == 100) {
//				$(".bg-dianshang").css("display", 'none');
//		   		$(".award_info").css("display", "block");
//		   		$("#content_level").html(res.object.awards.awardType);
//		   		$("#content_htm").html(res.object.awards.awardName);
//		   		$(".shengchengerweima").css('display', 'block');
//		   		$(".ineedperfume").css('display', 'none');
//		   		$("#qrcode").attr('level', res.object.record.id);
//			} else {
//				$(".user-award").css('display', 'none');
//			}
//		}
//	});
//}
//(function() {
//	$(function() {
//		$.ajax({
//			type:"get",
//			url:"//192.168.0.108:8080/wechart/api/getAward",
//			success: function(res) {
//				if(res.code == 101) {
//					$(".user-award").css('display', 'none');
//				}
//				if(res.code == 100) {
//					$(".bg-dianshang").css("display", 'none');
//			   		$(".award_info").css("display", "block");
//			   		$("#content_level").html(res.object.awards.awardType);
//			   		$("#content_htm").html(res.object.awards.awardName);
//			   		$(".shengchengerweima").css('display', 'block');
//			   		$(".ineedperfume").css('display', 'none');
//			   		$("#qrcode").attr('level', res.object.record.id);
//				} else {
//					$(".user-award").css('display', 'none');
//				}
//			}
//		});
//	})
//	function akk() {
//			app.showDialog('dianshang');
//
//      var len = $("#qrcode").find('img').length;
//      console.log(len);
//      if(len < 1) {
//      	var qrcode = new QRCode(document.getElementById("qrcode"), {
//          width : 96,//设置宽高
//          height : 96
//      });
//      var str = $("#qrcode").attr('level');
//      	qrcode.makeCode(str);
//      }
//
//		}
//
//})();
