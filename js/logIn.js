$(function() {
	$.ajax({
		type: "get",
		url: "../json/logIn.json",
		async: true,
		dataType: "json",
		success: function(res) {
			$(".lonInLefDdiv").append("<img src=" + res.pic + " />");
			//验证码按钮
			document.querySelector("#send_code button").onclick = function() {
				var phoneVal = document.querySelector(".phone_border input").value;
				var phoneReg = /^1(3|4|5|7|8)\d{9}$/;
				codes = "";
				if(phoneReg.test(phoneVal)) {
					if(CheckPhone(phoneVal)) {
						for(var i = 0; i < 4; i++) {
							var randomNum = Math.floor(Math.random() * 10) + "";
							codes += randomNum;

							document.querySelector(".mobile b").style.display = "block";
							document.querySelector(".mobile b").className = "phonetrue";
							document.querySelector(".hint").innerHTML = "";
						}
						alert(codes);
						//60s后重新发送验证码
						$(this).attr("disabled", true);
						$(this).css("background-color", "#666666");
						$(this).html('<span class="shi">60</span>秒后重试');
						var shiNum = Number($(".shi").html());
//						console.log(shiNum);
						var that = this;
						timer = setInterval(function() {
							shiNum--;
							$(".shi").html(shiNum);
							if(shiNum == 0) {
								clearInterval(timer);
								$(that).attr("disabled", false);
								$(that).html('发送验证码');
								$(that).css("background", "#b81c22");
							}
						}, 1000)

					}
//					else {
		//				document.querySelector(".hint").style.display="block";
		//	    		document.querySelector(".hint").innerHTML="手机号格式错误";
		//	    		document.querySelector(".mobile b").style.display="block";
		//	    		document.querySelector(".mobile b").className="";
//						alert("此手机号还没注册");
//						location.href = "register.html?username";
//					}
				} else {
					document.querySelector(".hint").style.display = "block";
					document.querySelector(".hint").innerHTML = "手机号格式错误";
					document.querySelector(".mobile b").style.display = "block";
					document.querySelector(".mobile b").className = "";
				}

			}

			var loginBtn = document.querySelector(".login button");
			loginBtn.onclick = function() { //登陆按钮
				//  	console.log(code)
				var phoneVal = document.querySelector(".phone_border input").value;
				var codeVal = document.querySelector(".write_code input").value;
//				console.log(phoneVal);
				if(CheckPhone(phoneVal)) { //本地存储中有无此手机号
					//  		console.log(1)
					document.querySelector(".mobile b").style.display = "block";
					document.querySelector(".mobile b").className = "phonetrue";
					document.querySelector(".hint").innerHTML = "";
					if(document.querySelector(".login_password")) { //如果有密码框
						var passwordVal = document.querySelector(".password_border input").value;
						if(CheckPass(passwordVal)) { //验证密码
							document.querySelector(".login_password b").style.display = "block";
							document.querySelector(".login_password b").className = "passwordtrue";
							document.querySelector(".newhint").innerHTML = "";

							if(codeVal) { //验证验证码
								//		    			console.log(code);
								if(verifyCode.validate(codeVal)) {
									sessionStorage.username = phoneVal;
									location.href = "index.html?username";
								} else {
									document.querySelector(".vessel").style.display = "block";
								}
							} else {
								document.querySelector(".vessel").style.display = "block";
							}
						} else {
							document.querySelector(".newhint").style.display = "block";
							document.querySelector(".newhint").innerHTML = "密码不正确";
							document.querySelector(".login_password b").style.display = "block";
							verifyCode.refresh();
						}
					} else { //没有密码框直接验证二维码
						if(codeVal) {
							if(codeVal == codes) {
								sessionStorage.username = phoneVal;
								location.href = "index.html?username";
							} else {
								document.querySelector(".vessel").style.display = "block";
							}
						} else {
							document.querySelector(".vessel").style.display = "block";
						}
					}
				} else {
					//document.querySelector(".hint").style.display="block";
					//document.querySelector(".hint").innerHTML="手机号格式错误";
					//document.querySelector(".mobile b").style.display="block";
					//document.querySelector(".mobile b").className="";
					alert("此手机号还没注册");
					location.href = "register.html?username";

				}

			}
			document.querySelector(".codeH_top button").onclick = document.querySelector(".codeH_Bo button").onclick = function() {
				document.querySelector(".vessel").style.display = "none";
			}

			//点击切换按钮
			var verifyCode = null;
			var flag = true;
			var loginFormP = document.querySelector(".login_form>p");
			var logswitchWay = document.querySelectorAll(".logswitch_way span");
			var selWay = document.querySelectorAll(".logswitch_way i");
			for(var i = 0; i < selWay.length; i++) {
				selWay[i].index = i;
				selWay[i].onclick = function() { //会员手机号切换

					document.querySelector(".phone_border input").value = "";
					document.querySelector(".mobile b").style.display = "none";
					for(var j = 0; j < selWay.length; j++) {
						selWay[j].className = "";
					}
					this.className = "slect";
					loginFormP.innerHTML = logswitchWay[this.index].innerText;
					if(this.index == 1) { //会员

						document.querySelector(".phone_border input").setAttribute("placeholder", "用户邮箱/手机号/用户名");
						document.querySelector(".mobile i").className = "newicon";
						if(flag) {
							var loginpassword = document.createElement("div"); //插入密码框
							loginpassword.className = "login_password";
							loginpassword.innerHTML = '<div class="password_border">' +
								'<input  placeholder="输入密码"/>' +
								'</div>' +
								'<i></i>' +
								'<span class="newhint">错误</span>' +
								'<b></b>'
							document.querySelector(".panels").insertBefore(loginpassword, document.querySelector(".auth_code"));
							flag = false;
							var refresh = document.createElement("div"); //刷新按钮
							refresh.className = "refresh";
							document.querySelector(".auth_code").appendChild(refresh);

							$(".refresh").click(function() {
								verifyCode.refresh();
							})
						}
						document.querySelector("#send_code").style.cssText = "margin: 0 8px 0 10px;width: 76px;height: 37px;";
						document.querySelector("#send_code").innerHTML = '';
						verifyCode = new GVerify("send_code");

					} else { //手机号
						flag = true;
						document.querySelector(".phone_border input").setAttribute("placeholder", "输入手机号");
						document.querySelector(".mobile i").className = "";
						if(document.querySelector(".login_password")) {
							document.querySelector(".login_password").remove();
							document.querySelector(".refresh").remove()
						}
						document.querySelector("#send_code").innerHTML = '<button>发送验证码</button>';

					}

				}
			}

		}

	});

})

//验证是否有此手机号
function CheckPhone(phone) {
	var ty=localStorage.userarr;
	if(ty==undefined){
		alert("此手机未注册");
		location.href="register.html";
	}else{
	//获取存储的用户名和密码
	var arr = JSON.parse(localStorage.userarr);
	console.log(arr);
	for(var m = 0; m < arr.length; m++) {
		console.log(arr[m].username);
		if(arr[m].username == phone) {
			return true;
		}
		return false;
	}
	}
	
}

//检测密码
function CheckPass(userPassword) {
	//获取存储的用户名和密码
	var arr = JSON.parse(localStorage.userarr);
	console.log(arr);
	for(var x = 0; x < arr.length; x++) {
		if(arr[x].pass == userPassword) {
			return true;
		}
	}
	return false;
}