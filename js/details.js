var locationSearch=location.search.substr(18);
console.log(locationSearch)
$.ajax({
	type:"get",
	url:"../json/"+locationSearch+".json",
	dataType:"JSON",
	success:function(res){
		console.log(res);
		var crumbsStr="";
		//内容导航渲染
		$.each(res.nav, function(index,ele) {
			if(index==4){
				crumbsStr+='<span>'+ele.name+'</span>'
			}else{
			crumbsStr+='<span>'
						+'<a>'+ele.name+'</a>'
						+'<i>></i>'
					+'</span>'
			}		
		});
		$(".crumbs_last").html(crumbsStr);
		
		//大图片渲染
		$.each(res.detail.pics, function(index2,ele2) {
			$(".shop_simg").append('<img src="'+ele2+'" />');
		});
		//最大图片渲染
		$.each(res.detail.largePics, function(index3,ele3) {
			$(".shop_bimg").append('<img src="'+ele3+'" />');
		});
		//小图片的渲染
		var smallPics="";
		$.each(res.detail.smallPics, function(index1,ele1) {
//			console.log(ele1);
			if(index1==0){
				smallPics+='<li class="border">'
			    			+'<div class="img_box">'
			    				+'<img src="'+ele1+'"/>'
			    			+'</div>'
			    		+'</li>'
			}else{
			   smallPics+='<li>'
			    			+'<div class="img_box">'
			    				+'<img src="'+ele1+'"/>'
			    			+'</div>'
			    		+'</li>'
			}    		
		});
		$(".details_allimg ul").html(smallPics);
		//小图片鼠标移入事件
		$(".details_allimg li").mouseenter(function(){
			var index=$(this).index();
			$(this).addClass("border").siblings().removeClass("border");
			$(".details_simg img").eq(index).show().siblings().hide();
			$(".shop_bimg img").eq(index).show().siblings().hide();
		})
		//放大镜
		    //鼠标移入移出小盒子 让大盒子和遮罩显示  和隐藏
				$(".details_simg").mouseenter(function(){
					$(".details_bimg,.mask").show();
				}).mouseleave(function(){
					$(".details_bimg,.mask").hide();
				})
			//给小盒子绑定鼠标移动事件
				$(".details_simg").mousemove(function(e){
					var x=e.pageX-$(".details_simg").offset().left-$(".mask").width()/2;
					var y=e.pageY-$(".details_simg").offset().top-$(".mask").height()/2;	
					//限制
					x<0 ? x=0 :x;
					y<0 ? y=0 :y;		
					x>$(".details_simg").width()-$(".mask").width() ? x=$(".details_simg").width()-$(".mask").width() :x;
					y>$(".details_simg").height()-$(".mask").height()? y=$(".details_simg").height()-$(".mask").height():y;	
					$(".mask").css({
						left:x+"px",
						top:y+"px"
					})
					//算出比例
					var bilix=$(".details_bimg img").width()/$(".details_simg").width();
					var biliy=$(".details_bimg img").height()/$(".details_simg").height();
					//
					$(".details_bimg").scrollLeft(bilix*x);
					$(".details_bimg").scrollTop(biliy*y);
			
			})	
		
		//商品标题渲染
		var brandTitle="";
		if(res.detail.brand.nameEN==res.detail.brand.name){
			brandTitle=res.detail.brand.nameEN;
		}else{
			brandTitle=res.detail.brand.nameEN+" "+res.detail.brand.name
		}
		$(".brand_name span").html(brandTitle);
		
		//商品名字渲染
		$(".details_name").html(res.detail.name)
		//商品编号渲染
		$(".shop_code").children().last().html(res.detail.productCode)
		//商品价格渲染
		$(".price").html("￥"+Number(res.data.salesPrice.value).toFixed(2));
		if(res.data.contrastPrice){
			$(".old_price").html("￥"+Number(res.data.contrastPrice.value).toFixed(2))
		}else{
			$(".shop_oldprice").html("");
		}
		//促销信息的渲染
		$.each(res.data.rules, function(index4,ele4) {
			$(".promotion").append('<span>'+ele4.topicTitle+'</span>')
		});
		//容量的渲染
		if(res.detail.styles){
			$.each(res.detail.styles, function(index5,ele5) {
//				console.log(ele5.properties["容量"]);
				$(".capacity_right").append('<li goodsId="'+ele5.goodsId+'">'+ele5.properties["容量"]+'</li>');
			//容量边框的渲染
			if($(".capacity_right li").eq(index5).attr("goodsId")==locationSearch){
				$(".capacity_right li").eq(index5).addClass("newact");
			 }
			});
		}else{
			$(".capacity").remove();
		}
		//限购数量的渲染
		$(".quota").children().last().html(res.data.limitNumber);
		//数量按钮的减
		$(".reduce").click(function(){
			var buyNum=Number($(".buyNum_input input").attr("value"));
		    if(buyNum==1){
				$(".buyNum_input input").attr("value","1");
			}else{
				buyNum--;
				$(".buyNum_input input").attr("value",buyNum);
			}
		})
		//数量按钮的加
		$(".increase").click(function(){
			var buyNum=Number($(".buyNum_input input").attr("value"));
		    if(buyNum>=res.data.limitNumber){
				$(".buyNum_input input").attr("value",res.data.limitNumber);
			}else{
				buyNum++;
				$(".buyNum_input input").attr("value",buyNum);
			}
		})
		//商品购买数量改变事件
		$(".buyNum_input").change(function(){
			var changNum=Number($(".buyNum_input input").attr("value"));
		})
		//提货渲染
		var takeGoodsStr='';
		$.each(res.data.delivery.declares, function(index6,ele6) {
			takeGoodsStr+='<li>'
			        		+'<strong>'+ele6.name+'</strong>'
			        		+'<span>'+ele6.content+'</span>'
			        		+'<i></i>'
			        	+'</li>'
		});
		$(".take_goods_ul").html(takeGoodsStr);
		//商品详情导航的渲染
		$.each(res.detail.faqs.reverse(), function(index,ele) {
			$(".detail_content_nav").append("<li>"+ele.title+"</li>");
		});
		//商品详情的渲染
		var table='';
		$.each(res.detail.properties, function(index,ele) {
			if(index%2==0){
			  table+='<tr><th>'+ele.title+'</th><td>'+ele.val+'</td>'
            }
			else{
              table+='<th>'+ele.title+'</th><td>'+ele.val+'</td></tr>'
             }
        });
        $(".detail_table").children().first().append(table);
		//售后服务的渲染
		for(var j=0;j<res.detail.faqs[0].sections.length;j++){
			var merchantDiv=document.createElement("div");
			merchantDiv.innerHTML='<p class="merchant_p">'+res.detail.faqs[0].sections[j].name+'</p>'
			                      +res.detail.faqs[0].sections[j].content
			document.querySelector(".merchant_s").appendChild(merchantDiv);	
		}
		//常见问题的渲染	
//		for(var i=0;i<res.detail.faqs[1].sections.length;i++){
//			
//		}
        var merchantQD='';
        $.each(res.detail.faqs[1].sections, function(index,ele) {
//      	console.log(ele);
            merchantQD='<div class="ques">'+ele.name+'</div>'
                       +'<div class="ques_content">'+ele.content+'</div>'

            $(".merchant_q").append("<div>"+merchantQD+"</div>")
        });
		
		//商品详情tab切换
		$(".detail_content_nav li").mouseenter(function(){
			var newindex=$(this).index();
			$(this).addClass("new_nav").siblings().removeClass("new_nav");
			$(".merchant_info").eq(newindex).show().siblings().hide()
		})
		//商品推荐的渲染
		if(res.recommend.recommendations.length==0){
			$(".shop_recommend").html("暂无商品");
		}else{
			var shopRe='';
			$.each(res.recommend.recommendations, function(index,ele) {
				var name='';
				if(ele.brandEN==ele.brand){
					 name=ele.brandEN;
				}else{
					name=ele.brandEN+' '+ele.brand;
				}
				shopRe+='<li goodsId="'+ele.goodsId+'">'
				        +'<div class="shop_recommend_img">'
							+'<a>'
								+'<img src="'+ele.pic+'"/>'
	    					+'</a>'
	    				+'</div>'
	    				+'<a class="link">'
	    					+'<p>'+name+'</p>'
	    					+'<p>'+ele.name+'</p>'
	    				+'</a>'
	    				+'<p class="shop_recommend_price">'
	    					+'<span>￥'+Number(ele.salesPrice.value).toFixed(2)+'</span>'
	    				+'</p>'
	    				+'</li>'
	    });
		$(".shop_recommend").append(shopRe);
		}
		//同类热销的渲染
		var samekinds='';
		$.each(res.recommend.samekinds, function(index,ele) {
			var newspan='';
			if(ele.contrastPrice){
				newspan='<span>￥'+Number(ele.contrastPrice.value).toFixed(2)+'</span>'
			}else{
				newspan='';
			}
			var name='';
				if(ele.brandEN==ele.brand){
					 name=ele.brandEN;
				}else{
					name=ele.brandEN+' '+ele.brand;
				}
			samekinds+='<li goodsId="'+ele.goodsId+'">'
			           +'<div class="shop_recommend_img">'
						+'<a>'
							+'<img src="'+ele.pic+'"/>'
    					+'</a>'
    				+'</div>'
    				+'<a class="link">'
    					+'<p>'+name+'</p>'
    					+'<p>'+ele.name+'</p>'
    				+'</a>'
    				+'<p class="shop_recommend_price">'
    					+'<span>￥'+Number(ele.salesPrice.value).toFixed(2)+'</span>'
    				+'<p class="shop_contrastPrice_price">'+newspan+'</p>'
    				+'</p>'
    				+'</li>'
    	});
		$(".same").append(samekinds);
		//相关产品的渲染
		var relateds='';
		$.each(res.recommend.relateds, function(index,ele) {
			var newrelateds='';
			if(ele.contrastPrice){
				newrelateds='<span>￥'+Number(ele.contrastPrice.value).toFixed(2)+'</span>'
			}else{
				newrelateds='';
			}
			var name='';
				if(ele.brandEN==ele.brand){
					 name=ele.brandEN;
				}else{
					name=ele.brandEN+' '+ele.brand;
				}
			relateds+='<li goodsId="'+ele.goodsId+'">'
			          +'<div class="shop_recommend_img">'
						+'<a>'
							+'<img src="'+ele.pic+'"/>'
    					+'</a>'
    				+'</div>'
    				+'<a class="link">'
    					+'<p>'+name+'</p>'
    					+'<p>'+ele.name+'</p>'
    				+'</a>'
    				+'<p class="shop_recommend_price">'
    					+'<span>￥'+Number(ele.salesPrice.value).toFixed(2)+'</span>'
    				+'<p class="shop_contrastPrice_price">'+newrelateds+'</p>'
    				+'</p>'
    				+'</li>'
    	})
		$(".relateds").append(relateds);
		//推荐切换
		$(".detail_recommend li").mouseenter(function(){
			var index=$(this).index();
			$(this).addClass("detail_recommend_bg").siblings().removeClass("detail_recommend_bg");
			$(".shop_recommend_warp").eq(index).show().siblings().hide();
		})
		//最近浏览渲染
		var items='';
		$.each(res.items, function(index,ele) {
			var itPrice='';
			if(ele.contrastPrice){
				newrelateds='<span>￥'+Number(ele.contrastPrice.value).toFixed(2)+'</span>'
			}else{
				newrelateds='';
			}
			var name='';
			if(ele.brandEN==ele.brand){
				 name=ele.brandEN;
			}else{
				name=ele.brandEN+' '+ele.brand;
			}
			items+='<li goodsId="'+ele.goodsId+'">'
						+'<a class="browse_content_img">'
							+'<img src="'+ele.pic+'" />'
						+'</a>'
						+'<a class="browse_content_text">'
							+'<p>'+name+'</p>'
							+'<p style="margin: 0;">'+ele.name+'</p>'
						+'</a>'
						+'<div class="browse_content_price">'
							+'<span class="browse_noe_price">￥'+Number(ele.salesPrice.value).toFixed(2)+'</span>'
							+'<span class="browse_old_price">'+newrelateds+'</span>'
						+'</div>'
			    	+'</li>'
		});
		$(".browse_content_ul").append(items);
		//猜你喜欢渲染
		if(res.recommend.maylikes.length==0){
			$(".you_like").html("暂无商品");
		}
		
		//浏览喜欢切换
		$(".browse_nav>div").mouseenter(function(){
			var index=$(this).index();
			$(this).addClass("newdiv").siblings().removeClass("newdiv");
			$(".browse_content>ul").eq(index).show().siblings().hide();
		})
		//点击左移动
		var leftNum=0;
		$(".browse_button_left").click(function(){
			var browseLeft=parseInt($(".browse_content_ul").css("margin-left"));
            console.log(browseLeft);
			if(!(browseLeft==0)){
				leftNum++;
			    $(".browse_content ul").animate({marginLeft:(240*leftNum)},200)
			}
		})
		//点击右移动
		$(".browse_button_right").click(function(){
			var rightLe=$(".browse_content_ul li").length
            var browseLeft=parseInt($(".browse_content_ul").css("margin-left"));
            console.log(browseLeft);
			if(!(browseLeft<=(rightLe-4)*240)&&length>4){
				leftNum--;
			    $(".browse_content ul").animate({marginLeft:(240*leftNum)-35},200)
			}
		})
		
		//获取id跳转
		$(".capacity_right li").click(function(){
			location.href="details.html?username&goodsId="+$(this).attr("goodsId");
		})
		
		//点击关闭购物袋和继续购物按钮
		$(".flase,.keep").click(function(){
			$(".shadeWarp").hide();
		})
		
		//点击前往购物袋
		$(".go").click(function(){
			location.href="cart.html?username";
		})
		
		//商品详情展示
		var detail=res.detail.details;
		$(".shop_content").html(detail);
		
		//加入显示购物袋
		$(".buy button").click(function(){
			//优惠
			if(res.data.rules){
				var discountAmount=60;
			}
			$(".shadeWarp").show();
			//获取cookie里的东西
			var arr=localStorage.datas;
			if(arr==undefined){
				//第一次添加
				localStorage.datas="[]";
			}
			var cookielist=JSON.parse(localStorage.datas);
			//把商品信息 抽离出来 添加到 cookielist数组中 并设置回cookie
			var goodsObj={
				"goodsId":locationSearch,
				"contrastPrice":res.data.contrastPrice,
				"limitNumber":res.data.limitNumber,
				"name":res.detail.name,
				"brandName": res.detail.brand.name,
                "brandNameEN": res.detail.brand.nameEN,
                "specifications": "1 PCS/PCS",
                "price":res.data.salesPrice,
                "discountAmount":discountAmount,
                "pic":res.detail.smallPics[0],
                "title":res.data.rules[0].topicTitle,
                "pocunt":Number($(".buyNum_input input").val())
			}
			//判断是否添加过此商品
			if(Check(locationSearch)){
				//更新数量
				updateNum(locationSearch,Number($(".buyNum_input input").val()));
			}else{//第一次添加
				cookielist.push(goodsObj);
				localStorage.datas=JSON.stringify(cookielist);
			}
			
			console.log(JSON.parse(localStorage.datas));
			
			//显示有多少的商品在购物车
			var contNum=JSON.parse(localStorage.datas)
			$(".cont_num,.num_bar").html(contNum.length);
			
			//详情页总金额的显示
			$(".totalMoney").html("￥"+total());
		})
		
		
		
		
	}
});
//检测商品是否存在函数
function Check(goodsId){
	var newarr=JSON.parse(localStorage.datas);
	for(var a=0;a<newarr.length;a++){
		if(goodsId==newarr[a].goodsId){
			return true;
		}
	}
	return false;
}
//更新数量函数
function updateNum(goodsId,num){
	var newarr=JSON.parse(localStorage.datas);//cookie数组
	for(var i=0;i<newarr.length;i++){
		if(goodsId==newarr[i].goodsId){
			newarr[i].pocunt+=num;//改变当前商品的数量
		}		
	}
	//把数量改变后的数组从新设置回cookie
	localStorage.datas=JSON.stringify(newarr);
}
//总价函数
function total(){
	var total=0;
	var newarr=JSON.parse(localStorage.datas);
	for(var i=0;i<newarr.length;i++){
		var money=Number(newarr[i].price.value).toFixed(2)*newarr[i].pocunt
		total+=money;
	}
	return total.toFixed(2);
}

