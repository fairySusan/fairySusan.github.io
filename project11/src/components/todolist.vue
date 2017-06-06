<template>
  <div id="app">
    <div id="add-box">
      <span id="tdl-span">ToDoList</span>
      <input id="add-input" type="text" placeholder="添加ToDo" v-model="newItem" v-on:keydown.enter="addItems">
    </div>
    <h3>待办事项</h3>
    <ul>
      <li v-for="item in items" v-if="!item.isFinish">
        <input class="check" type="checkbox" v-on:click="finishToggle(item)">
        <p>{{item.lable}}</p>
        <span class="delete" v-on:click="deleteItem(item)">×</span>
      </li>
    </ul>
    <h3>完成事项</h3>
    <ul>
      <li class="finish-li" v-for="item in items" v-if="item.isFinish">
        <input class="check" type="checkbox">
        <p>{{item.lable}}</p>
        <span class="delete" v-on:click="deleteItem(item)">×</span>
      </li>
    </ul>
    <div id="Copyright">Copyright © 2017/5/31 by taorui</div>
  </div>
</template>

<script>
import store from "../store.js"
export default {
  name: 'todolist',
  data () {
    return {
      items:store.fetch(),
      newItem:'',
    }
  },
  watch:{
    items:{
      handler:function(items){
        store.save(items);
      },
      deep:true,
    }
  },
  methods:{
    //添加事项
    addItems:function() {
      var newLable = {lable:this.newItem,isFinish:false};
      this.items.push(newLable);
      this.newItem = "";
    },
    //切换事项的完成与否
    finishToggle:function(item){
      item.isFinish = true;
    },
    //删除事项
    deleteItem:function(item){
      this.items.splice(item.index,1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #add-box{
    background: #96d7a0;
    height: 30px;
    padding:10px 0;
    text-align: center;
  }
  #tdl-span{
    font-size: 24px;
    color: #ffffff;
    margin-right: 150px;
  }
  #add-input{
    width: 350px;
    height: 25px;
    border:none;
    border-radius: 5px;
    padding-left: 10px;
    -moz-box-shadow: inset 1px 1px 10px #DDDDDD;
    -webkit-box-shadow: inset 1px 1px 10px #DDDDDD;
    box-shadow: inset 1px 1px 10px #DDDDDD;
  }
  h3{
    font-size: 24px;
    color: #000000;
    margin-right: 500px;
    text-align: center;
    padding-top:20px;
  }
  li{
    position: relative;
    width: 600px;
    height: 20px;
    background: white;
    padding:5px 0;
    margin-top: 5px;
    border:1px #EEEEEE solid;
    border-left-width: 5px;
    border-left-color: #96d7a0; 
    border-radius: 5px;
    margin-left: 380px;
    list-style-type: none;
  }
  .finish-li{
    background: #EFEFEF;
    color: #CCCCCC;
    border-left-color: #CCCCCC; 
  }
  .check{
    position: absolute;
    left: 10px;
    width: 20px;
    height: 20px;
  }
  p{
    display:block;
    margin-left: 40px;
  }
  .delete{
    position: absolute;
    font-size: 20px;
    right: 10px;
    top:4px;
    color: #DDDDDD;
  }
  .delete:hover{
    color:black;
    cursor:default;
  }
  #Copyright{
    color: #DDDDDD;
    font-size: 16px;
    padding-left: 500px;
    margin-top: 100px;
  }
</style>
