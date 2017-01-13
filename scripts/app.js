;(function($){
	var keys={
		ENTER:13,
		ESCAPE:27,
		SPACE:32,
		UP:38,
		DOWN:40,
		BACKSPACE:8
	};

	// 点按钮搜索
	$('.btn-search').on('click',function(e){
		var kw = $('#keywords').val();
		kw = kw.trim();
		doSearch(kw);
	});

	// 按下Enter按键的时候，输入框不为空执行搜索
	$(document).on('keyup',function(e){
		if(e.keyCode == keys.ENTER){
			$('#keywords').blur();
			var kw = $('#keywords').val();
			kw = kw.trim();
			doSearch(kw);
		}
	});

	// 输入框输入关键字的时候，隔300ms执行搜索关键字，看是否有匹配的列表(auto complete)
	$('#keywords').on('keyup',function(e){
		e.preventDefault();
		if(e.keyCode != keys.ENTER && e.keyCode != keys.ESCAPE){
			var kw = this.value,_this = this;
			var selector = $('.t-list');
			
			self.timer && clearTimeout(self.timer);
			self.timer = setTimeout(function(){
				refresh(selector,kw);
			},300);
		}
	});

	// 从搜索出来的关键字列表，选择某一个填充到输入框
	$(document).on('click',function(e){
		e.preventDefault();
		// console.log(e.target);
		var el = $(e.target);
		if(el.hasClass('t-dom')){
			var kw = $('#keywords').val();
			if(/\w/g.test(kw)){
				$('#keywords').val(el.is('div')?el.html():el.find('div')[1].innerHTML);
			}else{
				$('#keywords').val(el.is('div')?el.html():el.find('div')[0].innerHTML);
			}
		}
		$('.t-list').html('');
	});


	// 搜索
	function doSearch(kw){
		// 这里执行搜索
		console.log('search '+kw+'...');
	}

	// 刷新关键字列表
	function refresh(selector,kw){
		var str = [];
		// C.service.search.tips({'key':kw}).then(function(res){
			
			// 测试数据
			var res = {
				"data":[
					{
						"tiptype":1, 
						"name":"广东", 
						"code":"guangdong" 
					},
					{
						"tiptype":2,
						"name":"广东", 
						"code":"guangdong" 
					},
					{
						"tiptype":1,
						"name":"广东", 
						"code":"guangdong" 
					},
					{
						"tiptype":1,
						"name":"广东", 
						"code":"guangdong" 
					},
					{
						"tiptype":1, 
						"name":"广西", 
						"code":"guangxi" 
					},
					{
						"tiptype":2,
						"name":"广西", 
						"code":"guangxi" 
					},
					{
						"tiptype":1,
						"name":"广西", 
						"code":"guangxi" 
					},
					{
						"tiptype":1,
						"name":"广西", 
						"code":"guangxi" 
					}
				],
				"err":0,
				"msg":""
			};

			if(res && res.data){
				for(var i=0;i<res.data.length;i++){
					str.push('<li class="t-item t-dom"><div class="cell name t-dom">'+res.data[i].name+'</div><div class="cell code t-dom">'+res.data[i].code+'</div></li>');
				}
				selector.html(str.join('')).show();
			}else{
				selector.html('').hide();
			}
		// });
	}


}(jQuery))