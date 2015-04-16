

 window.fbAsyncInit = function() {
        FB.init({
          status:true,
          appId      : '937438292989955',
          xfbml      : true,
          version    : 'v2.0'
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
  	  //  console.log(response);
  	    var userID = response.authResponse.userID;
        var access_token = response.authResponse.accessToken;
  	    if (response.status === 'connected') 
  	    {
  	    	//console.log('Logged in.');
  	     // alert('111');
  	    //	profilePic(userID);
          //grantPermission();
          //friendsList();
         albumList(userID,access_token);   
       //  console.log("sakshi");   
  	    }
  	    else 
  	    {
  	      	console.log('not Logged in.');
  	      	FB.login();
  	    }
  	});
}
function overlay(obj){
  console.log("inside oberlay"+obj);
  $(".ablumPhotos").fadeTo(1000, 0.4);
     $("#page3").removeClass("selected");
  FB.api(
    "/"+obj,
    
    function (response) {
      console.log(response);
      if (response && !response.error) {
        /* handle the result */
        var link1 = response.images[0].source;
        link1 = decodeURIComponent(link1);
        var img = $('<img  class = "albumPics1">'); //Equivalent: $(document.createElement('img'))
        img.attr('src', link1);
        img.appendTo('.ablumPhotos1');
        $(".ablumPhotos1").show();
      }
    }
);
   //
}


function albumList(userID,accessToken){
  var listOfAlbums = "";
  FB.api(
    "/"+userID+"/albums",
    function (response) {
     // console.log(response);

      $('.albums .albumsList li').remove();
      if (response && !response.error) {
       // console.log(response.data.length);
        for(i=0;i<response.data.length;i++){
                   // $("<li>").text('new iem').appendTo(".albums .albumsList");
          albumCoverPic(response.data[i]);
         //console.log("here ");
         // $('.albums .albumsList').append('<li><h3 class="name">'+response.data[i].name+'</h3></li>')
        }
        // console.log(listOfAlbums);
        $("<a href = '#' id = 'Home' onclick= 'displayPage0();'><p>HOME</p></a>").appendTo(".albums");

      }
    }
  );
 
}
function displayPage0 (argument) {
  $("#page0").removeClass("selected");
  $("#page1").addClass("selected");
}
function linkToOtherPage (albumID) {
  // body...
  console.log("linkToOtherPage");
  $("#page2").removeClass("selected");
  $("#page1").addClass("selected");

  FB.api(
      "/"+albumID+"/photos",
      function (response) {
        console.log(response);
        if (response && !response.error) {
          $('.ablumPhotos').empty()
          /* handle the result */
         // console.log(response.data[0].images.length);
          for(i=0;i<response.data.length;i++){
            var linkPic = response.data[i].images[0].source;
            linkPic = decodeURIComponent(linkPic);
           // console.log(linkPic);
            var img = $('<img id="'+response.data[i].id+' class = "albumPics" onclick = "overlay('+response.data[i].id+')">'); //Equivalent: $(document.createElement('img'))
            img.attr('src', linkPic);
            img.appendTo('.ablumPhotos');

           // $("<img src = '"+linkPic+"'' id ="+response.data[i].id+" ").appendTo("ablumPhotos");
          }
         // console.log(response.paging.next);
         // var nextLink = response.paging.next;
         // console.log(nextLink);
         //  nextLink = encodeURIComponent(nextLink);
         //  console.log(nextLink);
         //  $('<a href = "#" id = "Next" onclick = "next('+nextLink+');">Next</a>').appendTo('.ablumPhotos');
        }
      }
  );

}

function next(nextLink){
  
}

function albumCoverPic(userID){
  //console.log("inside albumCoverPic :::::: "+userID);
  FB.api(
      "/"+userID.cover_photo,
      function (response) {
        console.log(response);
        if (response && !response.error) {
          var link = response.images[0].source;
          
          link = decodeURIComponent(link);
          
          
         // link = link.replace(/\&/g,"&amp")
         // console.log(link);
         $( "<a href = '#' class = 'page2Link' onclick = linkToOtherPage("+userID.id+"); ><li class = 'albumsList' id = "+userID.id+"  style = background-image:url('"+link+"')>"+userID.name+"</li><a>" ).appendTo( ".albums" );

          
        }
      }
  );
}

function homePage3P(){
  $("#page0").removeClass("selected");
  $("#page2").addClass("selected");
}
function albumsPage3P(){
  $("#page1").removeClass("selected");
  $("#page2").addClass("selected");
}







//not working : 
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
function grantPermission(){
  FB.login(function(response) {
     console.log(response);
   }, {scope: 'user_photos'});
  FB.api(
      "/me/permissions",
      function (response) {
        //console.log(response);
        if (response && !response.error) {
          /* handle the result */
        
        }
      }
  );
}
function friendsList(userID){

  FB.api(
    "/"+userID+"/friends",
    function (response) {
      console.log(response);
      if (response && !response.error) {
        
      }
    }
  );
}

function fetch(){
   $("#page1").removeClass("selected"); 
   // $( "#page1" ).remove( "li" );
   $('.albums').empty()
}

$(document).ready(function(){
  console.log("1111111111");
	$("#fetch").click(function(){
   // console.log("inside click function");
    $("#page0").addClass("selected");
		getLoginStatus();

	});
  $("#close").click(function(){
   console.log("inside close function");
   $("#page3").addClass("selected");
   $(".ablumPhotos").fadeTo(1000, 1);
   $('.ablumPhotos1').empty()
  // $(".ablumPhotos").fadeIn(1000);
     
   // $("#page0").addClass("selected");
    //getLoginStatus();

  });
  //console.log("222222");
  
  

})

