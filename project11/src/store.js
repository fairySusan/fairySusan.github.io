const key = 'todolist';

export default{
	fetch:function() {
		return JSON.parse(window.localStorage.getItem(key)||'[]')
	},
	save:function (items){
		window.localStorage.setItem(key,JSON.stringify(items))
	}
}

