/*
 * .d8888. d888888b .88b  d88. d8888b. db      d88888b d8888b.  .d88b.  d888888b 
 * 88'  YP   `88'   88'YbdP`88 88  `8D 88      88'     88  `8D .8P  Y8. `~~88~~' 
 * `8bo.      88    88  88  88 88oodD' 88      88ooooo 88oooY' 88    88    88    
 *   `Y8b.    88    88  88  88 88~~~   88      88~~~~~ 88~~~b. 88    88    88    
 * db   8D   .88.   88  88  88 88      88booo. 88.     88   8D `8b  d8'    88    
 * `8888Y' Y888888P YP  YP  YP 88      Y88888P Y88888P Y8888P'  `Y88P'     YP    
 *
 * SimpleBot
 * Author: Lokee
 * Description: A bot designed with the concept of an efficient, yet simple bot framework.
 * Contact: lokee@wubmag.com
 * 
 * Feel free to e-mail suggestions or questions regarding SimpleBot!
 * 
 */
// <-- Do not modify code below --> //                                                 
var Bot = require("ttapi"),
  Config = require("./config"),
  bot = new Bot(Config.BotAuth, Config.BotId, Config.BotRoom),
  adjs = {};
// <-- Do not modify code above --> //


// Triggered when the bot connects
bot.on('ready', function (data) {
  bot.modifyLaptop(Config.Laptop);
  AutoBopCheck();

  // Adds DJs currently on stage to the Active DJs array
  bot.roomInfo(false, function (info) {
    if (info.success) {
      var djs = info.room.metadata.djs;
      for (i in djs) {
        AddActiveDJ(djs[i]);
        if (Config.DebugMode) {
          console.log('[INFO] Adding ' + djs[i] + ' to active DJs array.');
        }
      }
    }
  });
});

// Triggered when someone joins the room
bot.on('registered', function (data) {
  switch (data.user[0].userid) {
    case Config.BotId:
      if (Config.DebugMode) {
        console.log('Bot Connected.');
      }
      break;

      /* The code below manages your banned user list.
			How to add a user to the banned list:
    		1. Find user's ID using the /getid command.
    		2. Insert a new case line below with the user id inside the single-quotes.
				 
				 case '0101200042':
				 case '0011223345':
				 case '1234567890':
    	*/

    case '':
      bot.bootUser(data.user[0].userid, 'You are a banned user in this room. If you have any questions please PM room owner.');
      break;
    default:
      bot.speak('Welcome, \@' + data.user[0].name + '!');
  }
});

// Triggered when someone begins DJ'ing
bot.on('add_dj', function (data) {
  if (data.success) {
    if (Config.DebugMode) {
      console.log('[INFO] User ' + data.user[0].name + ' started DJing.');
    }
  }
});

// Triggered when someone stops DJ'ing
bot.on('rem_dj', function (data) {
  if (data.success) {
    // Removes DJ from active dj array
    RemoveActiveDJ(data.user[0].userid);
    if (Config.DebugMode) {
      console.log('[INFO] User ' + data.user[0].name + ' stopped DJing.');
    }
  }
});

// Triggered when no song is playing (don't confuse it for in between songs)
bot.on('nosong', function (data) {

});

// Triggered when a new song is played
bot.on('newsong', function (data) {
  AutoBopCheck();
});

// Triggered when a song ends
bot.on('endsong', function (data) {
  // Displays the results of the song last played.

  if (data.room.metadata.current_song.metadata.album) {
    bot.speak(':loudspeaker: Last Played: \"' + data.room.metadata.current_song.metadata.song +
      '\" by ' + data.room.metadata.current_song.metadata.artist +
      ' \(Album: ' + data.room.metadata.current_song.metadata.album +
      '\), which received ' + data.room.metadata.upvotes + ' upvotes and ' + data.room.metadata.downvotes + ' downvotes.');
  } else {
    bot.speak(':loudspeaker: Last Played: \"' + data.room.metadata.current_song.metadata.song +
      '\" by ' + data.room.metadata.current_song.metadata.artist + ', which received ' + data.room.metadata.upvotes + ' upvotes and ' + data.room.metadata.downvotes + ' downvotes.');
  }
  if (adjs.hasOwnProperty(data.room.metadata.current_dj)) {
    adjs[data.room.metadata.current_dj].plays++;
    if (Config.DebugMode) {
      console.log('[INFO] ' + data.room.metadata.current_dj + ' has played ' + adjs[data.room.metadata.current_dj].plays + ' times.');
    }
    if (Config.hasLimit != false && adjs[data.room.metadata.current_dj].plays >= Config.PlayLimit) {
      bot.speak(data.room.metadata.current_song.djname + ', you played your fair share. Please step down and let others spin.');
    }
  }
});

// Triggered when someone votes
bot.on('update_votes', function (data) {

});

// Triggered when someone sends a message
bot.on('speak', function (data) {
  if (data) {

    if (Config.DebugMode) {
      console.log(data.name + ': ' + data.text);
    }

    // <-- Do not modify the code below --> //
    var result = data.text.match(/^\/(.*?)( .*)?$/);
    if (result) {
      var command = result[1].trim()
        .toLowerCase();
      var param = '';
      if (result.length == 3 && result[2]) {
        param = result[2].trim()
          .toLowerCase();
      }
      // <-- Do not modify the code above --> //

      switch (command) {
        // Version - Returns the current version
        case 'version':
          bot.speak('Current Version: ' + Config.BotVersion);
          break;

          // Dive - Allows user to quit from the room chat.
        case 'dive':
        case 'stagedive':
          bot.remDj(data.userid);
          break;

          // Songlimit - Returns the max plays allowed
        case 'songlimit':
          if (Config.hasLimit != false) {
            bot.speak('The current song limit is ' + Config.PlayLimit + ' songs.');
          } else {
            bot.speak('There is currently no song limit.');
          }
          break;

          // Myplays - Returns the number of songs the user has played 
        case 'myplays':
          if (adjs.hasOwnProperty(data.userid)) {
            bot.speak(data.name + ' has played ' + adjs[data.userid].plays + ' times.');
          } else {
            bot.speak('Silly ' + data.name + ', you aren\'t on stage!');
          }
          break;

          // Help - Displays bot commands
        case 'help':
        case 'commands':
          bot.speak('Commands: \/version, \/dive, \/stagedive, \/songlimit, \/myplays, \/help, \/commands');
          break;
      }

      /* The following commands below are for bot admin use only.
       * If you want to include another person to use admin commands,
       * replace the following line:
       * 
       * 		if (data.userid == Config.AdminId)
       * 
       * with this:
       * 
       * 		if (data.userid == Config.AdminId || data.userid == 'otherusersid')
       * 
       * and replace 'otherusersid' with the user id of the person you are
       * giving rights to. You can include more than one person, too:
       * 
       * 		if (data.userid == Config.AdminId || data.userid == 'otherusersid1' || data.userid == 'otherusersid2')
       * 
       */

      if (data.userid == Config.AdminId) {
        switch (command) {
          // Kick - Kicks a user (use the username, not the userid!)
          case 'kick':
          case 'boot':
            var username = data.text.split('\/kick ');
            bot.getUserId(username[1], function (u) {
              bot.bootUser(u.userid);
            });
            break;

            // GetID - Returns the userid of the given username
          case 'getid':
            var x = data.text.split('\/getid ');
            bot.getUserId(x[1], function (u) {
              bot.speak(x[1] + ':' + u.userid);
            });
            break;

            // Bop - Makes the bot thumbs up the current song
          case 'bop':
          case 'dance':
            bot.vote('up');
            break;

            // Autobop - Toggles the autobop mode
          case 'autobop':
            if (Config.AutoBop == true) {
              Config.AutoBop = false;
            } else {
              Config.AutoBop = true;
            }
            bot.speak('Autobop set to ' + Config.AutoBop);
            break;

            // Autosnag - Toggles the autosnag mode
          case 'autosnag':
            if (Config.AutoSnag == true) {
              Config.AutoSnag = false;
            } else {
              Config.AutoSnag = true;
            }
            bot.speak('Autosnag set to ' + Config.AutoSnag);
            break;

            // Botparty - Makes the bot hop on the stage
          case 'botparty':
            bot.addDj();
            break;

            // Downboy - Removes the bot from the stage
          case 'downboy':
            bot.remDj();
            break;

            // Skip - Skips the bots song (not a user's song!)
          case 'skip':
            bot.stopSong();
            break;

            // Snag - Adds the current song to the bottom of the bot's queue
          case 'snag':
            bot.roomInfo(true, function (data) {
              var newSong = data.room.metadata.current_song._id;
              var newSongName = songName = data.room.metadata.current_song.metadata.song;
              bot.playlistAll(function (playlist) {
                bot.playlistAdd(newSong, playlist.list.length);
              });
              bot.snag();
            });
            break;

            // Shuffle - Randomizes the bot's queue (it's good to do this once and a while)
          case 'shuffle':
          case 'reorder':
            bot.playlistAll(function (playlist) {
              console.log("Playlist length: " + playlist.list.length);
              var i = 0;
              var reorder = setInterval(function () {
                if (i <= playlist.list.length) {
                  var nextId = Math.ceil(Math.random() * playlist.list.length);
                  bot.playlistReorder(i, nextId);
                  console.log("Song " + i + " changed.");
                  i++;
                } else {
                  clearInterval(reorder);
                  console.log("Reorder Ended");
                  bot.speak("Reorder completed.");
                }
              }, 1000);
            });
            break;

        }
      }
    }
  }
});

// Core Functions (do not modify unless you know what you're doing)
function AddActiveDJ(a) {
  if (a) {
    adjs[a] = {
      lastActive: new Date(),
      plays: 0,
      removed: null
    }
  }
}

function RemoveActiveDJ(a) {
  if (adjs && a && adjs.hasOwnProperty(a)) {
    adjs[a].removed = new Date()
  }
}

function AutoBopCheck() {
  if (Config.AutoBop) {
    bot.vote("up")
  }
}

function AutoSnagCheck() {
  if (Config.AutoSnag) {
    bot.roomInfo(true, function (c) {
      var b = c.room.metadata.current_song._id;
      var a = songName = c.room.metadata.current_song.metadata.song;
      bot.playlistAll(function (d) {
        bot.playlistAdd(b, d.list.length)
      });
      bot.snag()
    })
  }
};
// End of core functions
