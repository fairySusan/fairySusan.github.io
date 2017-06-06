<template>
	<div id="app">
		<header>
				<a href="listPage.html" id="survey-manage">问卷管理</a>
				<a href="#" id="my-survey">我的问卷</a>
		</header>

		<div id="main-box">
		<div>
		<input type="text" name="survey-name" id="survey-name" placeholder="大学生月消费调查">
		</div>
		<ul>
			<li class="question-li">
				<span>Q1</span>
				<span class="question-name">(单选题)您的性别</span>
				<span class="data-rate">数据占比</span>
				<p class="question-p">
					<input type="radio" name="Q1" class="choice-1">男
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="boy"></span>
					</span> 
					60%
					</span>
				</p>
				<p class="question-p">
					<input type="radio" name="Q1" class="choice-2">女
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="girl"></span>
					</span> 
					40%
					</span>
				</p>
			</li>
			<li class="question-li">
				<span>Q2</span>
				<span class="question-name">(单选题)您一个月的生活费是</span>
				<span class="data-rate">数据占比</span>
				<p class="question-p">
					<input type="radio" name="Q2" class="choice-1">1000左右
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="RMB1k"></span>
					</span> 
					35%
					</span>
				</p>
				<p class="question-p">
					<input type="radio" name="Q2" class="choice-2">1500左右
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="RMB1-5k"></span>
					</span> 
					55%
					</span>
				</p>
				<p class="question-p">
					<input type="radio" name="Q2" class="choice-2">2000以上
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="RMB2k"></span>
					</span> 
					10%
					</span>
				</p>
			</li>
			<li class="question-li">
				<span>Q3</span>
				<span class="question-name">(多选题)您一个月的消费主要在</span>
				<span class="data-rate">数据占比</span>
				<p class="question-p">
					<span class="Q3-choice" style="background: #F8ACAC;"></span>吃饭
				</p>
				<p class="question-p">
					<span class="Q3-choice" style="background:#9185F8;"></span>买衣服
				</p>
				<p class="question-p">
					<span class="Q3-choice" style="background:#FD7ADF;"></span>聚会旅游
				</p>
			    <p class="question-p">
					<span class="Q3-choice" style="background:#65E0F9;"></span>学习
				</p>
				<p class="question-p">
					<span class="Q3-choice" style="background:#6EF668;"></span>其他
				</p>
				<canvas id="Q3-canvas" width="150" height="150"></canvas>
			</li>
			<li class="question-li">
				<span>Q4</span>
				<span class="question-name">(单选题)您每个月的生活费</span>
				<span class="data-rate">数据占比</span>
				<p class="question-p">
					<input type="radio" name="Q4" class="choice-1">充足且有余额
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="enough"></span>
					</span> 
					24%
					</span>
				</p>
				<p class="question-p">
					<input type="radio" name="Q4" class="choice-2">刚好
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="just"></span>
					</span> 
					46%
					</span>
				</p>
				<p class="question-p">
					<input type="radio" name="Q4" class="choice-2">不够
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="less"></span>
					</span> 
					30%
					</span>
				</p>
			</li>
			<li class="question-li">
				<span>Q5</span>
				<span class="question-name">(文本题)您对现在大学生的消费水平的了解是</span>
				<span class="data-rate">有效回答</span>
				<p class="question-p">
					<span class="rate-box">
					<span class="rate-bar">
					<span class="rate-color" id="valid"></span>
					</span> 
					20%
					</span>
				</p>
			</li>
		</ul>
		<router-link to="/listPage.vue"><button id="return-btn">&lt&nbsp&nbsp返回</button></router-link>
		</div><!--main-box结束-->
		<router-view></router-view>
	</div><!--wrap结束-->
</template>

<script></script>
<style scoped>
header{
  height: 40px;
  background: #09D2BC;
}
#survey-manage{
  font-family: "微软雅黑","宋体";
  text-decoration: none;
  font-size: 20px;
  color: white;
  line-height: 40px;
  padding: 0 30px 0 50px;
}
#my-survey{
  font-family: "微软雅黑","宋体";
  text-decoration: none;
  font-size: 14px;
  color: white;
  line-height: 40px;
}
#main-box{
  position: relative;
  margin: 100px auto;
  padding-bottom: 30px;
  width: 900px;
  background: white;
  border-radius:5px;
  box-shadow: 2px 3px  2px #959393;
}
#survey-name{
	display: block;
	margin:0 auto;
	width: 850px;
	height: 60px;
	font-size: 28px;
	text-align: center;
	border-color: #CFCFCF;
	border-style: solid;
	border-width: 0 0 2px 0;
}
#survey-name:hover{
	background: #DAF6F6;
	outline:none;
}
#survey-name:focus{
	outline: none;
}
	ul{
	width: 802px;
	margin: 0 auto;
	list-style: none;
	padding-bottom: 20px;
	border-bottom: 1px #AAAAAA solid;
}
.question-li{
	position: relative;
	border: 1px #D7D7D7 solid;
	padding: 15px 15px 20px 15px;
	margin-top: 20px;
}
.question-name{
	font-size: 16px;
	margin-left: 15px;
	margin-bottom: 15px;
}
.data-rate{
	position: absolute;
	right: 250px;
}
.rate-box{
	position: absolute;
	font-size: 14px;
	right: 65px;
	width: 250px;
	height: 10px;
}
.rate-bar{
	display: inline-block;
	width: 200px;
	height: 10px;
	border: 1px #CCCCCC solid;
}
.rate-box .rate-color{
	position: absolute;
	top: 4px;
	display: inline-block;
	background: #09D2BC;
	height: 100%;
}
#boy{
	width: 60%;
}
#girl{
	width: 40%;
}
#RMB1k{
	width: 35%;
}
#RMB1-5k{
	width: 55%;
}
#RMB2k{
	width: 10%;
}
#enough{
	width: 24%;
}
#just{
	width: 46%;
}
#less{
	width: 30%;
}
#valid{
	width: 20%;
}
#Q3-canvas{
	position: absolute;
	top: 40px;
	right: 150px;
}
.question-p{
	padding-top: 15px;
	padding-left: 40px;
}
.choice-1,.choice-2{
	margin-right: 10px;
}
.Q3-choice{
	display: inline-block;
	margin-right: 10px;
	width: 10px;
	height: 10px;
}
#return-btn{
	border: 1px #09D2BC solid;
	border-radius: 3px;
	background: #09D2BC;
	color: white;
	margin-left: 45%;
	margin:20px 45% 30px 45%;
	padding: 3px 20px;
}
</style>