<template>
<div class="outside-box" id="app"><!--日历大盒子-->
	<div class="month">
    	<ul>
        	<li id="prev" v-on:click="prev">&lt</li>
            <li id="next" v-on:click="next">&gt</li>
            <li id="month-title">
            	<span id="monthName">{{monthArr[month-1]}}</span><br>
	            <span id="prev-year" v-on:click="prevYear()">&lt</span>
	            <span id="yearName">{{year}}</span>
	            <span id="next-year" v-on:click="nextYear()">&gt</span>
            </li>
        </ul>
    </div>
    
    <ul class="weekday">
        <li>Su</li>
    	<li>Mo</li>
        <li>Tu</li>
        <li>We</li>
        <li>Th</li>
        <li>Fr</li>
        <li>Sa</li>
    </ul>
    
    <ul id="day">
        <li v-for="pday in pdays" class="pMonthDay">{{pday.date}}</li>
   		<li v-for="day in days" id="MonthDay" v-on:click="selectDate(day.date)" v-bind:class="{today:day.date==days[today-1].date}">{{day.date}}</li>
        <li v-for='nday in ndays' class="pMonthDay">{{nday.date}}</li>
    </ul>
    </div>
</template>

<script>
export default {
        name:'calander',
        data:function(){
            return{
            monthArr:["Jan",
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
                        "Dec"],
            date:new Date(),
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            today:new Date().getDate(),
            week:new Date().getDay(),
            //当月的天数
            monthdays:'',
            //当月一号是周几
            monthStart:'',
            //本月的日期
            days:[],
            //上月剩下的日期
            pdays:[],
            //下个月开始的日期
            ndays:[],
            //用户选择的日期
            selectday:'',
            }
        },
        mounted:function() {
        this.showDate();
        },
        methods:{
            //获取当月一号是周几
            getMonthStart:function (y,m,d){
                var date=new Date(y,m,d);
                return date.getDay();
            },
            //获取当月的天数
            getMonthDays:function (y,m){
                var date=new Date(y,m,0);
                return date.getDate();
            },
            //上一个月
            prev: function() {
                if(this.month>1)this.month--;
                //把三个数组都清空，再次渲染
                this.days.splice(0,this.days.length);
                this.pdays.splice(0,this.pdays.length);
                this.ndays.splice(0,this.ndays.length);
                this.showDate();
            },
            //下一个月
            next: function() {
                if(this.month<12)this.month++;
                 //把三个数组都清空，再次渲染
                this.days.splice(0,this.days.length);
                this.pdays.splice(0,this.pdays.length);
                this.ndays.splice(0,this.ndays.length);
                this.showDate();
            },
            //上一年
            prevYear: function() {
                this.year--;
                 //把三个数组都清空，再次渲染
                this.days.splice(0,this.days.length);
                this.pdays.splice(0,this.pdays.length);
                this.ndays.splice(0,this.ndays.length);
                this.showDate();
            },
            //下一年
            nextYear: function() {
                this.year++;
                 //把三个数组都清空，再次渲染
                this.days.splice(0,this.days.length);
                this.pdays.splice(0,this.pdays.length);
                this.ndays.splice(0,this.ndays.length);
                this.showDate();
            },
            //渲染日历
            showDate:function() {
            this.monthdays = this.getMonthDays(this.year,this.month);
            this.monthStart=this.getMonthStart(this.year,this.month-1,1);
                //渲染当月的日期
                for(var i=0;i<this.monthdays;i++){
                    var d = {date:i+1};
                    this.days.push(d);
                }
                //渲染上个月剩下的日期
                //获取上一个月有几天
                var prev_d=this.getMonthDays(this.year,this.month-1);
                //让上一个月剩余的天数倒着填充
                var h = prev_d-this.monthStart+1;
                for(var i=0;i<this.monthStart;i++){
                    var pd = {date:h};
                    this.pdays.push(pd);
                    h++;
                }
                console.log(this.monthStart);
                
                //渲染下一个月开始的日期
                var m = 42-(this.monthStart+this.monthdays);
                for(var i=0;i<m;i++){
                    var nd = {date:i+1};
                    this.ndays.push(nd);
                }
            },
            //用户选择日期
            selectDate:function(d){
                this.selectday = this.year+'-'+this.month+'-'+d;
                this.$emit('returnDate',this.selectday);
            },
            returnDate:function(){
                return this.selectday;
                  console.log(this.selectday);
            }
        },    
    }    
</script>

<style scoped>
.outside-box{margin:10px 125px;width:300px;-webkit-animation:animationCenter 0.5s;
      animation:animationCenter 0.5s;}
.month{width:300px;height:40px;background:#1abc9c;position:relative;}
ul{list-style:none;}
#prev,#next{position:absolute;top:6px;color:white;padding:3px;font-size:14px;border-radius:2px;transition:0.5s ease;}
#next{right:0px;}
#prev:hover,#next:hover,#prev-year:hover,#next-year:hover{background:rgba(0,0,0,0.5);cursor: pointer;}
.month #month-title{width:300px;height:30px;font-size:16px;color:white;text-align:center;}
#prev-year,#next-year{font-size:12px;font-weight:bold;color: white;}
.weekday{width:300px;height:30px;background:#ddd;}
.weekday li{display:inline-block;text-align:center;padding-top:10px ;color:#605E5E;width:12%;}
#day{width:300px;background:#eeeeee;transition:0.5s ease;}
#day li{display:inline-block;padding:5px 0;text-align:center;width:12%;border-radius:3px;}
#day li:hover{background:rgba(0,0,0,0.5);color:white;}
.pMonthDay{color:#C5C0C0;}
#MonthDay{color:#605E5E;}
.today{background:rgba(0,0,0,0.2);}
@-webkit-keyframes animationCenter{
        from{-webkit-transform:scale(0);}
        to{-webkit-transform:scale(1);}
        }
        @keyframes animationCenter{
            from{transform:scale(0);}
            to{transform:scale(1);}
            }
</style>