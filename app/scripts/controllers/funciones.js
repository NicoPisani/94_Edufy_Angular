$(function(){
    $('#old_pass').mouseover(function(){
		$('#label_old_pass').css("color","#5e6ebf"); 
    });
     $('#old_pass').mousedown(function(){
		$('#label_old_pass').css("color","#5e6ebf"); 
    });
     $('#old_pass').mouseout(function(){
		$('#label_old_pass').css("color","#5e6ebf"); 
    });

     $('#new_pass').mouseover(function(){
		$('#label_new_pass').css("color","#5e6ebf"); 
    });
     $('#new_pass').mousedown(function(){
		$('#label_new_pass').css("color","#5e6ebf"); 
    });
     $('#new_pass').mouseout(function(){
		$('#label_new_pass').css("color","#5e6ebf"); 
    });

     $('#re_pass').mouseover(function(){
		$('#label_re_pass').css("color","#5e6ebf"); 
    });
     $('#re_pass').mousedown(function(){
		$('#label_re_pass').css("color","#5e6ebf"); 
    });
     $('#re_pass').mouseout(function(){
		$('#label_re_pass').css("color","#5e6ebf"); 
    });
});

function mostrar_sub_sidebar(id){
    var esVisible = $('#'+id).is(":visible");
    if(esVisible==true){
        $('#'+id).fadeOut(10);
        $('#cpanel-user-icon-fa-angle').addClass("fa-angle-down");
        $('#cpanel-user-icon-fa-angle').removeClass("fa-angle-up");
    }else{
        $('#'+id).fadeIn(1000);
        $('#cpanel-user-icon-fa-angle').addClass("fa-angle-up");
        $('#cpanel-user-icon-fa-angle').removeClass("fa-angle-down");
    }
}//------------------ sidebar-------------------------