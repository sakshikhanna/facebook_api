 window.fbAsyncInit = function() {
        FB.init({
          status:true,
          appId      : '937438292989955',
          xfbml      : true,
          version    : 'v2.2'
        });
        console.log('Logged in.111');
        
      };
     
      (function(d, s, id){

         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "http://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

function getLoginStatus(){
  
  	FB.getLoginStatus(function(response){
  	    console.log(response.authResponse.userID);
  	    var userID = response.authResponse.userID;
  	    if (response.status === 'connected') 
  	    {
  	    	console.log('Logged in.');
  	     // alert('111');
  	    	//profilePic(userID);
          friendsList(userID);      
  	    }
  	    else 
  	    {
  	      	console.log('not Logged in.');
  	      	FB.login();
  	    }
  	});
}

function profilePic(userID){
	FB.api(
	    "/"+userID+"/picture",
	    function (response) {
	      console.log(response);
	      if (response && !response.error) {
	        /* handle the result */
	        var img = $('#dynamic'); //Equivalent: $(document.createElement('img'))
			img.attr('src', response.data.url);
	      }
	    }
	);
}

function friendsList(userID){
  FB.api(
    "/10201918262913122/friends",
    function (response) {
      console.log(response);
      if (response && !response.error) {
        
      }
    }
  );
}


$(document).ready(function(){
	$("#fetch").click(function(){
    console.log("inside click function");
		getLoginStatus();

	})
})