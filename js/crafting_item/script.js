;
$(document).ready(function(){
  var $MasPersent = $("[data-percent]");
  for (var i = 0; i < $($MasPersent).length; i++) {
    var $value = $($("[data-percent]")[i]).attr("data-percent");
    console.log(parseInt($value / 10)+"---"+($value % 10));
    $($($MasPersent[i]).find(".progress_bar__filling")[parseInt($value / 10)]).css( "width", (($value % 10)*10)+"%");
    for (var j = parseInt($value / 10) + 1; j < 10; j++) {
       $($($MasPersent[i]).find(".progress_bar__filling")[j]).css( "width", "0%" );
    }  
    
  }
});


