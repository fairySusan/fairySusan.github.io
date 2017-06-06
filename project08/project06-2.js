 var monthArray=new Array("Jan",
					 	"Feb",
					 	"March",
					 	"April",
					 	"May",
					 	"Jun",
					 	"July",
					 	"August",
					 	"Sept",
					 	"Oct",
					 	"Nov",
					 	"Dec");
    var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var week=date.getDay();
	var monthStart=getMonthStart(year,month-1,1);//获得当月一号是周几
	var monthDays=getMonthDays(year,month);//获得当月的天数

//获取当月一号是周几,getDay()返回一周的第几天，0~6,0为星期天，6为星期六。
function getMonthStart(y,m,d){
	var date=new Date(y,m,d);
	return date.getDay();
}
//获取当月的天数
function getMonthDays(y,m){
	var date=new Date(y,m,0);
	return date.getDate();
}

var monthName=document.getElementById('monthName');
//选择上一个月
function prev(){
	if (1<month) {
		month--;
		monthName.innerHTML=monthArray[month-1];
	}

	var prev_w=getMonthStart(year,month-1,1);//获取上一个月的1号是周几
	var prev_d=getMonthDays(year,month);//获取上一个月有几天

	showDate(prev_w,prev_d,month);	//渲染表格
}	

//选择下一个月
function next(){
	if (month<12) {
		month++;
		monthName.innerHTML=monthArray[month-1];
	}
	var prev_w=getMonthStart(year,month-1,1);//获取下一个月的1号是周几
	var prev_d=getMonthDays(year,month);//获取下一个月有几天

	showDate(prev_w,prev_d,month);	//渲染表格
}
//选择上一年
var yearName;
function prevYear(){
	yearName=document.getElementById('yearName');
	year-=1;
	yearName.innerHTML=year;
	var prev_yw=getMonthStart(year,month-1,1);
	var prev_yd=getMonthDays(year,month);

	showDate(prev_yw,prev_yd,month);//渲染表格
}
//选择下一年
function nextYear(){
	yearName=document.getElementById('yearName');
	year+=1;
	yearName.innerHTML=year;
	var prev_yw=getMonthStart(year,month-1,1);
	var prev_yd=getMonthDays(year,month);

	showDate(prev_yw,prev_yd,month);//渲染表格
}
//给li填充日期,渲染表格
var u_day;

function showDate(w,d,m){
	var ulDay=document.getElementById('day');
	var liDay=ulDay.getElementsByTagName('li');
	for(var x=0;x<liDay.length;x++){
		liDay[x].style.color="#605E5E";		//在让上一个月的日期变灰之前，先恢复原来的样式
	}
//填充当月的日期
var userDate=document.getElementById('user-date');
	for(var i=w,num=1;i<(w+d);i++){
		liDay[i].innerHTML=num;
		num++;
		//点击一个日期，输入框内出现该日期
		liDay[i].addEventListener("click",function(){
				u_day=this.innerHTML;
			userDate.value=year+"-"+month+"-"+u_day;

		});
	}

	liDay[day+monthStart-1].className="today";

//填充上一个月剩下的日期
	var prev_d=getMonthDays(year,m-1);//获取上一个月有几天
	for(var j=w-1,y=prev_d;j>-1;j--){
		liDay[j].innerHTML=y;
		liDay[j].style.color="#C5C0C0";
		y--;
	}
//填充下一个月开始的日期
for(var r=(w+d),h=1;r<42;r++){
		liDay[r].innerHTML=h;
		liDay[r].style.color="#C5C0C0";
		h++;
	}
}
//输入框聚焦时，出现日期面板
function getUserDate(){
	var userDate=document.getElementById('user-date');
	var outSideBox=document.getElementById('outside-box');
	var submit=document.getElementById('submit');
	userDate.addEventListener("focus",function(){
		outSideBox.style.display="block";
	});
	submit.addEventListener("click",function(){
		outSideBox.style.display="none";
	});
}
window.onload=function(){
	monthName=document.getElementById('monthName');
	monthName.innerHTML=monthArray[month-1];
	showDate(monthStart,monthDays,month);//初始化当下这一个月的日期
	getUserDate();
};