//右边导航购物袋
if(localStorage.datas){
   var yt=JSON.parse(localStorage.datas);
  $(".cart_bar .num_bar").html(yt.length);
}
$(".cart_bar").click(function(){
	location.href="cart.html?username";
})

//回到顶部
$(".menu_top").click(function(){
	$("body,html").animate({"scrollTop":0},200)
})
