/**
 * 공통으로 사용하는 스크립트
 * 
 * 
 */

/**
 * 팝업 width 사이즈 및 중앙정렬
 */



function fnPopupSize(){
	var  widW = window.innerWidth,
	popupDivPopup = $("#popupDiv"),
	popupDivPopupWid = popupDivPopup.width();
	
	
	var popupDivPopup = $("#popupDiv-popup");
	
	popupDivPopup.css({"width":"100%","box-sizing":"border-box;"});
	
}


/**
 * 기본팝업
 * @param target
 * @param message
 * @param title
 * @param btnType  1: 1버튼  2: 2버튼  3: 1버튼 CALLBACK
 * @param callFunction OK버튼 클릭시 CALL BACK FUNCTION NAME
 * @returns
 */

function basicPopup(target,message,title,btnType,callFunction){
	//clear
	target.html("");
	
	//title set
	target.append("<div class='title_box'><h3>"+title+"</h3></div>");
//	target.append("<div class='title_box'><h3>"+$('#title').val()+"</h3></div>");
	
	//message set
	target.append("<p>"+message+"<br/></p>");
//	target.append("<p>"+$('#message').val()+"<br></p>");
	
	
	//확인 클릭시 CALL BACK FUNCTION
	var fnName = "";
	
	//default = 앱종료
	if(callFunction == null || callFunction ==""){
		fnName = "genstory://closesurvey";
	}
	else{
		fnName = callFunction;
	}
	
	//확인 버튼
	if(btnType == null || btnType == 1 || btnType==""){
		//확인 버튼 add
		target.append(' <div style="text-align:center" class="btn_popup_one full_tab">\
						<a href="#" class="" data-rel="back" id="btn_pop_ok">확인</a>\
						</div> ');
	}
	//취소,확인 버튼 add
	else if(btnType == "2"){
		
		$("#popupDiv").addClass("double");

		target.append(' <div style="text-align:center" class="btn_popup_one">\
								<a href="#" class="focused" data-rel="back" id="btn_pop_cancle">취소</a>\
								<a href="##" class="" id="btn_pop_ok">확인</a>\
								</div>');
		
		target.append("<a href='genstory://closesurvey' data-rel='back'><span class='popup_close'></span></a>");
	}
	//확인 후 CALLBACK
	else if(btnType == "3"){
		target.append(' <div style="text-align:center" class="btn_popup_one full_tab">\
						<a href="##" class="" id="btn_pop_ok">확인</a>\
						</div> ');
		
		//마지막 문제X 버튼 생성
		if(title == "제출 완료"){
			target.append("<a href='genstory://closesurvey' data-rel='back' class='btn_f'><span class='popup_close'></span></a>");
			console.log("3");
		}
		
	}
	target.html(target.html().replace("##",fnName));
		
	//target.append("<a href='genstory://closesurvey' data-rel='back'><span class='popup_close'><img src='../../resources/images/btn_popup_close.png'/></span></a>");
	

	//popup init
	target.popup({
 		history:false
 	});
	
	//popup open
	target.popup("open");
	
}

function goServer(url,params,fnName){
	var retValue;
	$.ajax({
	      type : "POST" //"POST", "GET"
	    , async : false //true, false
	    , url : url //Request URL
	    , dataType : "json" //전송받을 데이터의 타입 
	    , timeout : 30000 //제한시간 지정
	    , cache : false  //true, false
	    ,data : JSON.stringify(params) // JavaScript 객체를 JSON 객체로 변환하여 서버 요청시 전송
	    , contentType: "application/json; charset=UTF-8"
	    , error : function(request, status, error) {
	     /*alert("code : " + request.status + "\r\nmessage : " + request.reponseText+ "\r\error : " +error);*/
	    	console.log(request);
	    	console.log(status);
	    	console.log(error);
	    	//location.href="lglife/sessionOut";
    		basicPopup($('#popupDiv'),error,status);
	    	
	    }
	   	,success:function(json) {
	   		//파라미터가 있을 경우 함수 호출
	   		if(fnName != null && fnName != ""){
	   			fnName(json);
	   		}
	   		retValue= json;
	    }
	    , beforeSend: function(xmlHttpRequest) {
	    	/*$("input[type='checkbox']").checkboxradio('disable');*/
	    	xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
	    }
	    , complete: function() {
	     //$('#ajax_indicator').fadeOut();
	    }
	});	
	return retValue;
}

/**
 * 설문 결과가 마지막 그룹이었을 경우 종료
 * 
 */
function fnGoNextGroup(nextGroup) {
		
		//다음 그룹정보가 없을 경우 설문 종료
		if (nextGroup == null || nextGroup == "") {
			//$('#form').prop("action","genstory://closesurvey");
			basicPopup($('#popupDiv'),"감사합니다!<br/>모든 설문을 완료하셨습니다.","설문완료",3);
		}
		else{
			$('#form').submit();
		}
}

/**
 * 페이지 이동 WITH ANIMATION
 */
function fnChangePage(form){
	console.log($(form));
	$.mobile.changePage( form.prop("action"), {
		 transition:"slide",	
		  type: "post",
		  reverse:true,
		  data: form.serialize()
		});
	}

/**
 * 이전페이지로이동 ( 스와이프 )
 */
/*function fnPrevPage(){
	//답항이 없는 경우 설문페이지가 아님
//	var answer = "${answer}";
	//var answer = "d";
	if(answer == null || answer ==''){
		fnEndPopup();
	}
	else{
		var next_serial = "${nextSurvey.question_serial}";
		var next_order = "${nextSurvey.question_order}";
		
		if(next_serial != null && next_serial != ""){
			$("#question_order").val(next_order);
			$("#question_serial").val(next_serial);
			$('form').prop("action","${ctxPath}/app/survey/surveyDetail");
			$('form').submit();
			//fnChangePage($('form'));
		}
	}
}

*//**
 * 다음페이지로이동 ( 스와이프 )
 *//*
function fnNextPage(){
	var question_order = $("#question_order").val() -1;
	//첫번째 문항이나 그룹 인트로일 경우 경우
	if(question_order == 0 || question_order == -1||  question_order == null || question_order ==""){
	}
	else{
		$("#question_order").val(question_order);
		$("#question_serial").val("");
		$('form').prop("action","${ctxPath}/app/survey/surveyDetail");
		//fnChangePage($('form'));
		$('form').submit();
	}
}*/

/**
 *  종료팝업 표출
 * 
 */
function fnEndPopup(swipeStatus){
	
	switch(swipeStatus){
	case "Y" :	//스와이프 하여 종료시
		basicPopup($('#popupDiv'),"설문을 종료하시겠습니까?<br> <strong>설문이 순차적으로 진행되어, </br> 이전 그룹으로 이동하실 수 없습니다.</strong>","설문 종료",2,'javascript:fnWebViewExit();');
		break;
	case "N" :  //버튼 클릭하여 종료
	default	 :
		basicPopup($('#popupDiv'),"설문을 종료하시겠습니까?<br> <strong>현재까지 진행된 답변은 모두저장되며, </br> 추후 이어 진행하실 수 있습니다.</strong>","설문 종료",2,'javascript:fnWebViewExit();');
		break;
	}
	
}

/**
 * 세션 초기화, 웹뷰 종료
 */
function fnWebViewExit(){
	var ctxPath = getContextPath();
	var jqxhr = $.post( ctxPath+'/app/survey/invalidateSession')
		  .done(function() {
			  location.href="genstory://closesurvey";
		  }) ;
}
/**
 * get ContextPath
 * 
 */
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}

/**
 * ajax 로딩바, 투명도 조절 
 * 
 */
function fnShowLoading(){
	//$('.header_wrap, .question_page, .mob-btn-wrap').css("opacity","0.5");
	$('.all_group_wrap').append("<div class='white_back'></div>");
	
	var winH = $( window ).height(); 
	console.log($('.white_back'));
	$('.white_back').css('height',winH + 'px');
	
	$.mobile.loading('show', { });
	$("body").on( "swipeleft", function(){
	});
	$("body").on( "swiperight", function(){
	});
}



