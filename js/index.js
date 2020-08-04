$(function() {
	//设置时间进度条
	//获取时间元素的宽度
	var timewidth = $('.time').width();
	//判断动画走完所想要的时间
	// var index = 0; //定时器
	
	// var end; //清除定时器
	// function setindex() {
	// 	end = setInterval(function() {
	// 		index += 1;
	// 		console.log(index);
	// 	}, 1000)
	// }

	//定时器，时间公式等于：秒数/元素的宽度，把得到的数值传给定时器 如想要60秒走完 60/180（元素宽度）,除不尽往大1取整
	var times; //清除定时器
	var getclert;
	var idnex1=0;
	// 进度条方法settime()
	function settime() {
		times = setInterval(function() {
			timewidth -= 1;
			$('.time').css({
				'width': timewidth
			})
			if (timewidth == 0) {
				//进度条结束删除图片
				$img.remove();
				//清除图片计时器
				clearInterval(getclert);
				//清除动画计时器
				clearInterval(times);
				//执行结束重新给进度条赋值
				timewidth = 180;
				//调用结束蒙版
				$('.over-game').show();	
			}
		}, 167); //30s(167);
			//设置灰太狼图片
			var hui = ['images/h0.png', 'images/h1.png', 'images/h2.png',
				'images/h3.png', 'images/h4.png', 'images/h5.png', 'images/h6.png',
				'images/h7.png', 'images/h8.png', 'images/h9.png',
			];
			//设置小灰灰图片
			var xiaohui = ['images/x0.png', 'images/x1.png', 'images/x2.png',
				'images/x3.png', 'images/x4.png', 'images/x5.png', 'images/x6.png',
				'images/x7.png', 'images/x8.png', 'images/x9.png',
			];
			//设置图片出现的位置
			var offset = [{
					left: '94px',
					top: '113px'
				},
				{
					left: '17px',
					top: '159px'
				},
				{
					left: '14px',
					top: '220px'
				},
				{
					left: '28px',
					top: '294px'
				},
				{
					left: '186px',
					top: '142px'
				},
				{
					left: '100px',
					top: '192px'
				},
				{
					left: '117px',
					top: '274px'
				},
				{
					left: '197px',
					top: '211px'
				},
				{
					left: '204px',
					top: '295px'
				},
			]
			//创建随机数，给图片定位
			var getrandom = Math.floor(Math.random() * 9);
			//创建随机数，出现不同人物
			// var getrandom1 = Math.round(Math.random()) == 0 ? hui : xiaohui;
			var num = Math.round(Math.random());
			var getrandom1 = num== 0 ? hui : xiaohui;
			// 创建图片
			var $img = $("<img src=''/>");
			$img.attr('class','num'+num);
			//设定图片定时器
			window.index=0;
			window.wolfindex=5
			getclert = setInterval(function() {
				if (index == wolfindex) {
					//删除图片
					$img.remove();
					//关掉进度条计时器
					clearInterval(times);
					//关闭进度条计时器
					clearInterval(getclert);
					//继续做下一个动画
					settime();
				}
				$img.attr('src', getrandom1[index]);
				index++;
			}, 140);
			//给图片定位
			$img.css({
				position: 'absolute',
				left: offset[getrandom].left,
				top: offset[getrandom].top
			})
			//添加图片
			$('.img-bg').append($img);
			//添加拍打方法
			gamepapapa($img);
	}
	function gamepapapa($img){
		$img.one('click',function(){
			//修改索引
			window.index=5;
			window.wolfindex=9;
			//获取类名
			var name = $(this).attr('class')
			//判断是灰太狼还是小灰灰
			//设定分数
			window.sum = 0;
			if(name=='num0'){
				//每次点击加10
				$('.score').text(parseInt($('.score').text())+10);
			}else{
				//每次点击加-10
				$('.score').text(parseInt($('.score').text())-10);
			}
		})
	}
	//点击重新开始就开启游戏
	$('.over-game>button').click(function() {
		//分数重置
		$('.score').text(0);
		//启动时间进度条
		settime();
		
		//隐藏重新开始蒙版
		$('.over-game').hide();
		//隐藏游戏规则蒙版
		$('.rule-game').hide();
	});
	//显示规则蒙版
	$('.rule>input').click(function(even) {
		$('.rule-game').fadeIn(200);
	});
	//隐藏规则蒙版
	$('.rule-game>ul>li>a').click(function() {
		$('.rule-game').fadeOut(200);
	});
	//点击开始游戏，时间进度条就运行
	$('.start').click(function() {
		//分数重置
		$('.score').text(0);
		settime();
		$(this).hide();
		// 操作input的属性节点,disabled为true表示不可用
		$('.rule>input').prop('disabled', true);
		// $('.rule>input').attr('disabled',true);
	});
})
