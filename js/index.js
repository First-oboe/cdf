ajax("get","../json/header.json","",true,function(res){
		var indexObj=JSON.parse(res);
		console.log(indexObj);
		
		//动态生成轮播图片
		var Shuff=document.querySelector(".Shuff");
		for(var i=0;i<indexObj.carousels.length;i++){
			var ShuffA=document.createElement("a");
			if(i==0){
				ShuffA.className="opa";
			}else{
				ShuffA.className="";
			}
			ShuffA.style.background='url('+indexObj.carousels[i].pic+')no-repeat';
			Shuff.appendChild(ShuffA);
		}
		
		//图片自动轮播
		var timer=null;
		var num=0;
		var Shuff=document.querySelectorAll(".Shuff a");
		var ShuffCircle=document.querySelectorAll(".Shuff_nav li");
	    //自动轮播
	    timer=setInterval(ShuffShow,2000);
		function ShuffShow(){
			if(num>=Shuff.length-1){
				num=0;
			}else{
				num++;
			}
			for(var k=0;k<Shuff.length;k++){
				Shuff[k].className="";
			}
			Shuff[num].className="opa";
			CircleColor();
		}
		//鼠标移入清空倒计时
		var Suffing=document.querySelector(".Shuffling");
		Suffing.onmouseenter=function(){
			clearInterval(timer);
		}
		//鼠标移出开启倒计时
		Suffing.onmouseleave=function(){
			timer=setInterval(ShuffShow,2000);
		}
		//右按钮的点击
		var ShuffRight=document.querySelector(".Shuff_right");
		ShuffRight.onclick=function(){
			ShuffShow();
		}
		//左按钮的点击
		var ShuffLeft=document.querySelector(".Shuff_left");
		ShuffLeft.onclick=function(){
			if(num<=0){
				num=Shuff.length-1
			}else{
				num--;
			}
			for(var k=0;k<Shuff.length;k++){
				Shuff[k].className="";
			}
			Shuff[num].className="opa";
			CircleColor();
		}
		//轮播小圆点部分
		for(var m=0;m<ShuffCircle.length;m++){
			ShuffCircle[m].index=m;
			ShuffCircle[m].onmouseenter=function(){
				num=this.index;
				for(var n=0;n<ShuffCircle.length;n++){
					Shuff[n].className="";
				}
			Shuff[this.index].className="opa";
			CircleColor();
			}
		}
		//圆点背景色
		function CircleColor(){
			for(var n=0;n<ShuffCircle.length;n++){
					ShuffCircle[n].className="";
				}	
			ShuffCircle[num].className="circle";	
		}
		
		//广告部分的渲染
		var Advertising=document.querySelector(".Advertising");
		for(var a=0;a<indexObj.threeBillboard.length;a++){
			var CmCarousel=document.createElement("div")
			CmCarousel.className="cm-carousel";
			if(a==0){
				CmCarousel.style.margin="0";
			}
			for(var b=0;b<indexObj.threeBillboard[a].length;b++){
				var Cmdiv=document.createElement("div");
				Cmdiv.innerHTML='<a>'
								  +'<img src="'+indexObj.threeBillboard[a][b].pic+'"/>'
								+'</a>'	
				CmCarousel.appendChild(Cmdiv);			
				}
			var CmUl=document.createElement("ul");
			CmUl.innerHTML='<li class="cm_circle"></li><li></li><li></li>';
			CmCarousel.appendChild(CmUl);
			
			Advertising.appendChild(CmCarousel);
		}
		
		//广告轮播
		function  cmCarousel(child,time){
		
			var num2=0;
			var time2=null;
			var length=$('.cm-carousel:'+child+' div').length;
	        time2=setInterval(cmShow,time);
	        function cmShow(){
	        	if(num2==length-1){
	        		num2=0;
	        	}else{
	        	    num2++;
	        	}
	        	for(var x=0;x<length;x++){
	        		$('.cm-carousel:'+child+' ul li').eq(num2).addClass("cm_circle").siblings().removeClass("cm_circle");
	        		$('.cm-carousel:'+child+' div').eq(num2).addClass("active").siblings().removeClass("active");
	        	}
	        }
	        $('.cm-carousel:'+child+' div').mouseenter(function(){
	        	clearInterval(time2);
	        })
	        $('.cm-carousel:'+child+' div').mouseleave(function(){
	        	time2=setInterval(cmShow,time);
	        })
			//广告小圆点轮播
			$('.cm-carousel:'+child+' ul li').mouseenter(function(){
				clearInterval(time2);
				var num2=$(this).index();
				$(this).addClass("cm_circle").siblings().removeClass("cm_circle");
				$('.cm-carousel:'+child+' div').eq(num2).addClass("active").siblings().removeClass("active");
			})
		
		}
		cmCarousel("first",1500);
		cmCarousel("eq(1)",3000);
		cmCarousel("last",4500);
		
		
		//购物流程的渲染
		var ShoppingProcessUl=document.querySelector(".ShoppingProcess ul");
		for(var c=0;c<indexObj.shoppingSteps.length;c++){
			var ShoppingProcessLi=document.createElement("li");
			var shldo=document.createElement("div");
			shldo.className="active";
			
			shldo.innerHTML='<img src="'+indexObj.shoppingSteps[c].stepNormal+'"/>';
			ShoppingProcessLi.appendChild(shldo);
			
			var shldt=document.createElement("div");
			shldt.innerHTML='<img src="'+indexObj.shoppingSteps[c].stepAction+'"/>';
			ShoppingProcessLi.appendChild(shldt);
			ShoppingProcessUl.appendChild(ShoppingProcessLi);
		}
		//购物流程的显示和隐藏
		$(".ShoppingProcess ul li").mouseenter(function(){
			$(this).children().first().removeClass("active").siblings().addClass("active");
		})
		
		$(".ShoppingProcess ul li").mouseleave(function(){
			$(this).children().first().addClass("active").siblings().removeClass("active");
		})
		
		
		//推荐列表的渲染
		var recommend_nav=document.querySelector(".recommend_nav");
		var recommend_list=document.querySelector(".recommend_list");
		for(var d=0;d<indexObj.recommendProducts.length;d++){
			var recommend_li=document.createElement("li");
			var recommend_div=document.createElement("div");
			if(d==0){
				recommend_li.className="nav_active";
				recommend_div.style.display="block"
			}
			recommend_li.innerHTML=indexObj.recommendProducts[d].tabName;
			
			var recommend_ul=document.createElement("ul");
			recommend_ul.className="recommend_ul";
			
			for(var e=0;e<indexObj.recommendProducts[d].products.length;e++){
				var lis=document.createElement("li");
				lis.setAttribute("goodsId",indexObj.recommendProducts[d].products[e].goodsId)
				var recomVal=indexObj.recommendProducts[d].products[e].salesPrice.value;
				var numRecomVal=Number(recomVal).toFixed(2);
				if(indexObj.recommendProducts[d].products[e].contrastPrice){
					var coVal=indexObj.recommendProducts[d].products[e].contrastPrice.value;
					var numVal="￥"+Number(coVal).toFixed(2);
				}else{
					numVal='';
				}
				lis.innerHTML='<div class="recommend_img">'
				       				+'<img src="'+indexObj.recommendProducts[d].products[e].pic+'"/>'
				       			+'</div>'
				       			+'<div class="recommend_text">'
				       				+'<p>'+indexObj.recommendProducts[d].products[e].brandEN+'&nbsp;'+indexObj.recommendProducts[d].products[e].brand+'</p>'
				       				+'<p>'+indexObj.recommendProducts[d].products[e].name+'</p>'
				       			+'</div>'
				       			+'<div class="recommend_price">'
				       				+'<span>￥'+numRecomVal+'</span>'
				       				+'<span class="coval">'+numVal+'</span>'
				       			+'</div>'
				recommend_ul.appendChild(lis);
			}
			recommend_div.appendChild(recommend_ul);
			recommend_nav.appendChild(recommend_li);
			recommend_list.appendChild(recommend_div);
		}
		//推荐列表的tab切换
		$(".recommend_nav li").mouseenter(function(){
			var navIndex=$(this).index();
			$(this).addClass("nav_active").siblings().removeClass("nav_active");
			$(".recommend_list>div").eq(navIndex).show().siblings().hide()
		})
		
		//品牌推荐的渲染
		var brandRecommendNav=document.querySelector(".brand_recommend_nav");
		var brandRecommendList=document.querySelector(".brand_recommend_list");
		for(var f=0;f<indexObj.recommendBrands.tabs.length;f++){
			var brandLi=document.createElement("li");
			var brandDiv=document.createElement("div");
			brandDiv.className="brand_recommend_shop";
			if(f==0){
				brandLi.className="brand_recommend_active";
			}
			brandLi.innerHTML=indexObj.recommendBrands.tabs[f].name;
			
			for(var g=0;g<indexObj.recommendBrands.tabs[f].brands.length;g++){
				brandDiv.innerHTML+='<div class="card_logo">'
			        					+'<div class="card_logo_box">'
			        						+'<img src="'+indexObj.recommendBrands.tabs[f].brands[g].pic+'" />'
			        					+'</div>'
			        					+'<div class="card_logo_span">'
			        						+'<span>'+indexObj.recommendBrands.tabs[f].brands[g].name+'</span>'
			        					+'</div>'
			        				+'</div>'
			}
			brandRecommendList.appendChild(brandDiv)
			brandRecommendNav.appendChild(brandLi);
		}
		//品牌推荐移入
		var flags=true;
		$(".card_logo").mouseenter(function(){
			
				$(".card_logo_box").eq($(".card_logo").index($(this))).stop(true,true).animate({height:0},200,function(){
					
				})
			
        })
		//品牌推荐移出
        $(".card_logo").mouseleave(function(){
        	$(".card_logo_box").eq($(".card_logo").index($(this))).stop(true,true).animate({height:80},200,function(){})
        })
        //品牌推荐tab切换
        $(".brand_recommend_nav li").mouseenter(function(){
        	var index=$(this).index();
        	$(this).addClass("brand_recommend_active").siblings().removeClass("brand_recommend_active");
        	$(".brand_recommend_shop").eq(index).show().siblings().hide();
        })
        
        
        //品牌推荐图片渲染
        var brandRecommendImg=document.querySelector(".brand_recommend_img_warp");
        var brandRecommendUl=document.querySelector(".brand_recommend_img");
        for(var h=0;h<indexObj.recommendBrands.carousels.length;h++){
        	var brandImgA=document.createElement("a");
        	if(h==0){
        		brandImgA.style.display="block";
        	}else{
        		brandImgA.style.display="none";
        	}
        	brandImgA.innerHTML='<img src="'+indexObj.recommendBrands.carousels[h].pic+'" />'
        	brandRecommendImg.appendChild(brandImgA)
        }
        var brandImgUl=document.createElement("ul");
        brandImgUl.innerHTML='<li class="brand_cir"></li><li></li><li></li>';
        brandRecommendUl.appendChild(brandImgUl);
        
        //品牌推荐图片渲染轮播
        var time3=null;
        var num3=0;
        time3=setInterval(brandPlay,1500);
        var brandLength=$(".brand_recommend_img a").length
        function brandPlay(){
        	if(num3==brandLength-1){
        		num3=0;
        	}else{
        		num3++;
        	}
        	for(var bl=0;bl<brandLength;bl++){
        		$(".brand_recommend_img a").eq(num3).show().siblings().hide();
        		$(".brand_recommend_img li").eq(num3).addClass("brand_cir").siblings().removeClass("brand_cir");
        	}
        }
        $(".brand_recommend_img").mouseenter(function(){
        	clearInterval(time3);
        })
        $(".brand_recommend_img").mouseleave(function(){
        	time3=setInterval(brandPlay,1500);
        })
        //品牌推荐图片圆点轮播
        $(".brand_recommend_img li").mouseenter(function(){
        	num3=$(this).index();
        	$(this).addClass("brand_cir").siblings().removeClass("brand_cir");
        	$(".brand_recommend_img a").eq(num3).show().siblings().hide();
        })
        
        
        
        //美妆广告部分渲染
        for(var i=0;i<indexObj.floors.length;i++){
			var makeup=document.createElement("div");
			makeup.className="Beauty_makeup";
			var brandTop=document.createElement("div");
			brandTop.className="brand_recommend_top";
			brandTop.innerHTML='<h2>'+indexObj.floors[i].title+'</h2>'
				                
			var brandBeauty=document.createElement("div");
			brandBeauty.className="brand_beauty";
			brandTop.appendChild(brandBeauty);
			                 
			for(var j=0;j<indexObj.floors[i].hotRecommend.length;j++){
			     var brandBeautyClassify=document.createElement("a");
			     brandBeautyClassify.className="brand_beauty_classify";
			     brandBeautyClassify.innerHTML=indexObj.floors[i].hotRecommend[j].name;
			    brandBeauty.appendChild(brandBeautyClassify);
			}
			var brandBeautyCom=document.createElement("p");	
			brandBeautyCom.className="brand_beauty_com";
			brandBeautyCom.innerHTML='<span>|</span>'
						+'<a class="brand_beauty_more">'
							+'<span>更多</span>'
							+'<i></i>'
						+'</a>'
			
			brandBeauty.appendChild(brandBeautyCom);
			makeup.appendChild(brandTop)
			
			var footer_content=document.createElement("div");
			footer_content.className="footer_content";
			var footerContentLeft=document.createElement("div");
			footerContentLeft.className="footer_content_left";
			
			var footerClassify=document.createElement("div");
			footerClassify.className="footer_classify";
			footerClassify.innerHTML='<p>分类</p>';
			var footerClassifyText=document.createElement("div");
			footerClassifyText.className="footer_classify_text";
			
			for(var k=0;k<indexObj.floors[i].categories.length;k++){
				var classifyA=document.createElement("a");
				classifyA.innerHTML=indexObj.floors[i].categories[k].name;
				footerClassifyText.appendChild(classifyA);
			}
			footerClassify.appendChild(footerClassifyText)
			footerContentLeft.appendChild(footerClassify);
			
			
			var footerBrand=document.createElement("div");
			footerBrand.className="footer_brand";
			var footerBrandH2=document.createElement("h2");
			footerBrandH2.innerHTML="推荐品牌";
			footerBrand.appendChild(footerBrandH2);
			
			var footerBrandList=document.createElement("div");
			footerBrandList.className="footer_brand_list";
			footerBrand.appendChild(footerBrandList);
			for(var a=0;a<indexObj.floors[i].brands.length;a++){
				var cdfBrand=document.createElement("div");
				cdfBrand.className="cdf_brand";
				cdfBrand.innerHTML='<div class="cdf_brand_top">'
									+'<img src="'+indexObj.floors[i].brands[a].pic+'" />'
								+'</div>'
								+'<div class="cdf_brand_bottom">'+indexObj.floors[i].brands[a].name+'</div>'
				footerBrandList.appendChild(cdfBrand);
			}
			footerContentLeft.appendChild(footerBrand);
			footer_content.appendChild(footerContentLeft);
			
			var footerContentMidlle=document.createElement("a");
			footerContentMidlle.className="footer_content_midlle";
			footerContentMidlle.innerHTML='<img src="'+indexObj.floors[i].billboard.pic+'" />'
			footer_content.appendChild(footerContentMidlle);
			
			var footerContentRight=document.createElement("div");
			footerContentRight.className="footer_content_right";
			var footerProduct=document.createElement("ul");
			footerProduct.className="footer_product";
			
			for(var p=0;p<indexObj.floors[i].products.length;p++){
				var productLi=document.createElement("li");
//				console.log(indexObj.floors[i].products[p].contrastPrice)
				if(indexObj.floors[i].products[p].contrastPrice){
					var ogjnum=indexObj.floors[i].products[p].contrastPrice.value;
					var newnum="￥"+Number(ogjnum).toFixed(2);
				}else{
					newnum='';
				}
				productLi.innerHTML='<div>'
								+'<p class="footer_product_title">'+indexObj.floors[i].products[p].brandEN+indexObj.floors[i].products[p].brand+'</p>'
								+'<p class="footer_product_introduce ">'+indexObj.floors[i].products[p].name+'</p>'
								+'<p class="footer_product_price">'
									+'<span class="sales_price">￥'+Number(indexObj.floors[i].products[p].salesPrice.value).toFixed(2)+'</span>'
									+'<span class="contrast_price">'+newnum+'</span>'
								+'</p>'
								+'<div class="footer_product_img">'
									+'<img src="'+indexObj.floors[i].products[p].pic+'" />'
								+'</div>'
							+'</div>'
				footerProduct.appendChild(productLi);			
			}
			footerContentRight.appendChild(footerProduct);
			
			footer_content.appendChild(footerContentRight);
			makeup.appendChild(footer_content)
			var box=document.querySelector(".classification");
			box.appendChild(makeup);
		}
        
     //左边的导航栏
    var classificationTop=$(".classification").offset().top;
    var BeautyMakeupLenght=$(".Beauty_makeup").length;
    var em=document.querySelectorAll(".left_nav em");
    console.log(classificationTop);
    var navindex=0;//公用下标；
    $(document).scroll(function(){
    	if($(document).scrollTop()>=classificationTop){
    		$(".left_nav").css("position","fixed");
    	}else{
    		$(".left_nav").css("position","absolute");
    	} 
    	for(var y=0;y<BeautyMakeupLenght;y++){
    		var BeautyMakeupTop=$(".Beauty_makeup").eq(y).offset().top-50;
    	    if($(document).scrollTop()>=BeautyMakeupTop){
    	    	navindex=y;
    	    	$(".left_nav li").eq(navindex).css("color","#b81c22").siblings().css("color","#000");
  	    	     for(var sh=0;sh<em.length;sh++){
  	    	     	em[sh].style.width=0;
  	    	     	em[sh].style.transition="0.2s";
  	    	     }
  	    	     em[navindex].style.width="55px";
    	    }
    	}    
    })
     //点击切换楼层
	    var navFlag=true;
	    $(".left_nav li").click(function(){
	    	navFlag=true;
	    	var index=$(this).index();
	    	var BeautyMakeupTop=$(".Beauty_makeup").eq(index).offset().top-50;
            if(navFlag){
            	$("bod,html").animate({scrollTop:BeautyMakeupTop},200,function(){
            		navFlag=false;
            	})
            }
	    	
	    })
    
    //内容区产品图片的运动
    $(".footer_product_img").mouseenter(function(){
    	$(this).animate({right:'+10px'},200)
    })
    $(".footer_product_img").mouseleave(function(){
    	$(this).animate({right:'0px'},200)
    })
    
    //内容区品牌运动
    $(".cdf_brand").mouseenter(function(){
    	$(this).stop(true,true).find("div:eq(0)").animate({"height":"0px"},100)
    })
    $(".cdf_brand").mouseleave(function(){
    	$(this).stop(true,true).find("div:eq(0)").animate({height:"60px"},100)
    })
    
    //点击跳转详情页
    $(".recommend_ul li").click(function(){
    	location.href="details.html?username&goodsId="+$(this).attr("goodsId");
    })
        
   
     
       
        
})  

	
	
  
