$(function() {

	var _whichInput, _whichType

	$(document).click(function(e) {

		// 点击任何地方都隐藏
		$('#Jkeyboard').hide()
		// 页面变回原来的高度
		$('html').css('height', 'auto')
	})

	function Jkeyboard(input, type) {
		// 哪一个input被选中
		var _input = input
		// 选中的是什么类型
		var _type = type
		// 记录页面原来的高度
		var _htmlHeight = $('html').height();
		
		// 虚拟键盘
		function addJkeyboardDOM() {
			$('body').append('<ul id="Jkeyboard">\
					<li>1</li>\
					<li>2</li>\
					<li>3</li>\
					<li>4</li>\
					<li>5</li>\
					<li>6</li>\
					<li>7</li>\
					<li>8</li>\
					<li>9</li>\
					<li>.</li>\
					<li>0</li>\
					<li class="Jkeyboard-delete">删除</li>\
					</ul>')
		}

		// 格式化数据
		function format(val, type) {
			switch(type) {
				// 银行【每4个数字空一格】
				case 'bank': return val.replace(/[^0-9]|\s/g,'').substr(0, 18).replace(/([0-9]{4})/g,'$1 ')
				// 手机号
				case 'phone': return val.replace(/[^0-9]|\s/g,'').substr(0, 11).substr(0, 11)
				// 金额，保留两位小数
				case 'money': return val.replace(/^0{2,}/,'0').replace(/^\./g,'0.').replace(/\.{2,}/,'.').replace(/([0-9]*\.[0-9]{2}).*$/,'$1')
				default: return val.replace(/[^0-9]|\s/g,'')
			}
		}

		// 删除键
		function deleteTab(val, type) {
			switch(type) {
				// 银行
				case 'bank': return val.replace(/[^0-9]|\s/g,'').substr(0, val.replace(/[^0-9]|\s/g,'').length - 1).replace(/([0-9]{4})/g,'$1 ')
				// 手机号
				case 'phone': return val.replace(/[^0-9]|\s/g,'').substr(0, val.length - 1)
				// 金额
				case 'money': return val.substr(0, val.length - 1);
				default: return val.substr(0, val.length - 1)
			}
		}

		$(_input).click(function(e) {
			// 阻止冒泡
			e.stopPropagation()
			
			// 哪一个input被选中
			_whichInput = this
			// 选中的是什么类型
			_whichType = _type

			// 没有虚拟键盘的时候append
			if($('#Jkeyboard')[0] === undefined) {
				// append
				addJkeyboardDOM()

				// 阻止冒泡
				$('#Jkeyboard').click(function(e) {
					e.stopPropagation()
				})
				
				// 不是删除键事件
				$('#Jkeyboard li:not(.Jkeyboard-delete)').click(function() {
					// input里原有的值 + 新输入的值
					var _val = $(_whichInput).val() + $(this).text()
					// 格式化
					$(_whichInput).val(format(_val, _whichType))
				})

				// 删除键事件
				$('#Jkeyboard li.Jkeyboard-delete').click(function() {
					// input里原有的值
					var _val = $(_whichInput).val()
					// 删除一格
					$(_whichInput).val(deleteTab(_val, _whichType))
				})
			}
			// 页面增加高度(输入框的高度) 防止挡住某些区域
			$('html').height(_htmlHeight + $('#Jkeyboard').height() + 20)
			$('#Jkeyboard').show()
		})

	}
})