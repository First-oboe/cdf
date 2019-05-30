var local=location.search.substr(20);
//console.log(decodeURIComponent(local));
$.ajax({
	type:"get",
	url:'../json/product_'+local+'.json',
	dataType:"json",
	success:function(res){
		console.log(res);
		//条件渲染
		$.each(res.brands, function(index,ele){
			var str='';
			if(ele.name==ele.nameEN){
				str+=ele.name;
			}else{
				str+=ele.name+' '+ele.nameEN;
			}
			$(".one_all").append('<a class="cont">'+str+'</a>')
		});
		
		$.each(res.categories, function(index,ele) {
			$(".two_all").append('<a class="cont">'+ele.name+'</a>')
		});
		
		$.each(res.priceRanges, function(index,ele) {
			$(".three_all").append('<a class="cont">'+ele.minPrice+'-'+ele.maxPrice+'元'+'</a>')
		});
		
		//商品渲染
	    xuanR(res.data.items);
		//点击
		$(".product_item").click(function(){
			var goodsId=$(this).attr("goodsId");
			location.href="details.html?goodsId="+goodsId;
		})
		
		//销量排序
		var flag=true;
	    $(".newsort").click(function(){
	    	if(flag){
	    		$(this).children().last().css("background","url(../img/下载42.png)50% no-repeat");
	    		flag=false;
	    		$(".all_list").html(" ");
	    		xuanR(hot());
	    	}else{
	    		$(this).children().last().css("background","url(../img/下载41.png)50% no-repeat");
	    		flag=true;
	    		$(".all_list").html(" ");
	    		xuanR(hot().reverse());
	    	}
	    	
	    })
	    //价格排序
	    $(".three_all .cont").click(function(){
	    	var NumArr=[];
	    	if($(this).html()=="全部"){
	    		$(".all_list").html(" ");
	    		xuanR(res.data.items);
	    	}else{
	    		var serNumArr=$(this).html().split("-");
	    		var x=Number(serNumArr[0]);
	    		var y=parseInt(serNumArr[1]);
	    		for(var i=0;i<res.data.items.length;i++){
//	    			console.log(Number(res.data.items[i].salesPrice.value))
                    var z=Number(res.data.items[i].salesPrice.value);
	    			if(z>=x&&z<=y){
	    				NumArr.push(res.data.items[i]);
	    			}
	    		}
//	    	console.log(NumArr);
            $(".all_list").html(" ");
	        xuanR(NumArr);
	    	}

	    })
	    
	    //展开可见
	    var hidFlag=true;
	    $(".more").click(function(){
	    	if(hidFlag){
	    		$(this).find(".more_i").css("background","url(../img/下载44.png)50% no-repeat");
	    		$(this).find(".zhan").html("收起");
	    		$(this).next().removeClass("hid");
	    		hidFlag=false;
	    	}else{
	    		$(this).find(".more_i").css("background","url(../img/下载40.png)50% no-repeat");
	    		$(this).find(".zhan").html("展开");
	    		$(this).next().addClass("hid");
	    		hidFlag=true;
	    	}
	    })
	    
	//冒泡排序    
	function hot(){
		var arr=res.data.items;
	   for(var i=0;i<arr.length-1;i++){
	   	   for(var j=0;j<arr.length-1-i;j++){
	   	   	  if(Number(arr[j].salesCount)>Number(arr[j+1].salesCount)){
	   	   	  	  var temp=arr[j];
	   	   	  	  arr[j]=arr[j+1];
	   	   	  	  arr[j+1]=temp;
	   	   	  }
	   	   }
	   }
	   return arr;
    }   
	    
   }
});

//商品渲染函数
function xuanR(narr){

$.each(narr, function(index,ele) {
	var rstr='';
	if(ele.brandEN==ele.brand){
		rstr+=ele.brand;
	}else{
		rstr+=ele.brandEN+' '+ele.brand;
	}
	var pice='';
	if(ele.contrastPrice){
		pice='<span>市场价￥</span><span class="nprice">'+Number(ele.contrastPrice.value).toFixed(2)+'</span>';
	}
	var newstr='<div class="product_item" goodsId="'+ele.goodsId+'">'
		    		+'<div class="item_img">'
		    			+'<img src="'+ele.pic+'"/>'
		    		+'</div>'
		    		+'<a class="item_text">'
		    			+'<p class="item_title">'+rstr+'</p>'
		    			+'<p class="item_span">'+ele.name+'</p>'
		    		+'</a>'
		    		+'<p class="newprice"><span>免税价￥</span><span class="price">'+Number(ele.salesPrice.value).toFixed(2)+'</span></p>'
		    		+'<p class="oldprice">'+pice+'</p>'
		    	+'</div>'
	
	$(".all_list").append(newstr);
	
});
}	