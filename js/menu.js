var addressall;
var menu;
$.ajax({
        url : urlhost+"/fupin/getadressall",  
        method : 'get',  
        dataType : 'json',  
        async: false,
        success:function(data){ 
        	addressall=data;           
            menu = {
				'fupinduixiang-manage': {
					title: [{
						title: '贫困户管理',
						menu:[
							// {
							// 	title: '沙坪坝区',
							// 	menu:[{
							// 		title: '虎溪镇',
							// 		menu:[{
							// 			title: '莲花村',
							// 			href: 'pages/pinkunhuguanli/pkh.html'
							// 		}]
							// 	}]
							// }
						]						
					},{
						title: '帮扶人员管理',
						menu:[
							// {
							// 	title: '沙坪坝区',
							// 	menu:[{
							// 		title: '虎溪镇',
							// 		href: 'pages/supperson/manage_supper.html'								
							// 	}]
							// }
						]						
					}]
				},

				'bangfucuoshi-manage': {
					title: [{
						title: '富民产业',
						href: 'pages/supmeasures/rich.html'	
					},{
						title: '专向扶贫',
						href: 'pages/supmeasures/specsupport.html'	
					},{
						title: '劳动力培训',
						href: 'pages/supmeasures/labortrain.html'	
					},{
						title: '社会援助',
						href: 'pages/supmeasures/socialsupport.html'	
					},{
						title: '金融扶贫',
						href: 'pages/supmeasures/accurateloan.html'	
					},{
						title: '危房改造',
						href: 'pages/supmeasures/reformhouse.html'	
					},{
						title: '饮水安全',
						href: 'pages/supmeasures/watersafe.html'	
					}]					
				},

				'bangfuchengxiao-manage': {
						title: [{
							title: '全市帮扶成效',
							href: 'pages/supeffects/supeffects.html'								
						},{
							title: '乡镇帮扶成效',
							menu:[
								// {
								// 	title: '沙坪坝区',
								// 	menu:[{
								// 		title: '虎溪镇',
								// 		menu:[{
								// 			title: '莲花村',
								// 			href: 'pages/supeffects/supeffects.html'
								// 		}]
								// 	}]
								// }
							]								
						}]
					},

				'data-analysis': {
					title: [{
						title: '全市数据分析',
						href: 'pages/city_data_analysis/all_analysis.html'								
					},{
						title: '区县数据分析',
						menu:[
						// {
							// title: '沙坪坝区',
							// href: 'pages/county_data_analysis/all_analysis.html'
							// menu:[{
							// 	title: '虎溪镇',
							// 	menu:[{
							// 		title: '莲花村',
							// 		href: 'pages/pages/data_analysis/all_analysis.html'
							// 	}]
							// }]
						// }
						]								
					}]
				},

				'performance-appraisal': {
					title: [{
						title: '绩效考核地区',
						menu:[]
						// menu:[{
						// 	title: '沙坪坝区',				
						// 	menu:[{
						// 		title: '虎溪镇',
						// 		href: 'pages/performance_examine/performance_examine.html'
						// 		}]
						// 	},{
						// 	title: '北碚区',				
						// 	menu:[{
						// 		title: '天生街道',
						// 		href: 'pages/performance_examine/performance_examine.html'
						// 		}]
						// 	}]
						}]
				},

				'system-mange': {
					title: [{
						title: '用户管理',
						// menu:[]
						href: 'pages/sys_manage/user_manage.html'	
					},{
						title: '数据备份与恢复',
						href: 'pages/sys_manage/backup.html'	
					}
						// ,{
						// 	title: '界面基本信息管理',
						// 	href: 'pages/sys_manage/view_info.html'	
						// }
					]
				}
			};
			//区县数据分析地址下拉菜单
			district(data);

			//乡镇帮扶成效地址下拉菜单
			town(data);

			//帮扶对象管理地址下拉菜单
			helpobject(data);

			//绩效考核下拉菜单
			performance(data);
        }
    });

function district(data){
	for(i = 0; i < data.length; i++){
		var dis1 = {};//区对象
		dis1['title'] = data[i].districtName;//添加区对象
	    dis1['href'] = 'pages/county_data_analysis/all_analysis.html?districtId='+data[i].districtId+'&districtName='+dis1['title'];
	    menu['data-analysis'].title[1].menu.push(dis1);
	}	
}
function town(data){
	for(i = 0; i < data.length; i++){
		var dis1 = {};//区对象
		dis1['title'] = data[i].districtName;//添加区对象
		dis1['menu'] = [];
	    for(j = 0; j < data[i].towns.length; j++){
	    	var town1 = {};
	        town1['title'] = data[i].towns[j].townName;//添加区下级对象
	        town1['href'] = 'pages/supeffects/supeffects.html?townId='+data[i].towns[j].townId+'&townName='+town1['title'];
	        dis1.menu.push(town1);                   
	    }
	    menu['bangfuchengxiao-manage'].title[1].menu.push(dis1);
	}	
}
function helpobject(data){
	for(i = 0; i < data.length; i++){
		var dis0 = {};//区对象
		dis0['title'] = data[i].districtName;//添加区对象
		dis0['menu'] = [];                
		for(j = 0; j < data[i].towns.length; j++){
			var town = {};
			townId = data[i].towns[j].townId;
		    town['title'] = data[i].towns[j].townName;//添加区下级对象
		    town['menu'] = [];
		    address = dis0['title']+'-'+town['title'];
		    for(k = 0; k < data[i].towns[j].villages.length; k++){
		    	var villages = {};
		        villages['title'] = data[i].towns[j].villages[k].villageName;//添加区下级对象
		        villages['href'] = 'pages/pinkunhuguanli/pkh.html?villageId='+data[i].towns[j].villages[k].villageId+'&villageName='+villages['title']+'&address='+address+'&townId='+townId;
		        town.menu.push(villages);                   
		    }
		    dis0.menu.push(town);                   
		}
		menu['fupinduixiang-manage'].title[0].menu.push(dis0);

		var dis1 = {};//区对象
		dis1['title'] = data[i].districtName;//添加区对象
		dis1['menu'] = [];
		for(j = 0; j < data[i].towns.length; j++){
			var town1 = {};
		    town1['title'] = data[i].towns[j].townName;//添加区下级对象
		    town1['href'] = 'pages/supperson/manage_supper.html?townId='+data[i].towns[j].townId+'&townName='+town1['title'];
		    dis1.menu.push(town1);                   
		}
		menu['fupinduixiang-manage'].title[1].menu.push(dis1);
	}
}
function performance(data){
	for(i = 0; i < data.length; i++){
		var dis = {};//区对象
		dis['title'] = data[i].districtName;//添加区对象
		dis['menu'] = [];
        for(j = 0; j < data[i].towns.length; j++){
        	var town = {};
            town['title'] = data[i].towns[j].townName;//添加区下级对象
            town['href'] = 'pages/performance_examine/performance_examine.html?townId='+data[i].towns[j].townId+'&townName='+town['title'];
            dis.menu.push(town);
        }
        menu['performance-appraisal'].title[0].menu.push(dis);
    }	
}


