;
$(document).ready(function(){
  var $MasPersent = $("[data-percent]");
  for (var i = 0; i < $($MasPersent).length; i++) { //перебираем все эл-ты .percent
    var $value = $($("[data-percent]")[i]).attr("data-percent"); // массив значений атрибута data-percent
    $($($MasPersent[i]).find(".progress_bar__filling")[parseInt($value / 10)]).css( "width", (($value % 10)*10)+"%"); // закрашиваем нужную ячейку на n процентов 
    for (var j = parseInt($value / 10) + 1; j < 10; j++) {
       $($($MasPersent[i]).find(".progress_bar__filling")[j]).css( "width", "0%" ); // очищаем оставшиеся ячейки
    }  
  }
  $(".item_peculiarity__more").click(function() {
    if($(".item_main_characteristics").css("visibility") == "hidden"){
      $(".item_main_characteristics").css("visibility", "visible");
    }
    else{
      $(".item_main_characteristics").css("visibility", "hidden");
    }
  });
});


