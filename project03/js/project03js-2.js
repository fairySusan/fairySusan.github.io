//window.onload=function(){
var element;
var bigBox;

function leftIn(){
	element=document.getElementById('queue').value;
	
	if(element===''){
		alert('请输入数字');
		document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
	}else{
		var numBox=document.createElement('div');
		numBox.className='num-box';
		bigBox=document.getElementById('big-box');
		bigBox.appendChild(numBox);
		numBox.innerHTML=element;
	}
  	

  	numBox.onclick=function(){ //给插入的元素添加点击他就删除自己的事件
  		bigBox.removeChild(this);
  	};

  	document.getElementById('queue').value='';//点击按钮之后输入框的值清空
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}

function leftOut(){
	bigBox=document.getElementById('big-box');
	bigBox.removeChild(bigBox.childNodes[0]);

  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}

function rightIn(){
	element = document.getElementById('queue').value;
	if(element===''){
		alert('请输入数字');
		document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
	}else{

		var numBox = document.createElement('div');
		numBox.className = 'num-box';
		bigBox = document.getElementById('big-box');
		bigBox.appendChild(numBox);

		numBox.innerHTML = element;
		var childNode = bigBox.getElementsByTagName('div');
	  	bigBox.insertBefore(numBox,childNode[0]);

	  	numBox.onclick=function(){ //给插入的元素添加点击他就删除自己的事件
	  	bigBox.removeChild(this);
  		};
  	}
	

  	document.getElementById('queue').value='';//点击按钮之后输入框的值清空
  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
}

function rightOut(){
	bigBox = document.getElementById('big-box');
	bigBox.removeChild(bigBox.lastChild);

  	document.getElementById('queue').focus();//设置点击按钮后，输入框自动聚焦
  	}
//}
