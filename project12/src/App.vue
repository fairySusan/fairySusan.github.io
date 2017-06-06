<template>
  <div id="app">
  <header>
     <router-link to='/listPage.vue' id="survey-manage">问卷管理</router-link>
      <a href="#" id="my-survey">我的问卷</a>
  </header>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./components/store";
export default {
  	name: 'app',
	//create方法必须要放在外面，不然就export不出去
	created:function () {
	   // 加载初始数据
	   store.initData();
	},
}
</script>

<style type="text/css">
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
</style>