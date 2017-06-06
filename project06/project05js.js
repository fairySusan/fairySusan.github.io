var student=[
	["小红",60,78,100,238],
	["小军",90,50,89,229],
	["小白",68,56,90,214],
	["小明",89,76,40,205],
];
	var chinese=new Array();
	var math=new Array();
	var english=new Array();
	var total=new Array();
	var myTable;
	//获取分数存入数组中
function score(){
	for(var i=0;i<4;i++){
		chinese[i]=student[i][1];
		math[i]=student[i][2];
		english[i]=student[i][3];
		total[i]=student[i][4];
	}
}
	//升序
function ascendingSort(course){
	//冒泡排序,升序
	console.log(student);
		for(var i=1,exchange=true;i<4&&exchange;i++){

				exchange=false;

			for(var j=0;j<4-i;j++){
				if (course[j]>course[j+1]) {
						var temp=course[j+1];
						course[j+1]=course[j];
						course[j]=temp;

						temp=student[j+1];
						student[j+1]=student[j];
						student[j]=temp;
						exchange=true;
				}
			}
		}
	upDate();
}
     //降序
function descendingSort(course){
	//冒泡排序，降序
	student=student;
	for(var i=1,exchange=true;i<4&&exchange;i++){

		exchange=false;

		for(var j=0;j<4-i;j++){
		if (course[j]<course[j+1]) {
				var temp=course[j+1];
				course[j+1]=course[j];
				course[j]=temp;

				temp=student[j+1];
				student[j+1]=student[j];
				student[j]=temp;
				exchange=true;
			}
		}
	}
	upDate();
}student
	//更新表格
function upDate(){
	var cell;
	for(var i=1;i<5;i++){
	cell=document.getElementById('myTable').rows[i].cells;
		for(var j=0;j<5;j++){
			cell[j].innerHTML=student[i-1][j];
		}
	}
}

	/*down4.addEventListener("click",descendingSort);*/
	/*如果要在addEventListener里调用带参数的函数，
	则要用一个匿名函数包起来，不然传递的是函数的返回值，
	而不是函数本身*/