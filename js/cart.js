//用户名
var use = location.search.substr(1,8);
//console.log(use);
if(use == "username") {
	var user = sessionStorage.username;
	if(user){
		document.querySelectorAll(".header_list")[0].innerHTML = '<span class="user_name"><span>' + user + '</span><span>，你好!</span></span><span class="quit">退出</span>'
		//退出按钮
		var quit = document.querySelector(".quit");
		if(quit) {
			quit.onclick = function() {
				sessionStorage.removeItem("username");
				localStorage.clear();
				location.href = "index.html";
			}
		}
		//确认订单按钮
		$(".affirm").click(function(){
			alert("购买");
		})
	}else{
		//确认订单按钮
		$(".affirm").click(function(){
			location.href="logIn.html";
		})
	}
}
//客户端下载显示和隐藏
var kehuduan = document.querySelector(".header_ul").lastElementChild;
var downloadWarp = document.getElementsByClassName("downloadWarp")[0];
kehuduan.onmouseover = function() {
	downloadWarp.className = "downloadWarp active";
}
kehuduan.onmouseout = function() {
	downloadWarp.className = "downloadWarp";
}

function Local() {
	//判断购物车是否为空
	if(localStorage.datas == undefined || localStorage.datas == "[]") {
		$(".cart_empty").show();
		$(".cart_nav").hide();
	} else {
		$(".cart_empty").hide();
		$(".cart_nav").show();
	}
	arr = JSON.parse(localStorage.datas);
	$(".cart_content").html(" ");
	var newBrandName = '';
	var makeUpNum = 0;
	for(var i = 0; i < arr.length; i++) {
		//有优惠商品
		if(arr[i].title && i == 0) {
			var div = document.createElement("div");
			div.className = 'cart_content';
			div.innerHTML = '<div class="duty_free"><div>此商品专享每满1000减60</div></div>'
			document.querySelector(".cart_content").appendChild(div);
		}
		var cartUl = document.createElement("ul");
		cartUl.className = "cart_product";
		cartUl.setAttribute("goodsId", arr[i].goodsId);
		if(arr[i].brandNameEN == arr[i].brandName) {
			newBrandName = arr[i].brandNameEN;
		} else {
			newBrandName = arr[i].brandNameEN + ' ' + arr[i].brandName;
		}
		//市场价有无
		if(arr[i].contrastPrice!=null){
			var contrastPrice = Number(arr[i].contrastPrice.value).toFixed(2);
			var newCon='市场价: ￥<span class="newCon">'+contrastPrice+'</span>'
		}else{
			var newCon='';
		}
		

		//  	console.log(Number(arr[i].price.value));
		if(Number(arr[i].price.value) >= 1000) {
			var onSale = (parseInt((Number(arr[i].price.value) * arr[i].pocunt) / 1000) * 60).toFixed(2)
			var newSale = '优惠：￥<span class="discounts_n">' + onSale + '</span>';
			//总计
			var subtotal = ((Number(arr[i].price.value) * arr[i].pocunt) - onSale).toFixed(2);
		} else {
			newSale = '';
			subtotal = (Number(arr[i].price.value) * arr[i].pocunt).toFixed(2);
		}

		//化妆品数量
		makeUpNum += arr[i].pocunt;

		cartUl.innerHTML = '<li class="f1 cart_product_c">' +
			'<div class="checkedWarp"><input class="checked" type="checkbox" checked/></div>' +
			'</li>' +
			'<li class="f1 cart_product_info">' +
			'<div class="cart_product_infof">' +
			'<img src="' + arr[i].pic + '" />' +
			'</div>' +
			'<div class="info_text">' +
			'<a>' +
			'<p><span>' + newBrandName + '</span></p>' +
			'<p><span class="hide">' + arr[i].name + '</span></p>' +
			'</a>' +
			'</div>' +
			'</li>' +
			'<li class="f1 cart_product_g">' +
			'<span>' + arr[i].specifications + '</span>' +
			'</li>' +
			'<li class="f1 cart_product_m">' +
			'<div class="info_text i_t">' +
			'<p class="newprice">免税价: ￥<span class="san">' + Number(arr[i].price.value).toFixed(2) + '</sapn></p>' +
			'<p class="market">'+ newCon + '</p>' +
			'<p class="discounts">' + newSale + '</p>' +
			'</div>' +
			'</li>' +
			'<li class="f1 cart_product_nm">' + arr[i].limitNumber + '</li>' +
			'<li class="f1 cart_buy_num">' +
			'<div class="cm_counter">' +
			'<button class="f1 cm_counter_subtract">-</button>' +
			'<input class="f1 cm_counter_inp" value="' + arr[i].pocunt + '"/>' +
			'<button class="f1 cm_counter_increase">+</button>' +
			'</div>' +
			'</li>' +
			'<li class="f1 cart_buy_x">￥' + subtotal + '</li>' +
			'<li class="f1 cart_buy_operate">' +
			'<button class="cart_buy_coll">收藏</button><span>|</span><button class="cart_buy_del">删除</button>' +
			'</li>'

		document.querySelector(".cart_content").appendChild(cartUl);
		$(".two").html(makeUpNum);
	}
     
     
    //显示市场价
    var crr=document.querySelectorAll(".market");
    for(var hl=0;hl<crr.length;hl++){
    	if(crr[hl].innerHTML){
    		crr[hl].style.display="block";
    	}else{
    		crr[hl].style.display="none";
    	}
    }
	$.each(JSON.parse(localStorage.datas), function(index, ele) {
		if(Number(ele.price.value) > 1000) {
			$(".discounts").show();
			$(".i_t").eq(index).addClass("i_n").siblings().removeClass("i_n");
		}
	})
	

	GoTotal();
//  Xu();
	NeX();
	kdfF();
	check();
	
}
Local();





function Xu() {
	//输入框减操作
	$(".cm_counter_subtract").click(function() {
		var ShopNum = Number($(this).next().attr("value"));

		if(ShopNum == 1) {
			$(this).next().attr("value", "1");
		} else {
			ShopNum--;
			$(this).next().attr("value", ShopNum);
		}
		//优惠价格的改变
		var price = Number($(this).parent().parent().prev().prev().find(".san").html());
		var NewDiscou = parseInt((Number($(this).next().attr("value")) * price) / 1000) * 60;
		$(this).parent().parent().prev().prev().find(".discounts_n").html(NewDiscou.toFixed(2));

		//总计的改变
		var str = $(this).parent().parent().prev().prev().find(".discounts").html();

		if(str) {
			var discounts = Number($(this).parent().parent().prev().prev().find(".discounts_n").html());
			var newtotal = Number($(this).next().attr("value")) * price - discounts;
		} else {
			var newtotal = Number($(this).next().attr("value")) * price;
		}
		$(this).parent().parent().next().html('￥' + newtotal.toFixed(2))
		GoTotal();
	})

	//输入框加操作
	$(".cm_counter_increase").click(function() {
		var ShopNum = Number($(this).prev().attr("value"));
		if(ShopNum >= Number($(this).parent().parent().prev().html())) {
			$(this).prev().attr("value", Number($(this).parent().parent().prev().html()));
		} else {
			ShopNum++;
			$(this).prev().attr("value", ShopNum);
		}
		//优惠价格的改变
		var price = Number($(this).parent().parent().prev().prev().find(".san").html());
		var NewDiscou = parseInt((Number($(this).prev().attr("value")) * price) / 1000) * 60;
		$(this).parent().parent().prev().prev().find(".discounts_n").html(NewDiscou.toFixed(2));
		//总计的改变
		var str = $(this).parent().parent().prev().prev().find(".discounts").html();
		if(str) {
			var discounts = Number($(this).parent().parent().prev().prev().find(".discounts_n").html());
			var newtotal = Number($(this).prev().attr("value")) * price - discounts;
		} else {
			var newtotal = Number($(this).prev().attr("value")) * price;
		}
		$(this).parent().parent().next().html('￥' + newtotal.toFixed(2))
		GoTotal();
	});
}
Xu();
//商品总价等
function GoTotal() {
	var x = document.querySelectorAll(".cart_buy_x");
	var z = document.querySelectorAll(".cm_counter_inp");
	var g = document.querySelectorAll(".cm_counter_increase");
	var f = document.querySelectorAll(".discounts");
	var d = document.querySelectorAll(".discounts_n");
	var y = 0;
	var newfid = 0;
	var makeUp = 0;
	var youHui = 0;
	for(var j = 0; j < x.length; j++) {
		//判断有无input
		if(z[j]) {
			makeUp += Number(z[j].value);
			if(z[j].innerText) {
				var fidNum = Number(z[j].innerText.substr(4));
				newfid += fidNum;
				$(".prefere_money").html(newfid.toFixed(2))
			}
		}
		//有无小计值
		if(x[j]) {
			if(x[j].innerHTML == "---") {
				x[j].innerText = 0;
			};
			y += Number(x[j].innerText.substr(1));
		}
		if(d[j]) {
			youHui += Number(d[j].innerText);
		}
		if(f[j].innerHTML) {
			$(".duty_free").show()
		}
	}
	if(makeUp >= 12) {
		makeUp = 12;
		for(var l = 0; l < g.length; l++) {
			g[l].disabled = true;
		}
	} else {
		for(var l = 0; l < g.length; l++) {
			g[l].disabled = false;
		}
	}
	$(".total_true strong").html('￥' + y.toFixed(2));
	$(".figure_money").html(y.toFixed(2));
	$(".limit_money").html('￥' + y.toFixed(2));
	$(".two").html(makeUp);
	$(".prefere_money").html(youHui.toFixed(2));
}
//      GoTotal();

function NeX() {
	//全选
	var flag = true;
	$(".cart_check input,.all_info_checkbox input").click(function() {
		$(".cart_product_c input").attr("checked", $(this).attr("checked"));
		if(flag) {
			$(".checkedWarp").addClass("newpos");
			$(".duty_free,.cart-category-restricted").hide();
			flag = false;
			$(".total_shop_money").html("商品金额：￥0.00");
			$(".total_true strong").html("￥0.00")
		} else {
			$(".checkedWarp").removeClass("newpos");
			$(".duty_free,.cart-category-restricted").show();
			flag = true;
			$(".total_shop_money").html('<span class="figure"><span>商品金额：￥</span><span class="figure_money"></span></span><span class="prefere"><span>-折扣优惠：￥</span><span class="prefere_money"></span></span>');
		GoTotal();
		}
		
	})

	//单选
	$(".cart_product_c input").click(function() {
		var ul=$(this).index();
		if($(this).prop("checked")==false){
			flag=true;
		}else{
			flag=false;
		}
		var bool = $(this).parent().parent().next().next().next().find(".discounts");
		var jhg = $(this).parent().parent().next().next().next().children().first();
		var one = $(this).parent().parent().next().next().next().next();
		var two = $(this).parent().parent().next().next().next().next().next();
		var three = $(this).parent().parent().next().next().next().next().next().next();
		if(flag) {
			$(this).parent().addClass("newpos");
			$(".cart_check .checkedWarp,.all_info_checkbox .checkedWarp").addClass("newpos");
			jhg.removeClass("i_n");
			bool.hide();
			one.html("---");
			two.html("---");
			three.html("---");
			$(this).attr("value", 0);
			flag = false;
		} else {
			$(this).parent().removeClass("newpos");
			$(".cart_check .checkedWarp,.all_info_checkbox .checkedWarp").removeClass("newpos");
			bool.show();
			jhg.addClass("i_n");
			one.html(12);
			two.html('<div class="cm_counter"><button class="f1 cm_counter_subtract">-</button><input class="f1 cm_counter_inp" value="1" /><button class="f1 cm_counter_increase">+</button></div>');
			three.html(thistol(ul));
			flag = true;
		}
		$(".total_true strong").html("￥"+zong(ul))
		$(".figure_money").html(zong(ul));
		$(".limit_money").html("￥"+zong(ul));
//		GoTotal();
		Xu();
//      zong();

	})

}
NeX();

function kdfF() {
	//删除
	$(".cart_buy_del").click(function() {
		var goodsId = $(this).parent().parent().attr("goodsId");
		Del(goodsId);
		Local();
		Xu();
//		GoTotal();
	})
}
//kdfF();

//删除选中的商品
function del(){
$(".del_all").click(function() {
	var gfe = document.querySelectorAll(".cart_product_c input");
	var ulrr = document.querySelectorAll(".cart_product");
	for(var i = 0; i < gfe.length; i++) {
//		console.log(gfe[i].checked);
		if(gfe[i].checked) {
			var Id = ulrr[i].getAttribute("goodsId");
//			console.log(Id);
			Del(Id);
		}
	}
	Local();
//	GoTotal();
	newc();
//	NeX();
    Xu();
})
}
del();


//删除函数
function Del(goodsId) {
	var arr = JSON.parse(localStorage.datas);
	for(var b = 0; b < arr.length; b++) {
		if(arr[b].goodsId == goodsId) {
			arr.splice(b,1);
		}
	}
	localStorage.datas = JSON.stringify(arr);
}


function zong(index){
	var san=document.querySelectorAll(".san");
//	var newprice=document.querySelectorAll(".newprice");
	var discountsN=document.querySelectorAll(".discounts_n");
	var cmCounterInp=document.querySelectorAll(".cm_counter_inp");
	var cartBuyNum=document.querySelectorAll(".cart_buy_num");
	var discounts=document.querySelectorAll(".discounts");
	var sum=0;
	var daf=0;
	var BuyNum=0;
	for(var i=0;i<san.length;i++){
	    if(cartBuyNum[i].innerHTML=="---"){
        	BuyNum=0;
        }else{
        	BuyNum=Number(cmCounterInp[index].value);
        }
		if(discounts[i].innerHTML){
			daf=Number(discountsN[index].innerHTML);
		}else{
			daf=0;
		}
		sum+=(BuyNum*Number(san[i].innerHTML))-daf;
	}
	return sum.toFixed(2);
}


function  thistol(index){
	var sum=0;
	var x=Number($(".cm_counter_inp").eq(index).attr("value"));
	var y=Number($(".san").eq(index).html());
	sum=x*y;
	return sum.toFixed(2);
}

function check(){
	var flag=true;
	var check=document.querySelectorAll(".cart_product_c input");
	var cartCheck=document.querySelector(".cart_check input");
	var allInfoCheckbox=document.querySelector(".all_info_checkbox input");
	for(var i=0;i<check.length;i++){
//		if(check[i].className==".checkedWarp ne")
//		console.log(check[i].checked)
		check[i].onchange=function(){
			for(var j=0;j<check.length;j++){
				if(check[j].checked==false){
					flag=false;
				}else{
					flag=true;
				}
			}
			if(flag){
				cartCheck.checked=allInfoCheckbox.checked=true;
			}else{
				cartCheck.checked=allInfoCheckbox.checked=false;
			}
		}
	}
}
//check();


function newc(){
	var flage=true;
	var j=document.querySelectorAll(".cart_product_c input");
	var k=document.querySelector(".cart_check div");
	var l=document.querySelector(".all_info_checkbox div");
	for(var i=0;i<j.length;i++){
		
		if(j[i].checked==false){
			flage=false;
		}else{
			flage=true;
		}
	}
	if(flage){
		k.checked=l.checked=true;
		k.className="checkedWarp lef";
		l.className="checkedWarp lef newlef";
	}else{
		k.checked=l.checked=false;
		k.className="checkedWarp lef newpos";
		l.className="checkedWarp lef newlef newpos";
	}
}