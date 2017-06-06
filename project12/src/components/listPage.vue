<template>
  <div id="app">
    <div id="title-box">
      <span id="title">标题</span>
      <span id="time">时间</span>
      <span id="state">状态</span>
      <span id="option">操作</span>
      <a v-on:click="createQues"><button id="new-btn">新建问卷</button></a>
    </div>
    <ul id="main-box">
      <li v-for="ques in qList">
        <input type="checkbox"  class="survey-radio" v-on:click="selectList(ques.id)">
        <a v-on:click="viewQues(ques.id)">
          {{ques.title}}
        </a>
        <span class="publish-time">{{ ques.releaseDate}}</span>
        <span class="publish-state">{{ques.state |stateFilter}}</span>

        <button v-if="ques.state===1" v-on:click="viewQues(ques.id)" id="edit-btn" class="option-btn">编辑</button>
        <button id="cancel-btn" class="option-btn" v-on:click="deleteData(ques.id,ques.title)">删除</button>
        <router-link to='/browserData.vue'>
        <button id="browse-btn" class="option-btn">查看数据</button>
        </router-link>
      </li>
      <li id="survey-radio">
        <input type="checkbox" name="select-all" class="survey-radio" v-model="selectedAll"
        id="select-all" v-on:change="selectAll()">全选
        <button  id="cancel-all" v-on:click="delAll()">删除</button>
      </li>
    </ul>
    <router-view></router-view>     
  </div>
</template>

<script>
import store from "./store";

export default {
  name: 'listPage',
  filters:{
  stateFilter:function(value){
     if(value===0){
        return "发布中";
      }else if(value===1){
        return "未发布";
      }else{
        return "状态错误"
      }
  }
},
  
  data:function() {
    var qList = store.fetch().questionnaireList;
    return {
      qList:qList,
      selectArr:[],
      selectedAll:false,
      //当前操作的数据id
      curList:0,
    }
  },
  filter:{
    
  },
  methods:{
    //选择单个数据
    selectList:function(curList){
      var L = this.qList[curList];
      this.selectArr.push(L);
    },
    //删除单个数据
    deleteData:function(curList,title){
      if(this.selectArr.length>0){
         store.deleteQuestionnaire (curList);
        //更新列表数据
        this.qList=store.fetch().questionnaireList;
      }else{
        alert("请勾选");
      }
      
    },
    //选择全部数据
    selectAll:function(){
      this.selectArr = this.qList;
    },
    //删除全部数据
    delAll:function(){
      if (this.selectArr.length>0) {
        for(var i=1;i<=this.qList.length;i++){
           store.deleteQuestionnaire (i);
        }
        this.$router.push({path:'/createPage.vue'}); 
      }else{
        alert("请勾选全选");
      }
      this.qList=store.fetch().questionnaireList;
    },
    //查看问卷
    viewQues:function(id){
      this.$router.push({path:'/editPage.vue',query:{id:id}});
    },
    // 新建问卷：创建一个空白问卷并跳转到该问卷的编辑页面
    createQues:function () {
      var newqid = store.addQuestionnaire(1);
      this.$router.push({path:"/editPage.vue",query:{id:newqid}});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-box{
  position: relative;
  margin: 0 auto;
  padding-bottom: 30px;
  width: 900px;
  background: white;
  border-radius:5px;
  box-shadow: 2px 3px  2px #959393;
}
ul{
  list-style: none;
}
#title-box{
  margin:100px auto;
  margin-bottom: 10px;
  width: 900px;
}
#title{
  margin-left: 50px;
}
#time{
  margin-left: 330px;
}
#state{
  margin-left: 120px;
}
#option{
  margin-left: 140px;
}
li{
  position: relative;
  width: 840px;
  padding: 10px 10px;
  margin:0 auto;
  background: white;
  padding-bottom: 10px;
  border-bottom: 1px #999999 solid;
}
#title-li{
}
#new-btn{
  margin-left:10px;
  background: #5BDAD6;
  color: white;
  padding: 3px 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #AFAFAF;
  outline: none;
}
.survey-radio{
  margin:0 20px 0 10px;
}
a{
  text-decoration: none;
  color: black;
}
a:hover{
  color: #5BDAD6;
}
.publish-time{
  position: absolute;
  top: 10px;
  left:360px;
}
.publish-state{
  position: absolute;
  top: 10px;
  left: 570px;
  color: #5BDAD6;
}
.option-btn{
  float: right;
  margin-right: 15px;
  background: #5BDAD6;
  color: white;
  padding: 3px 5px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #AFAFAF;
  outline: none;
}
#survey-radio{
  margin-top: 20px;
  border-bottom: none;
}
#cancel-all{
  background: #5BDAD6;
  color: white;
  margin-left: 10px;
  padding: 3px 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #AFAFAF;
  outline: none;
}
</style>
