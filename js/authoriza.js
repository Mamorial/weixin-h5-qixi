 var startX,//触摸时的坐标
     startY,
      x, //滑动的距离
      y,
      aboveY=0; // 设一个全局变量记录上一次内部块滑动的位置
// var documentHeight=$("#awardList").height();//内部滑动模块的高度
   var documentHeight=app.awardHeight//内部滑动模块的高度
   var wapperHeight=$("#outer").height(); //外部框架的高度


          var inner=document.getElementById("awardList");

             function touchStart(e){//触摸开始
//       e.preventDefault();
         setTimeout(function() {
         	var touch=e.touches[0];
        startY = touch.pageY;   //刚触摸时的坐标
         }, 500)
             }

             function touchMove(e){//滑动
          e.preventDefault();
         var  touch = e.touches[0];
          y = touch.pageY - startY;//滑动的距离

          if(!aboveY) {
//        	alert(aboveY);
          	aboveY = 0;
          	inner.style.top=y+"px";
          } else {
          	inner.style.top=aboveY+y+"px";
          }
//        inner.style.top=aboveY+y+"px";
//        document.getElementById("spText").innerHTML=inner.style.top;


             }

             function touchEnd(e){//手指离开屏幕
          aboveY=parseInt(inner.style.top);//touch结束后记录内部滑块滑动的位置 在全局变量中体现 一定要用parseInt()将其转化为整数字;
           if(y>0&&aboveY>0){//当滑动到最顶端时候不能再网上滑动
               //inner.style.top=0;
                $("#awardList").animate({top:0},200);
                aboveY=0;
             }

           if(y<0&&(aboveY<(-($("#awardList").height()-wapperHeight)))){//当滑动到最底部时候不能再网下滑动
             // inner.style.top=-(documentHeight-wapperHeight)+"px";
             	if($("#awardList").height() > 250) {
             		$("#awardList").animate({top:-($("#awardList").height()-wapperHeight)},200);
             		aboveY=-($("#awardList").height()-wapperHeight);
             	} else {
             		$("#awardList").animate({top:0},200);
             		aboveY=0;
             	}
//             $("#awardList").animate({top:-($("#awardList").height()-wapperHeight)},200);
//            aboveY=-($("#awardList").height()-wapperHeight);
           }
     }//
      document.getElementById("outer").addEventListener('touchstart', touchStart,false);
      document.getElementById("outer").addEventListener('touchmove', touchMove,false);
      document.getElementById("outer").addEventListener('touchend', touchEnd,false);

//function getMyPrize() {
//	var uuid = sessionStorage.getItem('uuid');
//	app.showDialog('dianshang');
//	console.log(uuid);
//	$.ajax({
//	type:"get",
//	url: app.postUrl + "/wechart/api/getAward",
//	data: {uuid: uuid},
//	success: function(res) {
//		console.log(res)
//		if(res.code == 101) {
//
////			$(".user-award").css('display', 'none');
//		}
//		if(res.code == 100) {
//			$(".bg-dianshang").css("display", 'none');
//	   		$(".award_info").css("display", "block");
//	   		$("#content_level").html(res.object.awards.awardType);
//	   		$("#content_htm").html(res.object.awards.awardName);
//	   		$(".shengchengerweima").css('display', 'block');
//	   		$(".ineedperfume").css('display', 'none');
//	   		$("#qrcode").attr('level', res.object.record.id);
//		} else {
//			$(".user-award").css('display', 'none');
//		}
//	}
//	});
//}


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
