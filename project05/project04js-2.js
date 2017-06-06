var block={   //小方块对象
	x:4,     //x，y都是表示格数，不表示像素
	y:4,
	state:0,//状态：向上：0；向右：1；向下：2；向左：3；
	angel:0//存储旋转角度
};
var state;
var dir;
var box;
var order=new Array();//存储从textarea里提取出来的指令
var i=0;
var command;
var orderNumber=new Array();//存储命令的命令部分
var orderHead=new Array();//存储命令的数字部分
//处理字符
function dealOrder(){
		command=document.getElementById('orderInput').value;
		command=command.toUpperCase();
	    command=command.trim();//去除字符串两边的空白
	    order=command.split("\n");//将输入的通\n拆分放入数组
	    console.log(order);
		//分割命令和数字
		for(var i=0;i<order.length;i++){
			var orderText=order[i].substring(0,2);
			if (orderText!=="GO") {
				orderHead[i]=order[i].substring(0,7);
				orderNumber[i]=parseInt(order[i].substring(8));
				orderHead[i]=orderHead[i].replace(/\s/g,"");//用正则表达式替换字符串里所有的空格
				
			}else{
				orderHead[i]=order[i].substring(0,2);
				orderNumber[i]=parseInt(order[i].substring(2));
			}
		}
			console.log("命令头"+orderHead);
			console.log("命令数"+orderNumber);
			Move();
		/*for(var j=0;j<orderNumber.length;j++){
		Move(orderHead[j],orderNumber[j]);//调用Move()
		}*/
}


function Move(){
	dir=block.state;
	box=document.getElementById("box");
	for(var i=0;i<orderNumber.length;i++){
		console.log(orderHead[i]);
	switch(orderHead[i]){
		case "GO":
		if (Math.abs(dir%4)===0&&block.y>0) {block.y-=orderNumber[i];}//上
		else if(Math.abs(dir%4)===1&&block.x<9){block.x+=orderNumber[i];}//右
		else if(Math.abs(dir%4)===2&&block.y<9){block.y+=orderNumber[i];}//Math.abs取绝对值  下
		else if(Math.abs(dir%4)===3&&block.x>0){block.x-=orderNumber[i];}//左
		break;

		case "TUNLEF":
		block.state+=3;
		block.angel-=90;
		break;

		case "TUNRIG":
		block.state+=1;
		block.angel+=90;
		break;

		case "TUNBAC":
		block.state+=2;
		block.angel+=180;
		break;
/*移动但是方向不变的指令*/
		case "TRALEF":
		if (block.x>0) {block.x-=orderNumber[i];}
		break;
		case "TRARIG":
		if (block.x<9) {block.x+=orderNumber[i];}
		break;
		case "TRATOP":
		if (block.y>0) {block.y-=orderNumber[i];}
		break;
		case "TRABOT":
		if (block.y<9) {block.y+=orderNumber[i];}
		break;
/*改变方向并且移动一步的指令*/
		case "MOVLEF":
		block.state=3;
		block.angel=-90;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y-=orderNumber[i];}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x+=orderNumber[i];}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y+=orderNumber[i];}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x-=orderNumber[i];}//左
		break;
		case "MOVRIG":
		block.state+=1;
		block.angel+=90;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y-=orderNumber[i];}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x+=orderNumber[i];}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y+=orderNumber[i];}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x-=orderNumber[i];}//左
		break;
		case "MOVTOP":
		block.state=4;
		block.angel=0;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y-=orderNumber[i];}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x+=orderNumber[i];}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y+=orderNumber[i];}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x-=orderNumber[i];}//左
		break;
		case "MOVBOT":
		block.state=2;
		block.angel=180;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y-=orderNumber[i];}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x+=orderNumber[i];}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y+=orderNumber[i];}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x-=orderNumber[i];}//左
		break;
		}
		act();
	}//for循环结束
	
}

function  act(){
	//这个box每一次得到的都是初始状态的box，即向上的box
	
	box.style.top=block.y*50+20+"px";
	box.style.left=block.x*50+20+"px";
	console.log(block.y+"and"+block.x);
	box.style.transition="transform 1s,left 1s,top 1s";//给旋转,平移添加过渡
	box.style.transform="rotate("+block.angel+"deg)";
}
/*ar numBox=document.getElementById('numBox');
var lineNum=1;
//添加行数
var orderInput=document.getElementById('orderInput');
	orderInput.addEventListener("keyup",function(event){
        if(event.keyCode==13){
            orderInput.innerHTML=orderInput.innerHTML+"\n";
            numBox.innerHTML=numBox.innerHTML+lineNum.toString()+"\n";
            lineNum++;
        }
    });*/
//重置函数
function reset(){
	document.getElementById('orderInput').value="";
	}


function init(){
}
init();
/*window.onload=function(){
	
	console.log("程序启动");
};*/