<template>
	<div id="app">
		<div id="main-box">
		<div>
			<input type="text" name="survey-name" id="survey-name" v-model="qTitle">
		</div>		

		<!--页面的发布弹窗提示start-->
		<div id="popW-box" class="popW-box" v-if="popFrm2">
			<div id="popW-head" class="popW-head">提示<span id="popW-return" class="popW-return">&times</span></div>
			<p id="popW-text" class="popW-text">
			是否发布问卷？<br>
			此问卷截止日期为<span id="popW-deadline">{{userDate}}</span>
			</p>
			<router-link to="/listPage.vue"><button class="popW-confirm" id="popW-confirm">确认</button></router-link>
			<button class="popW-cancel" id="popW-cancel" v-on:click="pop" v-if="popFrm2">取消</button>
		</div>
		<!--页面的发布弹窗提示end-->

		<!--页面的保存弹窗提示start-->
		<div id="popW-box2" class="popW-box" v-if="popFrm">
			<div id="popW-head2" class="popW-head">提示<span id="popW-return2" 
			class="popW-return">&times</span></div>
			<p class="popW-text">
			问卷保存成功！
			</p>
			<router-link to="/listPage.vue"><button class="popW-confirm" id="popW-confirm2">确认</button></router-link>
			<button class="popW-cancel" id="popW-cancel2" v-on:click="pop" v-if="popFrm">取消</button>
		</div>
		<!--页面的保存弹窗提示end-->

			<!--添加的问题再ul里-->
			<ul id="Q-ul">
				<li class="radio-li" v-for="ques in quesList">
					<span>Q{{ques.order}}</span>
					<input type="text" name="radio" class="radio-name" v-model=
					"ques.stem">
					<div v-if="ques.qtype!=='text'">
					<p class="radio-p" v-for="option in ques.options">
						<input type="radio" name="radio1">
						<input type="text" v-model="option.content" class="radio-input">
						<span class="delete-choice" v-on:click="deleteItem(ques.order,option.id)">删除选项</span>
					</p>
					<span class="new-choice" v-on:click="createItem(ques.order)">新建选项</span>
					<div>
						<span class="copy-btn" v-on:click="copyQues(ques.order)">复用</span>
						<span class="cancel-btn" v-on:click="deleteQues(ques.order)">删除</span>
					</div>
					</div>
				</li>
			</ul>

			<div class="add-box" id="add-box-1" v-if="hided"  v-on:click="hide()" ><span>+</span><h4>添加问题</h4></div>

			<div id="add-btn-box" v-if="show" v-on:click="hide()">
			<div class="add-box" id="add-box-2" ><span>+</span><h4>添加问题</h4></div>
			<button class="radio-btn add-btn" v-on:click="createQues('radio')">单选</button>
			<button class="add-btn" v-on:click="createQues('multi')">多选</button>
			<button class="add-btn" v-on:click="createQues('text')">文本题</button>
			</div>

			<div id="foot">
				
				问卷截止日期<input type="text" name="deadline" id="deadline" v-on:click="dateInput" v-model="userDate">
				<button id="save" v-on:click="save">保存问卷</button>
				<button id="pubnish" v-on:click="publish">发布问卷</button>
				<!--日历-->
				<calander v-if="dateShow" @returnDate='getDate'></calander>
			</div>
		</div>
	<router-view></router-view>
	</div>
</template>
<script>
import calander from "./calander.vue";
import store from "./store";
export default {
  name: 'editPage',
  components:{
  	calander
  },
  data:function() {
  	var qList = store.fetch().questionnaireList;
    var  ql = store.fetchQuestionnaire(this.$route.query.id);
    return {
    	show:false,
    	hided:true,
    	qid:this.$route.query.id,
    	qList:qList,
    	qTitle:ql.title,
    	quesList:ql.questionList,
    	//控制日历的可见和不可见
    	dateShow:false,
     	// 问卷截止日期
     	userDate:'',
    	//弹出框可见和不可见
    	popFrm:false,
    	popFrm2:false,
    }
  },
  methods:{
  	//得到用户选择的日期
  	 getDate:function(msg) {
	  	this.userDate = msg;
	  },
  	//控制弹出框可见与不可见
  	pop:function(){
  		this.popFrm = false;
  		this.popFrm2 = false;
  	},
  	hide:function(){
  		this.show = !this.show;
  		this.hided = !this.hided;
  	},
  //获取问卷问题id
  	getQuesOrder:function(){
  		return this.quesList.length+1;
  	},
  //新建一个题目
  	createQues:function(qtype){
  		var newQues = {};
  		var order = this.getQuesOrder();
  		newQues.order = order;

  		newQues.qtype = qtype;
  		if (qtype==="radio") {
  			newQues.stem = "单选题";
  		}else if (qtype==="multi") {
  			newQues.stem = "多选题";
  		}else if (qtype==="text") {
  			newQues.stem = "文本题";
  		}
  		newQues.options = [
  				{id:1,content:"选项一"},
  				{id:2,content:"选项二"},
  			];
  		this.quesList.push(newQues);
  	},
  	//新建选项
  	createItem:function(order){
  		var id,text='新选项';
  		id = this.quesList[order-1].options.length+1;
  		this.quesList[order-1].options.push({id:id,content:text});
  	},
  	//删除选项
  	deleteItem:function(order,id){
  		this.quesList[order-1].options.splice(id-1,1);
  		for(var i=0;i<this.quesList[order-1].options.length;i++){
  			this.quesList[order-1].options[i].id -=1;
  		}
  	},
  	//复用题目
  	copyQues:function(order){
  		var q = this.quesList[order-1];
  		this.quesList.push(q);
  	},
  	//删除题目
  	deleteQues:function(order){
  		for(var i = order;i<this.quesList.length;i++){
            this.quesList[i].order -= 1;
        }
         this.quesList.splice(order-1,1);
  	},
  	//保存问卷
  	save:function(){
  		 var i,dl,tmp;
        // 检查问题是否有至少一道
        if(this.quesList.length === 0){
            alert("问卷至少应有1道问题！");
            return false;
        }
        // 检查各问题是否有题干，选择题是否有两个及以上选项
        for(i=0;i<this.quesList.length;i++){
            if(this.quesList[i].stem.trim() === ""){
                alert("请确保每道题都有说明文字");
                return false;
            }
            if(this.quesList[i].qtype === "single" || this.quesList[i].qtype === "multi"){
	            if(this.quesList[i].options.length < 2){
	                alert("选择题至少要有两个选项！");
	                return false;
	            }
            }
        }
  		//问卷截止日期
  		var dl=2017/2/14;
  		this.popFrm = true;
  		store.saveQuestionnaire(this.qid,this.qTitle,dl,this.quesList);
  	},
  	//发布问卷
  	publish:function (){
  		var rsp = store.releaseQuestionnaire(this.qid);
  			this.popFrm2 = true;
  	},
  	dateInput:function() {
  		this.dateShow = !this.dateShow;
  	},
  },
}
</script>
<style scoped>
#main-box{
	position: relative;
	margin: 100px auto;
	width: 900px;
/*	height: 300px;
*/	background: white;
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
.add-box{               /**点击添加问卷后，margin-top=33*/
	position: relative;
	z-index: 1;
	width: 800px;
	height: 60px;
	margin:40px auto;
	border: 1px #E7E5E5 solid;
	background: #DDDDDD;
	text-align: center;
	color: #909090;
}
.add-box:hover h4,
.add-box:hover span{
	cursor: pointer;
	color: black;
}
.add-box h4{
	position: absolute;
	top: 20px;
	left: 390px;
	font-weight: normal;
}
.add-box span{
	position: absolute;
	top: 10px;
	left: 350px;
	font-size: 30px;
	font-weight: normal;
}
#foot{
	margin: 0 auto;
	padding-bottom: 20px;
	width: 850px;
	border-top: 2px #CFCFCF solid;
	padding-top: 30px;
}
#foot input{
	height: 20px;
	width: 200px;
	margin-left: 10px;
	margin-right: 200px;
}
#foot button{
	display: inline-block;
	background: white;
	border: 1px #aaaaaa solid;
	border-radius: 3px;
	margin-right: 10px;
	width: 80px;
	height: 25px;
}
#foot button:hover{
	outline: none;
	background: #DAF6F6;
}
#add-btn-box{
	border: 1px #aaaaaa solid;
	width: 802px;
	height: 140px;
	margin: 0 auto;
	margin-top: 15px;
	margin-bottom: 15px;
}
#add-btn-box #add-box-2{
	margin-top: 0;
}
#add-btn-box .add-btn{
	width: 80px;
	height: 25px;
	color: #909090;
	display: inline-block;
	background: white;
	border: 1px #AAAAAA solid;
	margin-right: 10px;
	/*margin-top: 20px;*/
	border-radius: 3px;
}
#add-btn-box .add-btn:hover{
	background:#DAF6F6;
}
.radio-btn{
	margin-left: 250px;
}
/**单选题的样式**/
ul{
	width: 802px;
	margin: 0 auto;
	list-style: none;
}
.radio-li{
	padding: 15px 15px 20px 15px;
}
.radio-li:hover .radio-name,
.radio-li:hover .radio-input,
.radio-li:hover{
	background: #DAF6F6;
}
.radio-name{
	border: none;
	width: 500px;
	background: white;
	font-size: 16px;
	margin-left: 15px;
	margin-bottom: 15px;
}
.radio-name:hover,
.radio-name:focus{
	outline: none;
}
.radio-p{
	position: relative;
	margin-left: 25px;
	padding-bottom: 5px;
}
.radio-input{
	position: absolute;
	top: -1px;
	border: none;
	width: 500px;
	background: white;
	font-size: 16px;
	padding-left: 10px;
}
.radio-input:hover,
.radio-input:focus{
	outline: none;
}
.copy-btn{
	margin-left: 650px;
	padding-right: 15px;
}
.copy-btn,.cancel-btn{
	color: #696868;
	font-size: 14px;
}
.copy-btn:hover,
.cancel-btn:hover{
	color: black;
	cursor: pointer;
}
.delete-choice{
	margin-left: 600px;
	color: #696868;
	font-size: 14px;
}
.delete-choice:hover{
	color: black;
	cursor: pointer;
}
.new-choice{
	padding:0 10px;
	margin-left: 30px;
	border: 1px #CACACA dotted;
	color: #696868;
	font-size: 14px;
}
.new-choice:hover{
	color: black;
	border-color: black;
	cursor: pointer;
}
.text-area{
	display: block;
	border:1px #CFCFCF solid;
}
/*确认和保存弹出框css*/
.popW-box{
	position: absolute;
	left: 36%;
	top: 30%;
	z-index: 99;
	background: white;
	width: 250px;
	border: 1px #CFCFCF solid;
	border-radius: 3px;
	animation: topAnimation 0.5s;
}
.popW-head{
	position: relative;
	height: 25px;
	background: #EFEFEF;
	font-weight: bold;
	padding-left:10px;
	padding-top: 5px;
}
.popW-head .popW-return{
	position: absolute;
	right: 10px;
	top:-2px;
	font-size: 26px;
	color: #999999;
	font-weight: normal;
}
.popW-head .popW-return:hover{
	color:  #000000;
	cursor: pointer;
}
.popW-text{
	padding-left: 10px;
	padding-top: 10px;
	line-height: 25px;
	color: #545454;
}
#popW-confirm,
#popW-confirm2{
	margin-left: 70px;
}
.popW-confirm,
.popW-cancel{
	margin-left: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	background: white;
	padding: 2px 10px;
	border:1px #CFCFCF solid;
}
.popW-confirm:hover,
.popW-cancel:hover{
	background: #DAF6F6;
}
/*弹出框的动画*/
@-webkit-keyframes topAnimation{
	from{transform: scale(0);}
	to{transform: scale(1);}
}
@keyframes topAnimation{
	from{transform: scale(0);}
	to{transform: scale(1);}
}
</style>