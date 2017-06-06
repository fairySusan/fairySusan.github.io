var block={   //小方块对象
	x:4,     //x，y都是表示格数，不表示像素
	y:4,
	state:0,//状态：向上：0；向右：1；向下：2；向左：3；
	angel:0//存储旋转角度
};
var state;
var dir;
var box;
function Move(){
	box=document.getElementById("box");
	var command=document.getElementById('command').value;
	command=command.toUpperCase();
	command=command.trim();//去除字符串两边的空白
	command=command.replace(/\s/g,"");//用正则表达式替换字符串里所有的空格

	document.getElementById('command').value="";
	console.log(command);
	dir=block.state;
	//if (block.state===-1) {block.state=3;}
	switch(command){
		case "GO":
		if (Math.abs(dir%4)===0&&block.y>0) {block.y--;}//上
		else if(Math.abs(dir%4)===1&&block.x<9){block.x++;}//右
		else if(Math.abs(dir%4)===2&&block.y<9){block.y++;}//Math.abs取绝对值  下
		else if(Math.abs(dir%4)===3&&block.x>0){block.x--;}//左
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
		if (block.x>0) {block.x--;}
		break;
		case "TRARIG":
		if (block.x<9) {block.x++;}
		break;
		case "TRATOP":
		if (block.y>0) {block.y--;}
		break;
		case "TRABOT":
		if (block.y<9) {block.y++;}
		break;
/*改变方向并且移动一步的指令*/
		case "MOVLEF":
		block.state+=3;
		block.angel-=90;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y--;}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x++;}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y++;}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x--;}//左
		break;
		case "MOVRIG":
		block.state+=1;
		block.angel+=90;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y--;}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x++;}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y++;}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x--;}//左
		break;
		case "MOVTOP":
		block.state+=4;
		block.angel=0;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y--;}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x++;}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y++;}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x--;}//左
		break;
		case "MOVBOT":
		block.state+=2;
		block.angel+=180;
		if (Math.abs(block.state%4)===0&&block.y>0) {block.y--;}//上
		else if(Math.abs(block.state%4)===1&&block.x<9){block.x++;}//右
		else if(Math.abs(block.state%4)===2&&block.y<9){block.y++;}//Math.abs取绝对值  下
		else if(Math.abs(block.state%4)===3&&block.x>0){block.x--;}//左
		break;


	}
	act();//调用运动函数
}

function  act(){
	//这个box每一次得到的都是初始状态的box，即向上的box

	box.style.top=block.y*50+20+"px";
	box.style.left=block.x*50+20+"px";
	box.style.transition="transform 1s,left 1s,top 1s";//给旋转,平移添加过渡
	box.style.transform="rotate("+block.angel+"deg)";
}