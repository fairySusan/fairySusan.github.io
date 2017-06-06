<template>
	<div id="wrap">
		<div id="main-box">
		<router-link to='/editPage.vue'id="new-survey"><b>+</b><i>新建问卷</i></router-link>
		{{qid}}
		</div>
	</div>
</template>
<script>
export default {
  name: 'createPage',
  data:function() {
    return {
    	qid:this.$route.query.id,
    }
  },
 }
</script>
<style scoped>
#main-box{
	position: relative;
	margin: 100px auto;
	width: 900px;
	height: 300px;
	background: white;
	border-radius:5px;
	box-shadow: 2px 3px  2px #959393;
}
#new-survey{
	display: block;
	position: absolute;
	top: 130px;
	left: 370px;
	width: 160px;
	height: 40px;
	background: #09D2BC;
	box-shadow: 1px 1px 1px #959393;
	border-radius: 3px;
	color: white;
	text-decoration: none;
}
#new-survey i{
	position: absolute;
	right: 30px;
	top:10px;
	font-style: normal;
	font-size: 16px;
}
#new-survey b{
	position: absolute;
	left: 25px;
	top:-2px;
	font-weight: normal;
	font-size: 30px;
}
</style>