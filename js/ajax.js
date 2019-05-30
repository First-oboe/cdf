//   ajax(type,url,data,async,function(res){
	    //type----传送的数据类型    post  或  get
		//url ----传送的路径
		//data----传送的数据，也就是需要拼接的数据username什么的
		//async---同步或者异步      true   false
		
		//res-----返回的数据
//   })
         

           function ajax(type,url,data,async,fn){
           	   //1.创建对象
           	   var xhr=null;
           	   try{
           	   	  xhr=new XMLHttpRequest();
           	   }catch(e){
           	   	  xhr=new ActiveXObject("Microsoft.XMLHTTP");
           	   }
           	
           	   //2.调用open的方法
           	   if(type=="get"&data){
           	   	  url+="?"+data;
           	   }
           	   xhr.open(type,url,async);
           	
           	   //3.调用send的方法
           	   if(type=="post"){
           	   	  //设置发送的请求头
           	   	  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
           	   	  xhr.send(data);
           	   	}else{
           	   		xhr.send();
           	   	}
           	   //4.返回数据
           	   
           	   xhr.onreadystatechange=function(){
           	   	
           	   	if(xhr.readyState==4&&xhr.status==200){
           	   	//xhr.responseText返回的数据       传到回调函数中	
           	   		fn(xhr.responseText);
           	   	}
           	   	
           	   }
           	   
           	   
           	   
           }
