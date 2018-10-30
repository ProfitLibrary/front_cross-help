//создаем JQuery функцию, которая будет подгружать изображения в буфер
jQuery.preloadImages = function()
 {
  for(var i = 0; i < arguments.length; i++)
  {
   jQuery("<img>").attr("src", arguments[ i ]);
  }
 };
 
//указываем путь к изображению, которое нужно подгрузить
$.preloadImages(
  "../image/Buttom_Main_menu/bm_0000s_0003_Buttom-on.png",
  "../image/Buttom_Main_menu/bm_0000s_0004_Buttom-2-click.png",
  "../image/Buttom_Menu_Fraction/button_cat_on.png",
  "../image/Buttom_Menu_Fraction/vse_on.png",
  "../image/Content/Element_Search/input_active.png",
  "../image/Content/Buttom_Category/Cab-on.png",
  "../image/Content/Buttom_Category/Cab-clik.png",
  "../image/Content/Buttom_Category/Canon-on.png",
  "../image/Content/Buttom_Category/Canon-clik.png",
  "../image/Content/Buttom_Category/Device-on.png",
  "../image/Content/Buttom_Category/Device-clik.png",
  "../image/Content/Buttom_Category/Acesories-on.png",
  "../image/Content/Buttom_Category/Acesories-clik.png",
  "../image/Content/Buttom_Category/Cover-on.png",
  "../image/Content/Buttom_Category/Cover-clik.png",
  "../image/Content/Buttom_Category/Wheel-on.png",
  "../image/Content/Buttom_Category/Wheel-clik.png",
  "../image/Content/Buttom_Category/Ink-on.png",
  "../image/Content/Buttom_Category/Ink-clik.png",
  "../image/Content/Buttom_Category/Resource-on.png",
  "../image/Content/Buttom_Category/Resource-clik.png",
  "../image/Content/Buttom_Category/All-on.png",
  "../image/Content/Buttom_Category/All-clik.png",
  "../image/Content/Buttom_Category/Common-on.png",
  "../image/Content/Buttom_Category/Common-clic.png",
  "../image/Content/Buttom_Category/Rare-on.png",
  "../image/Content/Buttom_Category/Rare-clic.png",
  "../image/Content/Buttom_Category/Epic-on.png",
  "../image/Content/Buttom_Category/Epic-clic.png",
  "../image/Content/Buttom_Category/Legendary-on.png",
  "../image/Content/Buttom_Category/Legendary-clic.png",
  "../image/Content/Buttom_Category/Relic-on.png",
  "../image/Content/Buttom_Category/Relic-clic.png",
  "../image/Content/Table_ico/Ico-arrow-grey-on.png",
  "../image/Content/Table_ico/Ico-arrow-grey-clik.png",
  "../image/Content/Under_table_menu/Ico-fast-list-left-on.png",
  "../image/Content/Under_table_menu/Ico-fast-list-left-clik.png",
  "../image/Content/Under_table_menu/Fast-List-right-on.png",
  "../image/Content/Under_table_menu/Fast-List-right-off.png",
  "../image/Content/Under_table_menu/Ico-list-left-standart-on.png",
  "../image/Content/Under_table_menu/Ico-list-left-standart-off.png",
  "../image/Content/Under_table_menu/List-right-ico-on.png",
  "../image/Content/Under_table_menu/List-right-ico-off.png",
  "../image/Content/Under_table_menu/Buttom-1-on.png",
  "../image/Content/Under_table_menu/Buttom-1-clik.png",
  "../image/Content/Under_table_menu/clear_on.png",
  "../image/Content/Under_table_menu/clear_clik.png",
  "img",  

);