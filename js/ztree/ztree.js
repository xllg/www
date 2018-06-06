


//作者:keqi	 
			//data:2011-04-02

			//全局变量,树1 , 树2
			var Tree1, Tree2;


			//JSON 数据  属于标准格式... 包含关系..
			//树节点 是根据 code 的规律分支的,包含关系如下,具体形成在JAVA 里面处理..然后使用JSON jar转换
			//12-10			根
			//12-10-10	叶
			//12-10-20	叶
			//12-10-30	叶
			//12-10-40			根
			//12-10-40-10	叶
			//12-10-40-20	叶
			//12-10-40-30	叶
			//12-10-40-40	叶

		var datad = [];
		var townId=UrlParm.parm("townId"); 
		var url=urlhost+"/fupin/getassessmentobjectbytown?townId=";
    	url+=townId;
		$.ajax({
	    url: url,
	    method: 'get',
	    dataType: 'json',
	    async: false,
	    success: function(data) {
        for (i = 0; i < data.length; i++) {
	            var object = {};
	            object["code"] = "12-" + i + "0";
	            object["id"] = data[i].assessmentObjectId;
	            object["name"] = data[i].name;
	            datad.push(object);
		        }
		    }
		});

			// datad = [{
			//     "code": "12-10",
			//     "id": 1,
			//     "name": "张三",
			//     // "nodes": [],
			//     // "privilegeUrl": "",
			//     // "systemModuleID": 12
			// },
			// {
			//     "code": "12-20",
			//     "id": 4,
			//     "name": "李四",
			//     // "nodes": [],
			//     // "privilegeUrl": "",
			//     // "systemModuleID": 12
			// },
			// {
			//     "code": "12-30",
			//     "id": 2,
			//     "name": "王五",
			//     // "nodes": [],
			//     // "privilegeUrl": null,
			//     // "systemModuleID": 12
			// },
			// {
			//     "code": "12-40",
			//     "id": 3,
			//     "name": "孙六",
			//     // "nodes": [],
			//     // "privilegeUrl": "",
			//     // "systemModuleID": 12
			// }];

			//ztree 的设置.对于标准格式数据.不需要设置我注释的那部分.
			//那部分属于简单格式数据需要设置的...不清楚去看ztree demo
			var setting = {
			    checkable: true
			    //isSimpleData: true,
			    //treeNodeKey: "id",
			    //treeNodeParentKey: "pId",
			    //showLine: true,
			    //root:{ 
			    //	isRoot:true,
			    //	nodes:[]
			    //},
			};

			//数据右移动
			function addRole() {
			    //移动方法
			    //右移时Tree1 在第一个参数,Tree2第二个参数
			    //表示Tree1移动致Tree2
			    moveTreeNode(Tree1, Tree2);

			}

			//数据左移动
			function delRole() {
			    //移动方法 参数相反
			    moveTreeNode(Tree2, Tree1);
			}

			function moveTreeNode(zTree1, zTree2) {
			    var nodes = zTree1.getCheckedNodes(); //获取选中需要移动的数据
			    for (var i = 0; i < nodes.length; i++) { //把选中的数据从根开始一条一条往右添加
			        var node = nodes[i];

			        var strs = {}; //新建一个JSON 格式数据,表示为一个节点,可以是根也可以是叶
			        strs.id = node.id;
			        strs.name = node.name;
			        strs.code = node.code;
			        strs.nodes = new Array(); //树节点里面有个 nodes 集合,用来存储父子之间的包涵关系
			        //调用添加方法
			        //strs : json 格式..拼装成树的一个节点
			        //zTree2: 表示需要添加节点的树
			        zTreeDataAddNode(strs, zTree2);

			        //获取这个被添加的code 如果是右增加  用来把它从左边移除掉
			        var scode = strs.code;
			        scode = scode.substring(0, scode.lastIndexOf("-"));

			        //使用递归移除 移除的时候从叶子开始找  和增加的时候刚好相反
			        //参数1就是数组最后一个数据  
			        //scode  : 上面截取的code 表示父亲节点 
			        //zTree1 : 需要移除的树,在zTree1 里面移除此对象
			        zTreeDataDelete(nodes[nodes.length - (i + 1)], scode, zTree1);
			    }
			    //把选中状态改为未选择
			    zTree2.checkAllNodes(false);
			    zTree1.checkAllNodes(false);

			    //刷新
			    zTree2.refresh();
			    zTree1.refresh();
			}

			//树数据移动方法
			function zTreeDataAddNode(strs, zTree2) {
			    var nodes = zTree2.transformToArray(zTree2.getNodes()); //获取需要添加数据的树下面所有节点数据
			    //如果有多个数据需要遍历,找到strs 属于那个父亲节点下面的元素.然后把自己添加进去
			    if (nodes.length > 0) {

			        //这个循环判断是否已经存在,true表示不存在可以添加,false存在不能添加
			        var isadd = true;
			        for (var j = 0; j < nodes.length; j++) {
			            if (strs.code == nodes[j].code) {
			                isadd = false;
			                break;
			            }
			        }

			        //找到父亲节点
			        var scode = strs.code;
			        scode = scode.substring(0, scode.lastIndexOf("-"));
			        var i = 0;
			        var flag = false;
			        for (i; i < nodes.length; i++) {
			            if (scode == nodes[i].code) {
			                flag = true;
			                break;
			            }
			        }

			        //同时满足两个条件就加进去,就是加到父亲节点下面去
			        if (flag && isadd) {
			            var treeNode1 = nodes[i];
			            treeNode1.nodes[treeNode1.nodes.length <= 0 ? 0 : treeNode1.nodes.length++] = strs;

			            //如果zTree2 里面找不到,也找不到父亲节点.就把自己作为一个根add进去
			        } else if (isadd) {
			            zTree2.addNodes(null, strs);
			        }
			    } else {
			        //树没任何数据时,第一个被加进来的元素
			        zTree2.addNodes(null, strs);
			    }
			}

			//数据移除
			function zTreeDataDelete(node, scode, zTree1) {
			    if (node.isParent) { //判断是不是一个根节点,如果是一个根几点从叶子开始遍历寻找
			        //如果是个根就检测nodes里面是否有数据
			        if (node.nodes.length > 0) {
			            //取出来
			            var fnodes = node.nodes;
			            for (var x = 0; x < fnodes.length; x++) {
			                //不是根节点.并且code 相当就是需要移除的元素
			                if (! (fnodes[x].isParent) && fnodes[x].code == scode) {
			                    //调用ztree 的移除方法,参数是一个节点json格式数据
			                    zTree1.removeNode(fnodes[x]);

			                    //如果当前这个节点又是个根节点.开始递归
			                } else if (fnodes[x].isParent) {
			                    zTreeDataDelete(fnodes[x], scode);
			                }
			            }
			        } else {
			            //如果是个根,但是下面的元素没有了.就把这个根移除掉
			            zTree1.removeNode(node);
			        }
			    } else {
			        //不是就直接移除
			        zTree1.removeNode(node);
			    }
			}