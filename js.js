$(document).ready(function() {
  twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

  for (i=0;i<twitchUsers.length;i++) {
    $('#usersList').append("<div class='row userRow' id='row" + twitchUsers[i] + "'><div class='col-xs-4' id='imgField'><img id='img" + twitchUsers[i] + "' height=300px width=300px src='https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Combologo_474x356.png'></img></div><div class='col-xs-8' id='userInfo'><div class='usernameField'><p class='dataField' id='user" + twitchUsers[i] + "'>" + "User: " + twitchUsers[i] + "</p></div><div class='statusField'><p class='dataField' id='status" + twitchUsers[i] + "'>Loading Status...</p></div></div></div>");
  };

function checkTwitch() {
  for (i=0;i<twitchUsers.length;i++) {
      $.getJSON('https://wind-bow.hyperdev.space/twitch-api/users/' + twitchUsers[i] + '?callback=?', function(data) {
        if (data.error === "Unprocessable Entity" ) {
          var status = data.message.split('"');
          console.log(status);
          $('#status' + status[1]).empty();
          $('#status' + status[1]).append("Username is not valid");
        }
        else {
          console.log(data);
          $('#img' + data.display_name).attr("src", data.logo);

        };
      });
  };

  for (i=0;i<twitchUsers.length;i++) {
      $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/' + twitchUsers[i] + '?callback=?', function(data) {
          if (data.stream === null) {
            // console.log(data);
            var username = data._links.self.split("/");
            var username_index = username.length-1;
            // console.log(username[username_index]);

            $('#status' + username[username_index]).empty();
            $('#status' + username[username_index]).append("User is not streaming");
          }
          else if (data.stream.channel.views > 1) {
            // console.log(data.stream.channel);
            $('#status' + data.stream.channel.display_name).empty();
            $('#img' + data.stream.channel.display_name).addClass("active");
            $('#status' + data.stream.channel.display_name).append("<a href='" + data.stream.channel.url + "' target='_blank'>" + data.stream.channel.status + "</a>");
          }
          });
  };

};
checkTwitch();

$('#refresh').click(function() {

  checkTwitch();

});

}); 
