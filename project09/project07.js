window.onload=function(){
	waterfall();
	//json格式数据
	var dataInt={"data":[
	{"src":'01.jpg'},
	{"src":'02.jpg'},
	{"src":'03.jpg'},
	{"src":'04.jpg'},
	{"src":'05.jpg'},
	{"src":'06.jpg'}
						]};
	window.onscroll=function(){
		if (checkScroll) {
			var main=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++){
				var box=document.createElement("div");
				box.className="box";
				main.appendChild(box);
				var pic=document.createElement("div");
				pic.className="pic";
				box.appendChild(pic);
				var img=document.createElement("img");
				img.src="D:/project/project07/img/"+dataInt.data[i].src;
				pic.appendChild(img);

			}
			waterfall();
		}
	};		
};
function waterfall(){
	var box=document.getElementsByClassName("box");
	//计算整个页面显示的列数
	var cols=document.documentElement.clientWidth/box[0].offsetWidth;
	cols=Math.floor(cols);//取整
	console.log("cols"+cols);
	//设置整个大盒子的宽度
	var main=document.getElementById('main');
	main.style.width=cols*box[0].offsetWidth+"px";
	main.style.margin="0 auto";

	var hArray=new Array();
	for(var i=0;i<box.length;i++){
		if(i<cols){
			hArray.push(box[i].offsetHeight);
		}else{
		//找出数组里高度最小的那一个,并且获得最小值的索引
			var minHeight=Math.min.apply(null,hArray);
			var minIndex=getMinHIndex(hArray,minHeight);
			box[i].style.position="absolute";
			box[i].style.top=minHeight+"px";
			box[i].style.left=box[minIndex].offsetLeft+"px";
			hArray[minIndex]+=box[i].offsetHeight;
		}
	}
}
//获得最小值索引
function getMinHIndex(hArr,minH){
	for(var i=0;i<hArr.length;i++){
		if (hArr[i]==minH) {
			return i;
		}
	}
}
//检测是否可以加载完了最后一个数据块
/**
*判断加载了最后一张图片的依据是
*lastBox的(offsetTop+lastBox.style.offsetHeight/2)<scrollTop(页面滚走的高度)+Height(页面可视区高度)
*
*/
function checkScroll(){	
	var mian=document.getElementById('main');
	var boxs=document.getElementsByClassName('box');
	//最后一个盒子到达页面顶部的距离+最后一个盒子的高度的一半
	var lastBoxH=boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1]/2);
	//获取页面滚走的距离，浏览器兼容：混杂模式(body)和标准模式(html根元素)
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	var height=document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}