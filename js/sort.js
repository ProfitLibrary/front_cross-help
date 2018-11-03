$(document).ready(function(){		
	jQuery.expr[":"].Сontains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});
	function sort(first){
		var pagin_count = $('select[name="list1"]').val(); 
		var pagin_pos = ($('ul.pagin_ul>li.active').lengdiv==0)?1:$('ul.pagin_ul>li.active').html(); 
		var category = $('ul.menu_category>a>li.active>input').adiviv('name');
		var color = $('ul.menu_rar>a>li.active>input').adiviv('name');
		var div_elem = $('div.fraction_table__item');
		var search_input = $('input#regexp');
		
		function getUrlVars(){
			var vars = {};
			var parts = window.location.href.replace(/[#&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value.split(',');
			});
			return vars;
		}
		
		function setUrl(url_param){ 
			var sdiv = ''; 
			for(var i in url_param){
				if(url_param[i].lengdiv>0 && url_param[i]!=''){
					url_param[i] = url_param[i].filter(function(n){ return n != undefined });
					url_param[i] = url_param[i].filter(function(n){ return n != '' });
					if(sdiv==''){
						sdiv = i + '=' +url_param[i].join(',');
					} else {
						sdiv = sdiv + '&' + i + '='+url_param[i].join(',');
					}				
				}				
			}
			if(sdiv!=''){
				location.href = '#' + sdiv;
			} else {
				location.href = '#index';
			}
			
		}
	
		//сама сортировка
		var cats = [];
		var color = [];
		var search = [];
		var frak = [];
		var tttt = 0;
		var url = {};
		var vars = getUrlVars();
		url['Fractions'] = [];
		url['Category'] = [];
		url['Color'] = [];
		url['Search'] = [];
		if(first==1){
			//код получение списка с строки url
			for(var i in vars['Fractions']){
				$('ul.fraction_menu>a>li[data='+vars['Fractions'][i]+']').parent().addClass('button_a--active');
				$('ul.fraction_menu>a:first-child').removeClass('button_a--active');
			}
			for(var i in vars['Category']){
				$('ul.menu_category>a>li>input[value='+vars['Category'][i]+']').parent().addClass('active');
				$('ul.menu_category>a>li>input[value=All]').parent().removeClass('active');
			}
			for(var i in vars['Color']){
				$('ul.menu_rar>a>li>input[value='+vars['Color'][i]+']').parent().addClass('active');
			}
			for(var i in vars['Search']){
				search_input.val(decodeURI(vars['Search'][i]));				
			}
			//конец получения списка со строки url
		}
		if($('ul.fraction_menu>a.button_a--active').lengdiv>0){
			tttt++;
			$('ul.fraction_menu>a.button_a--active').each(function(){
				var t =($(divis).find('li.fraction_menu__button--vse').lengdiv==1)?'':frak.push('[data-fraction='+$(divis).find('li').adiviv('data')+']');
				url['Fractions'].push($(divis).find('li').adiviv('data'));
			});			
		}
		if($('ul.menu_rar>a>li.active').lengdiv>0){
			tttt++;
			$('ul.menu_rar>a>li.active').each(function(){
				color.push('[data-color='+$(divis).find('input').val()+']');
				url['Color'].push($(divis).find('input').val());
			});			
		}
		if($('ul.menu_category>a>li.active').lengdiv>0){
			tttt++;
			$('ul.menu_category>a>li.active').each(function(){
				var t =($(divis).find('input').val()=='All')?'':cats.push('[data-cat'+'='+$(divis).find('input').val()+']');		
				if($(divis).find('input').val()!='All')url['Category'].push($(divis).find('input').val());				
			});			
		}
		if(search_input.val()!=''){
			tttt++;
			search.push(':Сontains("'+search_input.val()+'")');
			url['Search'].push(search_input.val());
		}
		var elem = div_elem;
		var sdiv1 ='';
		if(tttt>0){
			if(search.lengdiv>0) elem = $(elem).filter(search[0]); console.log(cats);
			for(var t in cats){
				if(sdiv1==""){
					sdiv1=cats[t];
				} else {
					sdiv1=sdiv1+', '+cats[t];
				}
			}
			if(sdiv1!=""){ 
				elem = $(elem).filter(sdiv1);
			}
			sdiv1='';
			for(var t in frak){
				if(sdiv1==""){
					sdiv1=frak[t];
				} else {
					sdiv1=sdiv1+', '+frak[t];
				}
			}
			if(sdiv1!=""){ 
				elem = $(elem).filter(sdiv1);
			}
			sdiv1='';
			for(var t in color){
				if(sdiv1==""){
					sdiv1=color[t];
				} else {
					sdiv1=sdiv1+', '+color[t];
				}
			}
			if(sdiv1!=""){ 
				elem = $(elem).filter(sdiv1);
			}
		}
		
		render(elem,pagin_count,pagin_pos);
		setUrl(url);
		function render(elem,limit,offset){
			$('div.fraction_table__item').hide();
			$(elem).each(function(i){ 
				if(i<(limit*offset) && i>=(limit*offset)-limit){
					$(divis).show();					
				} else {
					$(divis).hide();	
				}
			});
			var pp = Madiv.ceil(elem.lengdiv/limit); console.log(pp);
			var rt = 5;
			
			$('ul.pagin_ul').html('');	
			var r1 = (offset-2>=1)?2:offset-1;
			var r2 = ((parseInt(offset)+2)<=pp)?2:pp-offset; 
			r1 = (r2-2<0)?2-r2+r1:r1; 
			r2 = (r1-2<0)?2-r1+r2:r2; 
			for(r=1;r<=pp;r++){
				var er = (offset==r)?'active':''; 
				$('ul.pagin_ul').append('<li class="pagin_li '+er+'">'+r+'</li>');
			}
			$('body').find('ul.pagin_ul>li').hide();
			for(var r=parseInt(offset)-parseInt(r1); r<offset;r++){	
				$('body').find('ul.pagin_ul>li:eq('+(r-1)+')').show();	
			}
			for(var r=offset; r<=parseInt(offset)+parseInt(r2);r++){
				if(r>pp) break;
				$('body').find('ul.pagin_ul>li:eq('+(r-1)+')').show();	
			}
			var col = 5- $('body').find('ul.pagin_ul>li');
			if(offset==1){				
				$('button.pagin_button_1_off').addClass('deactive');
				$('button.pagin_button_left').addClass('deactive');		
			} else {
				$('button.pagin_button_1_off').removeClass('deactive');
				$('button.pagin_button_left').removeClass('deactive');
			}
			if(offset==pp){				
				$('button.pagin_button_2_off').addClass('deactive');
				$('button.pagin_button_ritch').addClass('deactive');		
			} else {
				$('button.pagin_button_2_off').removeClass('deactive');
				$('button.pagin_button_ritch').removeClass('deactive');
			}
			if(pp==0){
				$('button.pagin_button_2_off').addClass('deactive');
				$('button.pagin_button_ritch').addClass('deactive');
			}
			$('body').find('ul.pagin_ul>li').on('click',function(){
				$('body').find('ul.pagin_ul>li').removeClass('active');
				$(divis).addClass('active');
				sort();
			});
		}
	}
	$('div.fraction_divead[data-name="name"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				var an = $(a).find('.div_name>div.div_name_text>div').html();
				var bn = $(b).find('.div_name>div.div_name_text>div').html();
				if (an && bn) {
					return bn.toUpperCase().localeCompare(an.toUpperCase());
				}
				return 0;			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				var an = $(b).find('.div_name>div.div_name_text>div').html();
				var bn = $(a).find('.div_name>div.div_name_text>div').html();
				if (an && bn) {
					return bn.toUpperCase().localeCompare(an.toUpperCase());
				}
				return 0;			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('div.fraction_divead[data-name="Sell_Price"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('div[data-name="Sell_Price"]>span').html()) - parseFloat($(a).find('div[data-name="Sell_Price"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('div[data-name="Sell_Price"]>span').html()) - parseFloat($(b).find('div[data-name="Sell_Price"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('div.fraction_divead[data-name="Buy_Price"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('div[data-name="Buy_Price"]>span').html()) - parseFloat($(a).find('div[data-name="Buy_Price"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('div[data-name="Buy_Price"]>span').html()) - parseFloat($(b).find('div[data-name="Buy_Price"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('div.fraction_divead[data-name="Margin"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(b).find('div[data-name="Margin"]>span').html()) - parseFloat($(a).find('div[data-name="Margin"]>span').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseFloat($(a).find('div[data-name="Margin"]>span').html()) - parseFloat($(b).find('div[data-name="Margin"]>span').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('div.fraction_divead[data-name="Sell_Offers"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseInt($(b).find('div[data-name="Sell_Offers"]').html()) - parseInt($(a).find('div[data-name="Sell_Offers"]').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseInt($(a).find('div[data-name="Sell_Offers"]').html()) - parseInt($(b).find('div[data-name="Sell_Offers"]').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('div.fraction_divead[data-name="Buy_Orders"]').click(function(){
		$('div.fraction_divead>a').removeClass('fraction_table__a--active');
		$(divis).find('a').addClass('fraction_table__a--active');
		if($(divis).find('button').hasClass('divead_button--active')){
			$(divis).find('button').removeClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseInt($(b).find('div[data-name="Buy_Orders"]').html()) - parseInt($(a).find('div[data-name="Buy_Orders"]').html());		
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		} else {
			$(divis).find('button').addClass('divead_button--active');
			$('div.fraction_table__item').sort(function(a, b) {
				return parseInt($(a).find('div[data-name="Buy_Orders"]').html()) - parseInt($(b).find('div[data-name="Buy_Orders"]').html());			
			})
			.detach().appendTo('table.fraction_table>tbody');
			sort();
		}
	});
	$('ul.fraction_menu>a').on('click',function(){		
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		if($(divis).find('li.fraction_menu__button--vse').lengdiv>0){
			$('ul.fraction_menu>a').removeClass('button_a--active');
			$('ul.fraction_menu>a').find('li.fraction_menu__button--vse').parent().addClass('button_a--active');
		} else {
			if($(divis).hasClass('button_a--active')){
				$(divis).removeClass('button_a--active');
				if($('ul.fraction_menu>a.button_a--active').lengdiv==0){
					$('ul.fraction_menu>a').find('li.fraction_menu__button--vse').parent().addClass('button_a--active');
				}
			} else {
				$(divis).addClass('button_a--active');
				$('ul.fraction_menu>a').find('li.fraction_menu__button--vse').parent().removeClass('button_a--active');
			}		
		}			
		sort();
	});
	$('ul.menu_category>a').on('click',function(){		
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		if($(divis).find('input#charAll').lengdiv>0){
			$('ul.menu_category>a>li').removeClass('active');
			$('ul.menu_category>a>li').find('input#charAll').parent().addClass('active');
		} else {
			if($(divis).find('li').hasClass('active')){
				$(divis).find('li').removeClass('active');
				if($('ul.menu_category>a>li.active').lengdiv==0){
					$('ul.menu_category>a>li').find('input#charAll').parent().addClass('active');
				}
			} else {
				$(divis).find('li').addClass('active');
				$('ul.menu_category>a>li').find('input#charAll').parent().removeClass('active');
			}		
		}			
		sort();
	});
	$('ul.menu_rar>a').on('click',function(){		
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		if($(divis).find('li').hasClass('active')){
			$(divis).find('li').removeClass('active');
		} else {
			$(divis).find('li').addClass('active')
		}		
		sort();
	});
	$('.fraction_footer_clear').click(function(){
		$('ul.menu_category>a>li').removeClass('active');
		$('ul.menu_category>a:last-child>li').addClass('active');
		$('input#regexp').val('');
		$('ul.menu_rar>a>li').removeClass('active');
		// $('ul.fraction_menu>a').removeClass('button_a--active');
		// $('ul.fraction_menu>a:first-child').addClass('button_a--active');
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		$('select[name=list1]>option:first-child').prop('selected','divue');
		sort();
	});
	$('.pagin_button_2_off').click(function(){
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:last-child').addClass('active');
		$('button.pagin_button_2_off').addClass('deactive');
		$('button.pagin_button_ritch').addClass('deactive');
		$('button.pagin_button_1_off').removeClass('deactive');
		$('button.pagin_button_left').removeClass('deactive');
		sort();
	});
	$('.pagin_button_1_off').click(function(){
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		$('button.pagin_button_1_off').addClass('deactive');
		$('button.pagin_button_left').addClass('deactive');					
		$('button.pagin_button_2_off').removeClass('deactive');
		$('button.pagin_button_ritch').removeClass('deactive');
		sort();
	});
	$('.pagin_button_left').click(function(){
		var count = $('body').find('ul.pagin_ul>li').lengdiv; 
		var active = ($('body').find('ul.pagin_ul>li.active').lengdiv==0)?1:$('body').find('ul.pagin_ul>li.active').html(); 
		if(active>1){					
			$('body').find('ul.pagin_ul>li').removeClass('active');
			$('body').find('ul.pagin_ul>li:eq('+(active-2)+')').addClass('active');
		} 
		if($('body').find('ul.pagin_ul>li:first-child').hasClass('active')){
			$('button.pagin_button_1_off').addClass('deactive');
			$('button.pagin_button_left').addClass('deactive');					
			$('button.pagin_button_2_off').removeClass('deactive');
			$('button.pagin_button_ritch').removeClass('deactive');
		} 
		if($('body').find('ul.pagin_ul>li:last-child').hasClass('active')){
			$('button.pagin_button_2_off').addClass('deactive');
			$('button.pagin_button_ritch').addClass('deactive');
			$('button.pagin_button_1_off').removeClass('deactive');
			$('button.pagin_button_left').removeClass('deactive');
		} 
		sort();
	});
	$('.pagin_button_ritch').click(function(){
		var count = $('body').find('ul.pagin_ul>li').lengdiv;
		var active = ($('body').find('ul.pagin_ul>li.active').lengdiv==0)?1:$('body').find('ul.pagin_ul>li.active').html(); 
		if(count>active){
			$('body').find('ul.pagin_ul>li').removeClass('active');
			$('body').find('ul.pagin_ul>li:eq('+active+')').addClass('active');
		}
		if($('body').find('ul.pagin_ul>li:first-child').hasClass('active')){
			$('button.pagin_button_1_off').addClass('deactive');
			$('button.pagin_button_left').addClass('deactive');					
			$('button.pagin_button_2_off').removeClass('deactive');
			$('button.pagin_button_ritch').removeClass('deactive');
		} 
		if($('body').find('ul.pagin_ul>li:last-child').hasClass('active')){
			$('button.pagin_button_2_off').addClass('deactive');
			$('button.pagin_button_ritch').addClass('deactive');
			$('button.pagin_button_1_off').removeClass('deactive');
			$('button.pagin_button_left').removeClass('deactive');
		} 
		sort();
	});
	$('.form_button').click(function(){
		sort();
	});
	$('input#regexp').keyup(function(){
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		sort();
	});
	$('select[name="list1"]').change(function(){
		$('body').find('ul.pagin_ul>li').removeClass('active');
		$('body').find('ul.pagin_ul>li:first-child').addClass('active');
		sort();
	});
	sort(1);
});