function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;
}


$(document).ready(function(){

	$.get("/userInfo",function(data){
		if (data.username)
			$("#session").html("Session " + data.username);
    else {
      alert("here")
    }
	});

	$("#logout").click(logoutClicked);

});
