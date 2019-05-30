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
				location.href = "index.html";
			}
		}
	}
}

ajax("get", "../json/index.json", "", true, function(res) {
	var obj = JSON.parse(res);
	console.log(obj);
	//导航渲染
	var nav_str = "";
	for(var i = 0; i < obj.navigations.length; i++) {
		//  				console.log(obj.navigations[i].name)
		nav_str += '<li>' +
			'<a>' + obj.navigations[i].name + '</a>' +
			'</li>'
	}
	var nav_ul = document.getElementsByClassName("nav_ul")[0];
	nav_ul.innerHTML = nav_str;

	//商品分类的渲染
	var shopul = document.getElementsByClassName("category")[0];
	var shopList = obj.categorys;
	//  		    console.log(shopList);
	for(var j = 0; j < shopList.length; j++) {
		//循环添加li
		var shopli = document.createElement("li");
		shopli.setAttribute("product", Number(shopList[j].categorys))
		shopli.innerHTML = '<a>' +
			'<img src="' + shopList[j].icon + '"/>' +
			'<span>' + shopList[j].name + '</span>' +
			'</a>'
		var shopdiv = document.createElement("div");
		shopdiv.className = "skin";

		var skinLeft = document.createElement("div");
		skinLeft.className = "skin_left",
			//在div里面添加一个左边框
			shopdiv.appendChild(skinLeft);

		for(var k = 0; k < shopList[j].subCategorys.length; k++) {
			var skinList = document.createElement("div");
			if(k == 0) {
				skinList.className = "skin_list";
			} else {
				skinList.className = "skin_list skin_lists";
			}
			skinList.innerHTML = '<a>' +
				'<span>' + shopList[j].subCategorys[k].name + '</span>' +
				'</a>'

			var skins = document.createElement("div");
			skins.className = "skins";
			skinList.appendChild(skins);

			for(var l = 0; l < shopList[j].subCategorys[k].subCategorys.length; l++) {
				var skinsList = document.createElement("a");
				skinsList.innerHTML = shopList[j].subCategorys[k].subCategorys[l].name;
				//添加列表内容
				skins.appendChild(skinsList);
			}

			//往左边框添加一个列表
			skinLeft.appendChild(skinList);
		}

		var shopphoto = document.createElement("div");
		shopphoto.className = "shopphoto";
		shopphoto.innerHTML = '<a>' +
			'<img src="' + shopList[j].adv.pic + '"/>' +
			'</a>'
		//添加图片                    
		skinLeft.appendChild(shopphoto);

		//添加右边框
		var skinRight = document.createElement("div");
		skinRight.className = "skin_right";
		skinRight.innerHTML = '<p>热门品牌</p>'
		for(var m = 0; m < shopList[j].hotBrands.length; m++) {
			var brand = document.createElement("a");
			brand.innerHTML = '<img src="' + shopList[j].hotBrands[m].pic + '"/>'
			skinRight.appendChild(brand);
		}
		shopdiv.appendChild(skinRight);

		//在li里面添加一个div
		shopli.appendChild(shopdiv);
		//把li添加到ul
		shopul.appendChild(shopli);
	}

	//商品详情的tab切换
	var categoryList = document.getElementsByClassName("category-list")[0];
	var category = document.querySelector(".category");
	var skin = document.querySelectorAll(".skin");
	var shoplis = document.querySelectorAll(".category li>a");
	categoryList.onmouseenter = function() {
		category.style.display = "block";
	}
	categoryList.onmouseleave = function() {
		category.style.display = "none";
	}
	category.onmouseenter = function() {
		this.style.display = "block";
	}
	for(var a = 0; a < shoplis.length; a++) {
		shoplis[a].index = a;
		skin[a].index = a;
		shoplis[a].onmouseover = function() {
			hide();
			this.className = "lis";
			skin[this.index].style.display = "block"
		}
		skin[a].onmouseover = function() {
			hide();
			this.style.display = "block";
			shoplis[this.index].className = "lis";
		}

	}
	//商品列表隐藏函数
	function hide() {
		category.style.display = "block";
		for(var b = 0; b < shoplis.length; b++) {
			skin[b].style.display = "none";
			shoplis[b].className = "";
		}
	}

	//点击首页
	var findex = document.querySelector(".nav_ul").firstElementChild
	findex.onclick = function() {
		location.href = "index.html?username";
	}

	//跳转列表页
	$(".category li").click(function() {
		var productId = $(this).attr("product");
		location.href = "list.html?username&productId=" + productId;
	})

})
//客户端下载显示和隐藏
var kehuduan = document.querySelector(".header_ul").lastElementChild;
var downloadWarp = document.getElementsByClassName("downloadWarp")[0];
kehuduan.onmouseover = function() {
	downloadWarp.className = "downloadWarp active";
}
kehuduan.onmouseout = function() {
	downloadWarp.className = "downloadWarp";
}

//购物袋的显示和隐藏
var shoppWarp = document.getElementsByClassName("mini")[0];
var cart = document.getElementsByClassName("cartWarp")[0];
shoppWarp.onmouseover = function() {
	cart.style.display = "block";
	this.className = "mini miniactive";
}
shoppWarp.onmouseout = function() {
	cart.style.display = "none";
	this.className = "mini"
}
//购物袋下的div的显示和隐藏
cart.onmouseover = function() {
	shoppWarp.className = "mini miniactive"
	this.style.display = "block";
}
cart.onmouseout = function() {
	shoppWarp.className = "mini";
	this.style.display = "none";
}
//吸顶菜单
var dropMenu = document.querySelector(".drop-menu_warp");
var ShufflingWarp = document.querySelector(".ShufflingWarp");
var ShufflingWarpTop = dropMenu.offsetTop;
window.onscroll = function(e) {
	var e = e || window.event;
	var top = document.documentElement.scrollTop || document.body.srcollTop;
	if(top >= ShufflingWarpTop) {
		dropMenu.style.display = "block";
		dropMenu.className = "drop-menu_warp drop-menu_fixe";
	} else {
		dropMenu.style.display = "none";
		dropMenu.className = "drop-menu_warp";
	}
}
//头部购物袋
if(localStorage.datas) {
	var yh = JSON.parse(localStorage.datas);
	$(".red").html(yh.length);
}
$(".mini").click(function() {
	location.href = "cart.html?username";
})

//搜索
$(".search_button").click(function(){
	var Val=$(".search_input").attr("value");
//	$(".search_input").attr("value",Val)
	location.href="list.html?username&productId="+Val;
})
