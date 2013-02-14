/*
 * HOW TO FIND AUTHID, USERID, AND ROOMID:
 * 
 * 	1. Go to this link (http://goo.gl/X029l) and save the green button as a bookmark.
 *  2. Login as your bot and join your room.
 * 	3. Click on the bookmark and a white box should appear with the information.
 * 	4. Copy the information into the respected variables below.
*/  

exports.AdminId 		= '';
exports.BotAuth 		= ''
exports.BotId 			= '';
exports.BotRoom 		= '';
exports.BotVersion 		= '0.9';

exports.AutoBop 		= false;
exports.AutoSnag 		= false;
exports.Laptop 			= 'mac'; 	// Options: linux, chrome, pc, mac
exports.DebugMode 		= false;	// Outputs information in console when enabled

exports.hasLimit		= false;
exports.PlayLimit		= 6;

// Feel free to modify the welcome messages!

exports.AdminWelcome 	= 'The room admin is in the house!';
exports.UserWelcome		= 'Welcome, \@' + data.user[0].name + '!';
