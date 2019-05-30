$(function(){
	$.ajax({
	type:"get",
	url:"../json/logIn.json",
	async:true,
	dataType:"json",
	success:function(res){
	  $(".lonInLefDdiv").append("<img src="+res.pic+" />");
	  
	  var obj={};
	  var Regphone=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
	 //发送验证码
	  	var newcode="";
	  	var timer=null;
	  	$(".forward button").click(function(){
	  		newcode="";
	  		var phoneVa=$(".Register_phone_input input").attr("value");
	  		if(phoneVa){
	  			if(Regphone.test(phoneVa)){
	  				for(var i=0;i<4;i++){
			  		   		newcode+=Math.floor(Math.random()*10)+"";
				  		}
				  		alert(newcode);
				  		$(this).attr("disabled",true);
				  		$(this).css("background-color","#666666");
				  		$(this).html('<span class="shi">60</span>秒后重试');
				  		var shiNum=Number($(".shi").html());
				  		console.log(shiNum);
				  		var that=this;
				  	    timer=setInterval(function(){
				  			shiNum--;
				  			$(".shi").html(shiNum);
				  			if(shiNum==0){
				  				clearInterval(timer);
				  				$(that).attr("disabled",false);
				  				$(that).html('发送验证码');
				  				$(that).css("background","#b81c22");
				  			}
				  		},1000)
				  		
	  			}else{
	  				$(".Register_phone_hint").css("display","block");
	  				$(".Register_phone_hint").addClass("phone_hint");
	  				$(".phone_title").css("display","block");
	  			    $(".phone_title").html("手机号格式有误");
	  			}
			}else{
	  			$(".phone_title").css("display","block");
	  			$(".phone_title").html("手机号不能为空");
	  		}
	  		
	  		
	  	})
	  
	  //手机输入框聚焦事件  手机框和密码框验证
	  function Check(ele,reg,tips){
	  	var eles=document.getElementsByClassName(ele)[0];
	  	eles.onblur=function(){
//	  		console.log(newcode);
            if(ele=="password"){
	            passwordVal=document.getElementsByClassName(ele)[0].value;
//	            console.log(passwordVal);
            }
            if(this.value){
	  			if(reg.test(this.value)||this.value==newcode||this.value==passwordVal){
	  				this.parentNode.parentNode.lastElementChild.previousElementSibling.style.display="block";
	  				this.parentNode.parentNode.lastElementChild.previousElementSibling.className="phone_hint";
	  				this.parentNode.parentNode.lastElementChild.innerHTML="";
	  				obj[ele]=true;
	  			}else{
	  				this.parentNode.parentNode.lastElementChild.previousElementSibling.style.display="block";
	  				this.parentNode.parentNode.lastElementChild.style.display="block";
	  				this.parentNode.parentNode.lastElementChild.innerHTML=tips+"格式有误";
	  				obj[ele]=false;
		  		}
	  		}else{
	  			this.parentNode.parentNode.lastElementChild.style.display="block";
	  			this.parentNode.parentNode.lastElementChild.innerHTML=tips+"不能为空";
	  			obj[ele]=false;
	  		}
	  	}
	  }
	  Check("phonenum",Regphone,"手机号");
	  Check("password",/\w{6,12}/,"密码");
	  Check("phonecode",/ /,"手机验证码");
	  Check("agianpassword",/ /,"密码");
	  
	  
	  var register=document.querySelector(".register");
	  register.onclick=function(){
	  	var phonenumr=document.querySelector(".phonenum").value;
	  	var passwordw=document.querySelector(".password").value;
	  	 if(obj.phonenum&&obj.password&&obj.phonecode&&obj.agianpassword){
	  	 	
//	  	 	判断是不是第一次注册
	  	 	var localSt=localStorage.userarr;
	  	 	if(localSt==undefined){
	  	 		localStorage.userarr="[]";
	  	 	}
	  	 	var arr=JSON.parse(localStorage.userarr);
	  	 	//创建注册信息
	  	 	var userObj={
	  	 		username:phonenumr,
				pass:passwordw
	  	 	}
	  	 	
	  	 	
	  	 	//判断是否注册过
	  	 	if(CheckName(phonenumr)){
	  	 		alert("此账号已经注册过，请重新注册");
	  	 	}else{
	  	 		arr.push(userObj);
	  	 		sessionStorage.username = phonenumr;
	  	 		alert("注册成功，即将跳转首页");
	  	 	    location.href="index.html?username";
	  	 	}
	  	 	localStorage.userarr=JSON.stringify(arr);
          }
	  }
	}
   })
})	

function CheckName(name){
	var er=JSON.parse(localStorage.userarr);
	for(var i=0;i<er.length;i++){
		if(er[i].username==name){
			return true;
		}
	}
	return false;
	
}
