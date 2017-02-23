/**
 * @Author: 毛毛
 * @Email: kasuozhiyi@qq.com
 * @version: 2.5
 * @Discription: 东发超蒸发成员花名册插件
 */

;(function ($){

	var _roster = {

		//页面初始化，生成DOM
		init:function(cntr,conf,cssflag){

			//创建DOM
			$(conf).each(function(){
				var str;
				var div_e = '</div>';
				var span_e = '</span>';
				var rimg = '';
				var rc = '';
				var rinfo = '';
				var rnc = '';
				var rni = '';
				var rkc = '';
				var rki = '关键字：';
				var rnn = '其他ID：';
				var rs = '性倾向：';
				var rd = '';
				str = '<div id="roster_'+this.id+'" class="roster_container">';
				rimg = '<div class="roster_img"><img src="'+this.thumurl+'"/></div>';
				rnc = '<div class="roster_classic"><div class="roster_name">'+this.name+div_e;
			
				for(i=0;i<4;i++){
					if(this.keywords[i]){
						rkc+=('<div class="roster_keywords">'+this.keywords[i]+div_e);
						if(i==this.keywords.length){
							rki+=this.keywords[i];
						}
						else{
							rki+=this.keywords[i]+'、';
						}
					}
					else{
						rkc+=('<div class="roster_keywords"></div>');
					}	
				}
				rc = rnc + rkc + div_e;

				rni = '<div class="roster_info"><span class="roster_name">核心ID：'+this.name+span_e;
				for(j=0;j<this.nickname.length;j++){
					if(j<this.nickname.length-1){
						rnn+=(this.nickname[j]+'、');
					}
					else{
						rnn+=this.nickname[j];
					}
				}
				rnn = '<span class="roster_nicknames">'+rnn+span_e;
				rki = '<span class="roster_keywords">'+rki+span_e;
				rs = '<span class="roster_sexuality"> 性倾向：'+this.sexuality+span_e;
				rd = '<p class="roster_discription">'+this.discription+'</p>';

				rinfo = rni+rnn+rki+rs+rd+div_e;

				str += rimg+rc+rinfo+div_e;

				$(cntr).append(str);
			});
			
		},

		//经典视图
		classicList:function(cntr){

			var me = $(cntr).find('.roster_container');
			//检查当前状态
			if(!me.data('status')){
				me.data('status','classic');
			}
			if(me.data('status') == 'detail'){
				_roster.transition(me.find('.roster_info'),{width:0,right:0,opacity:0},0.4,0,'ease');
				_roster.transition(me.find('.roster_img'),{padding:0,'box-shadow':'none',border:'none'},0.4,0,'ease')
			}
			function _boxArrang(){
				var window_h = $(window).height()-180-40;//顶部工具条留出足够空间
				var window_w = $(window).width()-180;

				//动画开始设置z-index,使其处于顶层
				function _transStart(dom,zIndex){

					var $dom = $(dom);
					$dom.css('z-index',zIndex);
				}

				//动画结束时恢复动画执行前的z-index
				function _transEnd(dom,zIndex){

					var $dom = $(dom);
					$dom.css('z-index',zIndex);
				}

				me.each(function(){
					var $this = $(this);
					var z_left = parseInt(window_w*Math.random());
					var z_top = parseInt(window_h*Math.random())+40;//顶部工具条留出足够空间
					var z_index = parseInt(100*Math.random());
					var i = parseInt(60*Math.random())+330;
					var s = "rotate(" + i + "deg)";	
					$this.css({"z-index":z_index});//记录当前文件

					_roster.transition($this,{"top":z_top + "px","left":z_left,"transform":s,padding:1,'box-shadow':' 2px 2px 4px #999',border:'#ccc 1px solid'},0.4,0,'ease');

					_roster.drag.init($this,z_index);

					//为图片加载鼠标悬停与离开动画

					$this.mouseover(function(){

						z_top = parseInt($this.css('top'));
						z_left = parseInt($this.css('left'));
						_roster.transition($this,{left:z_left,top:z_top,width:'256px',height:'256px','transform':'rotate(360deg)','box-shadow':' 4px 4px 8px #999'},0.2,0,'ease');
						_roster.transition($this.find('img'),{width:'256px',height:'256px'},0.2,0,'ease',_transStart($this,999));
						_roster.transition($this.find('.roster_classic'),{height:'258px',opacity:1,right:-150,'box-shadow':' 4px 4px 8px #999'},0.1,0.2,'ease');
					}).mouseleave(function(){

						z_top = parseInt($this.css('top'));
						z_left = parseInt($this.css('left'));
						_roster.transition($this,{left:z_left,top:z_top,width:'167px',height:'167px','transform':s,'box-shadow':' 2px 2px 4px #999'},0.2,0,'ease');
						_roster.transition($this.find('img'),{width:'167px',height:'167px'},0.2,0,'ease','',_transEnd($this,z_index));
						_roster.transition($this.find('.roster_classic'),{height:'0px',opacity:0,right:0,'box-shadow':' 2px 2px 4px #999'},0.1,0,'ease');
					}).click(function(){

						z_top = parseInt($this.css('top'));
						z_left = parseInt($this.css('left'));
						_roster.transition($this,{left:z_left,top:z_top,width:'167px',height:'167px','transform':s,'box-shadow':' 2px 2px 4px #999'},0.2,0,'ease');
						_roster.transition($this.find('img'),{width:'167px',height:'167px'},0.2,0,'ease','',_transEnd($this,z_index));
						_roster.transition($this.find('.roster_classic'),{height:'0px',opacity:0,right:0,'box-shadow':' 2px 2px 4px #999'},0.1,0,'ease');
					});
	
				});

			}
			
			_boxArrang();
			
		},
		photoList:{
			init: function(cntr){

				var me = $(cntr).find('.roster_container');
				var delay = 0;
				//检查当前状态
				if(!me.data('status')){
					me.data('status','photo');
				}
				me.unbind('mouseover').unbind('mouseleave').unbind('click');
				_roster.drag.destroy(me);
				me.each(function(){
					var $this = $(this);
					delay += 0.1;
					_buildMtrix($this,8,8,delay,'out');
				});
				function _buildMtrix(dom,row,col,delay,inOrOut){
					var imgArray = [];
					var $dom = $(dom).find('.roster_img');
					var mtrH = 167/row;
					var mtrW = 167/col;
					var zIndex = 0;

					var bg_url = 'url(' + $dom.find('img').attr('src') + ')';

					//生成方阵
					for(i=0;i<row;i++){
						imgArray[i] = new Array();
						for(j=0;j<col;j++){
							$dom.append('<div class="img_'+i+'_'+j+'"></div>');
							
							imgArray[i][j] = $dom.find(".img_"+i+"_"+j);
							imgArray[i][j].css({
								"position":"absolute",
								"background-position":-mtrW*j+"px "+-mtrH*i+"px",
								"background-size":"167px 167px",
								"left":	mtrW*j,
								"top":mtrH*i,
								"height":mtrH,
								"width":mtrW,
								"background-image":bg_url,
								"z-index":zIndex++
							});
						}
					}
					setTimeout(function(){$(dom).addClass('roster_cntr_photolist_out')},200);
					_roster.transition($dom,{'box-shadow':'none','border':'none'},0.2,0,'ease');
					_roster.transition($(dom),{'box-shadow':'none','border':'none'},0.2,0,'ease');


					if(inOrOut == 'out'){

						$(imgArray).each(function(i){

							$(this).each(function(j){

								var $this = $(this);
								var mleft = 550*Math.random()-150-mtrW;
								var mtop = 550*Math.random()-150-mtrH;
			
								while(mleft>=-50 && mleft<=300 && mtop>=-50 && mtop<=300){

									mleft = 550*Math.random()-150-mtrW;
									mtop = 550*Math.random()-150-mtrH;
								}
								$this.css("box-shadow","2px 2px 4px #999");
								function a(){
									_roster.transition($this,{'left':mleft,'top':mtop,'opacity':0},0.2,delay+Math.random(),'ease');
								}
								setTimeout(a,20);
							});
						});
						
					}


					
					function _destroymatrix(){
						$dom.find("div").remove();
					}
				
				}
			},
			easing: function(cntr){
				_roster.transition('.roster_img div',{left:20,top:50},0.4,0,'ease');
			}
		},

		//详细信息视图
		detailList:function(cntr){
			var img_delay;
			var info_delay;
			var z_left = ($('body').width()-1280)/2<=0 ? 10 : ($('body').width()-1280)/2 ;
			var me = $(cntr).find('.roster_container');
			//记录当前状态
			me.data('status','detail');
			//取消事件
			me.unbind('mouseover').unbind('mouseleave').unbind('click');
			_roster.drag.destroy(me);

			//随机排序
			me.sort(function () { return 0.5 - Math.random(); });
			me.each(function(i){
				var $this = $(this);
				var z_top = 50+i*90;
				if(i%2 == 0){

					img_delay = i*0.05;
					_roster.transition($this,{left:z_left,top:z_top,width:'167px',height:'167px','transform':'rotate(360deg)','box-shadow':'none',border:'none',padding:'0'},0.2,img_delay,'ease');
					_roster.transition($this.find('.roster_img'),{width:'167px',height:'167px','box-shadow':'2px 2px 4px #999',border:'#ccc 1px solid',padding:'1px'},0.2,img_delay,'ease');
					// _roster.transition($this.find('.roster_info'),{right:'-462px',width:'462px',opacity:1},0.2,info_delay,'ease-in');
				}

			});
			me.each(function(i){
				var $this = $(this);
				var z_top = 50+i*90-90;
				if(i%2 != 0){

					img_delay += 0.05;
					_roster.transition($this,{left:z_left+650,top:z_top,width:'167px',height:'167px','transform':'rotate(360deg)','box-shadow':'none',border:'none',padding:'0'},0.2,img_delay,'ease');
					_roster.transition($this.find('.roster_img'),{width:'167px',height:'167px','box-shadow':'2px 2px 4px #999',border:'#ccc 1px solid',padding:'1px'},0.2,img_delay,'ease');
					// _roster.transition($this.find('.roster_info'),{right:'-462px',width:'462px',opacity:1},0.2,info_delay,'ease-in');
				}
			});
			me.each(function(i){

				var $this = $(this);
				info_delay = img_delay+i*0.04;
				if(i%2 == 0){
					_roster.transition($this.find('.roster_info'),{right:'-462px',width:'462px',opacity:1},0.2,info_delay,'ease-in');
				}
			});

			me.each(function(i){

				var $this = $(this);
				info_delay = info_delay+0.04;
				if(i%2 != 0){
					_roster.transition($this.find('.roster_info'),{right:'-462px',width:'462px',opacity:1},0.2,info_delay,'ease-in');
				}
			});
		},

		//实现元素鼠标拖动，使用时请确保目标元素为绝对定位
		drag:{
			//加载拖动
			init:function(dom,zIndex){
				var box = $(dom);
				box.each(function(){
					var me = $(this);
					var mouseX;
					var mouseY;
					var boxPosX;
					var boxPosY;
					var boxZindex;

					//获取鼠标X坐标
					function _mousePosX(e){
						if(!document.all){ 
							return e.pageX; 
						}else{ 
							return document.documentElement.scrollLeft + event.clientX; 
						}
					}

					//获取鼠标Y坐标
					function _mousePosY(e){
						if(!document.all){ 
							return e.pageY; 
						}else{ 
							return document.documentElement.scrollTop + event.clientY; 
						}
					}
					me.mousedown(function(e,zIndex){
						mouseX = _mousePosX(e);
						mouseY = _mousePosY(e);
						boxPosX = parseInt(me.css('left'));
						boxPosY = parseInt(me.css('top'));
						boxZindex = zIndex;

						me.css({'z-index':'999',cursor:'move'});    //单击元素后使其处于最高层，不会被其他元素遮挡
						me.mousemove(function(e){
							me.css({left:boxPosX+_mousePosX(e)-mouseX,top:boxPosY+_mousePosY(e)-mouseY});
							return false;      //移除原生事件冒泡，以下同
						});

						//移动结束，移除mousemove事件
						me.mouseup(function(e){_dragend()}).mouseout(function(e){_dragend()});

						//动画结束时取消事件绑定
						function _dragend(){
							me.unbind('mousemove');
							me.css({'z-index':boxZindex,cursor:''});
							return false;
						}
						return false;
						
					});
				})
			},
			//取消拖动
			destroy:function(dom){
				var box = $(dom);
				box.each(function(){
					var me = $(this);
					me.unbind('mousedown');
				});
			}
		},

		//封装transition动画
		transition:function(dom,conf,time,wait,easing,bf,cb){
			
			var $dom = $(dom);

			//避免动画意外结束后，事件未取消绑定

			$dom.unbind('transitionend');

			//参数检查
			if(typeof(conf) != 'object'){
				alert('_roster.animation()第二参数必须是object！')
				return;
			}
			//动画开始前调用的函数
			if(typeof(bf) == 'function'){
					bf();
				}

			$dom.css('transition','all '+time+'s '+easing+' '+wait+'s');
			for(a in conf){
				$dom.css(a,conf[a]);
			}

			//监听动画结束并执行回调
			$dom.bind('transitionend',function(){

				$dom.unbind('transitionend');
				$dom.css('transition','');
				//动画执行完后回调函数
				if(typeof(cb) == 'function'){
					cb();
				}
			});

		}

	}
	$.fn.roster = function(conf){

		var cssflag = false;    //记录浏览器是否支持CSS3

		//参数合法性验证
		if(typeof(conf)!="object"){
				alert("$.fn.roster参数不合法！");
				return;
			}

		//检测浏览器是否支持CSS3
		for(var a in this[0].style){
			if(a=='transition' || a=='webkitTransition'){
				cssflag = true;
			}
			else{
				cssflag = false;
			}
		}
		//主函数开始
		return this.each(function(){
			var $this = $(this);
			_roster.init($this,conf,cssflag);
			
			_roster.classicList($this);

			$('#btn1').click(function(){
				_roster.classicList($this);
			});
			
			$('#btn2').click(function(){
				_roster.detailList($this);
			});
			
		})

			
	}
})(jQuery)


