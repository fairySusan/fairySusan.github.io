//window.onload=function(){
var element;//输入的值
var bigBox;
var highArray=new Array();//存储高度值的数组
var n=0;//设置输入的次数
/*右边插入*/
function rightIn(){
	element=document.getElementById('queue').value;
	if(element<10||element>100){
		alert("请输入10~100之间的数值");
		}else if (10<=element&&element<=100) {
			if(element===''){
			alert('请输入数字');
			document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
			}else if(n<10){//只能输入10次
				var numBox=document.createElement('div');
				numBox.className='num-box';
				bigBox=document.getElementById('big-box');
				bigBox.appendChild(numBox);
				numBox.style.height=element+'px';
				highArray.push(parseInt(element));//在末尾添加新的元素，也就是从右边添加
				console.log(highArray);

				numBox.onclick=function(){ //给插入的元素添加点击他就删除自己的事件
  				bigBox.removeChild(this);
  				n-=1;
  			};
			n+=1;
			console.log(n);
		}else{
			alert('队列元素已达到上限，不能再输入了^~^');
		}
	}	
  	document.getElementById('queue').value='';//点击按钮之后输入框的值清空
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}

function leftOut(){
	bigBox=document.getElementById('big-box');
	bigBox.removeChild(bigBox.childNodes[0]);
	n-=1;
	console.log(n);
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}
/*左边插入*/
function leftIn(){
	element = document.getElementById('queue').value;
	if(element===''){
		alert('请输入数字');
		document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
	}else if(n<10){//只能输入10次

		var numBox = document.createElement('div');
		numBox.className = 'num-box';
		bigBox = document.getElementById('big-box');
		bigBox.appendChild(numBox);

		var childNode = bigBox.getElementsByTagName('div');
	  	bigBox.insertBefore(numBox,childNode[0]);

	  	numBox.style.height =element+'px';
	  	highArray.unshift(parseInt(element));//从左边给数组添加元素
	  	console.log(highArray);

	  	numBox.onclick=function(){ //给插入的元素添加点击他就删除自己的事件
	  	bigBox.removeChild(this);
	  	n-=1;
  		};
  		n+=1;
	  	console.log(n);
  	}else{
  		alert("队列元素已达到上限，不能再输入了^~^");
  	}
	

  	document.getElementById('queue').value='';//点击按钮之后输入框的值清空
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}

function rightOut(){
	bigBox = document.getElementById('big-box');
	bigBox.removeChild(bigBox.lastChild);
	n-=1;
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}
function rank(){
	bigBox = document.getElementById('big-box');
	var Div=bigBox.getElementsByTagName('div');
	console.log("div的个数"+Div.length);
	for(var i=1,exchange=true;i<highArray.length&&exchange;i++){ //用冒泡排序法

		exchange=false;

		for(var j=0;j<highArray.length-i;j++){
			if(highArray[j]>highArray[j+1]){
				var temp=highArray[j+1];
				highArray[j+1]=highArray[j];
				highArray[j]=temp;
				exchange=true;
			}
		}
	}
	console.log("排序后的数组"+highArray);
//把排序好的highArray的数字一个个赋给柱状条的高度属性
	 for(var x=0;x<Div.length;x++){
			Div[x].style.height=highArray[x]+"px";
		}
}
//}
