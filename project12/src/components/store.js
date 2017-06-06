const key = "test";

// 新增问卷的id
let newId = 3;
let data;

// 初始化数据
function initData() {
 	data = {
		// 用户列表
		userList:[
			{
				// 用户id
				id:1,
				// 用户名
				name:"admin",
				// 拥有的问卷id
				own:[1]
			}
		],
		// 问卷列表
		questionnaireList:[
			{
				// 全局唯一id
				id:1,
				// 拥有者id
				owner:1,
				// 问卷标题
		        title:"大学生消费水平调查",
		        // 问卷状态:有0：发布中,1：未发布,"closed"三种
		        state:0,
		        // 发布日期
		        releaseDate: "5/12/2016",
		        // 截止日期
		        deadline: "5/31/2016",
		        // 问题列表
		        questionList:[
		            {
		                order:1,
		                stem:"您的性别",
		                qtype:"single",
		                required:true,
		                options:[
		                    {id:1,content:"男"},
		                    {id:2,content:"女"}
		                ]
		            },
		            {
		                order:2,
		                stem:"您一个月的生活费是",
		                qtype:"single",
		                required:true,
		                options:[
		                    {id:1,content:"1000左右"},
		                    {id:2,content:"1500左右"},
		                    {id:3,content:"2000以上"}
		                ]
		            },
		            {
		                order:3,
		                stem:"您一个月的消费主要在",
		                qtype:"multi",
		                required:true,
		                options:[
		                    {id:1,content:"吃饭"},
		                    {id:2,content:"买衣服"},
		                    {id:3,content:"学习"},
		                    {id:4,content:"聚会"},
		                    {id:5,content:"旅游"},
		                    {id:6,content:"学习"},
		                    {id:7,content:"其他"}
		                ]
		            },
		            {
						order:4,
		                stem:"您每个月的生活费",
		                qtype:"multi",
		                required:true,
		                options:[
		                    {id:1,content:"充足且有余额"},
		                    {id:2,content:"刚好"},
		                    {id:3,content:"不够"}
		                ]
		            },
		            {
		                order:5,
		                stem:"您对现在大学生的消费水平的了解是",
		                required:false,
		                qtype:"text",
		                options:[]
		            }
		        ],
		        // 作答者
		        respondents:[
			        [1,2,[1,3,5],[1,2,3],"你们搞的这个问卷啊，excited!"],
			        [1,3,[2,3,4,6],[1,5,6],"无可奉告"],
			        [2,3,[2,4,5],[2,4,5,6],""],
			        [2,1,[1,3,6],[1,2,3,5,6],""],
			        [2,2,[1,2,4,5],[2,3,4],""],
			        [2,3,[2,3,4],[2,4],""],
			        [2,2,[2,3,4],[1,4,6],""],
			        [1,1,[1,3,5],[1,2,3],""],
			        [1,2,[1,3,5],[1,2,3],""],
			        [1,3,[1,3,5],[1,2,3],""],
			        [2,2,[2,3,5],[2,3,4,5,6],""],
			        [2,2,[2,3,5],[2,3,4,5,6],""],
			        [2,3,[2,3,5],[4,5,6],""],
			        [2,3,[2,3,5],[2,3,6],""],
			        [2,2,[2,3,5],[2,3,4,5,6],""],
		        ]
			},
			{
				id:2,
				owner:1,
		        title:"研究生创新创业现状调查",
		        state:1,
		        releaseDate:"1/1/2017",
		        deadline:null,
		        questionList:[
		            {
		                order:1,
		                stem:"您的学科是",
		                qtype:"single",
		                required:true,
		                options:[
		                    {id:1,content:"理科"},
		                    {id:2,content:"工科"},
		                    {id:3,content:"文科"},
		                    {id:4,content:"社科"},
		                    {id:5,content:"医科"}
		                ]
		            },
		            {
		                order:2,
		                stem:"您在研究生阶段参与过哪些学校活动",
		                qtype:"multi",
		                required:true,
		                options:[
		                    {id:1,content:"社会实践及公益类"},
		                    {id:2,content:"学术科技类"},
		                    {id:3,content:"社交联谊类"},
		                    {id:4,content:"文化艺术类"}
		                ]
		            },
		            {
		                order:3,
		                stem:"您选择创业的主要原因是",
		                qtype:"single",
		                required:true,
		                options:[
		                    {id:1,content:"获取财富"},
		                    {id:2,content:"实现自我价值"},
		                    {id:3,content:"实践领导才能"},
		                    {id:4,content:"获得权力、地位"},
		                    {id:5,content:"贡献社会"},
		                    {id:6,content:"其他"}
		                ]
		            },
		            {
		                order:4,
		                stem:"你对学校提供的创新创业支持有何意见或建议？",
		                required:false,
		                qtype:"text",
		                options:[]
		            }
		        ],
		        respondents:[]
			}
		]
	};
	localStorage.setItem(key, JSON.stringify(data));
}

// 获取本地数据
function fetch() {
    return JSON.parse(localStorage.getItem(key));
}
// 获取指定问卷
function fetchQuestionnaire(qid) {
	var localdata = fetch();
	for(var i=0;i<localdata.questionnaireList.length;i++){
		if(localdata.questionnaireList[i].id === qid){
			return localdata.questionnaireList[i];
		}
	}
}

/* 新增问卷
 * @param {Number} o 问卷所有者
 * @return {Number} 新问卷的标识
 */
function addQuestionnaire (o) {
	var q = {id:newId++,owner:o,title:"我的问卷",state:1,releaseDate:null,deadline:null,questionList:[],respondents:[]}
	data.questionnaireList.push(q);
    localStorage.setItem(key, JSON.stringify(data));
    return q.id;
}
/* 删除问卷
 * @param {Number} qid 问卷标识
 */
function deleteQuestionnaire (qid) {
	for(var i=0;i<data.questionnaireList.length;i++){
		if(data.questionnaireList[i].id === qid){
			data.questionnaireList.splice(i,1);
			localStorage.setItem(key, JSON.stringify(data));
			return true;
		}
	}
	return false;
}
/* 修改后保存问卷
 * @param {Number} qid 问卷唯一标识，不可改
 * @param {String} title 问卷标题
 * @param {String} deadline 问卷截止日期
 * @param {Array} questionList 问卷问题列表
 **/
function saveQuestionnaire (qid,title,deadline,questionList) {
	for(var i=0;i<data.questionnaireList.length;i++){
		if(data.questionnaireList[i].id === qid){
			data.questionnaireList[i].title = title;
			data.questionnaireList[i].deadline = deadline;
			data.questionnaireList[i].questionList = questionList;
			localStorage.setItem(key, JSON.stringify(data));
			return true;
		}
	};
	return false;	
}
// 发布问卷
function releaseQuestionnaire(qid) {
	var current = new Date();
	for(var i=0;i<data.questionnaireList.length;i++){
		if(data.questionnaireList[i].id === qid){
			// 检查是否符合发布要求：设置了截止日期，且至少有一道问题
			/*if(data.questionnaireList[i].deadline === null){
				return "Please set a deadline";
			}
			else if(data.questionnaireList[i].questionList.length === 0){
				return "Empty question list";
			}*/
			data.questionnaireList[i].state = 0;
			console.log("测试222");
			data.questionnaireList[i].releaseDate = current.getMonth()+1+"/"+current.getDate()+"/"+current.getFullYear();
			localStorage.setItem(key, JSON.stringify(data));
			return true;
		}
	}
	return false;
}
/* 回答问卷
 * @param {Number} qid 问卷标识
 * @param {Array} ans 依次对每道题的作答
 **/
function submitAnswer(qid,ans) {
	for(var i=0;i<data.questionnaireList.length;i++){
		if(data.questionnaireList[i].id === qid){
			data.questionnaireList[i].respondents.push(ans);
			localStorage.setItem(key, JSON.stringify(data));
			return true;
		}
	}
	return false;
}

export default {
	initData,
    fetch,
    fetchQuestionnaire,
    addQuestionnaire,
    deleteQuestionnaire,
    saveQuestionnaire,
    releaseQuestionnaire,
    submitAnswer
};