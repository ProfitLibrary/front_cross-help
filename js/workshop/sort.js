$(document).ready(function(){		
	jQuery.expr[":"].Сontains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});
	function sort(first){
		var tr_elem = $('tr.fraction_table__item');
		var search_input = $('input#regexp');
		function getUrlVars(){
			var vars = {};
			var parts = window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value.split(',');
			});
			return vars;
		}
		function setUrl(url_param){ 
			var str = ''; 
			for(var i in url_param){
				if(url_param[i].length>0 && url_param[i]!=''){
					url_param[i] = url_param[i].filter(function(n){ return n != undefined });
					url_param[i] = url_param[i].filter(function(n){ return n != '' });
					if(str==''){
						str = i + '=' +url_param[i].join(',');
					} else {
						str = str + '&' + i + '='+url_param[i].join(',');
					}				
				}				
			}
			if(str!=''){
				location.href = '#' + str;
			} else {
				location.href = '#index';
			}
		}
		//сама сортировка
		var search = [];
		var tttt = 0;
		var url = {};
		var vars = getUrlVars();

		url['Search'] = [];
		if(first==1){
			//код получение списка с строки url
			for(var i in vars['Search']){
				search_input.val(decodeURI(vars['Search'][i]));				
			}
			//конец получения списка со строки url
		}
		if(search_input.val()!=''){
			tttt++;
			search.push(':Сontains("'+search_input.val()+'")');
			url['Search'].push(search_input.val());
		}
		var elem = tr_elem;
		var str1 ='';
		if(tttt>0){
			if(search.length>0) elem = $(elem).filter(search[0]);
			if(str1!=""){ 
				elem = $(elem).filter(str1);
			}
			str1='';
			if(str1!=""){ 
				elem = $(elem).filter(str1);
			}
			str1='';
			if(str1!=""){ 
				elem = $(elem).filter(str1);
			}
		}
		
		render(ele);
		setUrl(url);
		function render(elem,limit,offset){
			// $('tr.fraction_table__item').hide();
			$(elem).each(function(i){ 
				if(i<(limit*offset) && i>=(limit*offset)-limit){
					$(this).show();					
				} else {
					$(this).hide();	
				}
			});
			var pp = Math.ceil(elem.length/limit);;
			var rt = 5;
			
			var r1 = (offset-2>=1)?2:offset-1;
			var r2 = ((parseInt(offset)+2)<=pp)?2:pp-offset; 
			r1 = (r2-2<0)?2-r2+r1:r1; 
			r2 = (r1-2<0)?2-r1+r2:r2; 
		}
	}
	$('th.fraction_thead[data-name="name"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				var an = $(a).find('.td_name>div.td_name_text>div').html();
				var bn = $(b).find('.td_name>div.td_name_text>div').html();
				if (an && bn) {
					return bn.toUpperCase().localeCompare(an.toUpperCase());
				}
				return 0;			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				var an = $(b).find('.td_name>div.td_name_text>div').html();
				var bn = $(a).find('.td_name>div.td_name_text>div').html();
				if (an && bn) {
					return bn.toUpperCase().localeCompare(an.toUpperCase());
				}
				return 0;			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Buy"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Buy"]>span').html()) - parseFloat($(a).find('td[data-name="Buy"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Buy"]>span').html()) - parseFloat($(b).find('td[data-name="Buy"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Sell"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Sell"]>span').html()) - parseFloat($(a).find('td[data-name="Sell"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Sell"]>span').html()) - parseFloat($(b).find('td[data-name="Sell"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Buy_Price"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Buy_Price"]>span').html()) - parseFloat($(a).find('td[data-name="Buy_Price"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Buy_Price"]>span').html()) - parseFloat($(b).find('td[data-name="Buy_Price"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Sell_Price"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Sell_Price"]>span').html()) - parseFloat($(a).find('td[data-name="Sell_Price"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Sell_Price"]>span').html()) - parseFloat($(b).find('td[data-name="Sell_Price"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Profit_sell"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Profit_sell"]>span').html()) - parseFloat($(a).find('td[data-name="Profit_sell"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Profit_sell"]>span').html()) - parseFloat($(b).find('td[data-name="Profit_sell"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('th.fraction_thead[data-name="Profit_buy"]').click(function(){
		$('th.fraction_thead>a').removeClass('fraction_table__a--active');
		$(this).find('a').addClass('fraction_table__a--active');
		if($(this).find('button').hasClass('thead_button--active')){
			$(this).find('button').removeClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('td[data-name="Profit_buy"]>span').html()) - parseFloat($(a).find('td[data-name="Profit_buy"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(this).find('button').addClass('thead_button--active');
			$('tr.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('td[data-name="Profit_buy"]>span').html()) - parseFloat($(b).find('td[data-name="Profit_buy"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('.form_button').click(function(){
		sort();
	});
	sort(1);
});