===============================================================================

.d8888. d888888b .88b  d88. d8888b. db      d88888b d8888b.  .d88b.  d888888b 
88'  YP   `88'   88'YbdP`88 88  `8D 88      88'     88  `8D .8P  Y8. `~~88~~' 
`8bo.      88    88  88  88 88oodD' 88      88ooooo 88oooY' 88    88    88    
  `Y8b.    88    88  88  88 88~~~   88      88~~~~~ 88~~~b. 88    88    88    
db   8D   .88.   88  88  88 88      88booo. 88.     88   8D `8b  d8'    88    
`8888Y' Y888888P YP  YP  YP 88      Y88888P Y88888P Y8888P'  `Y88P'     YP    

===============================================================================

I. Get Started
	a. Installing Nodejs & TTAPI
	b. Bot Configuration
	c. Running the Bot
II. FAQ
	a.
	b.
	c.
	d.
	e.
	f.
III. Notes
IV. Contact

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I. Get Started

	a. Installing Nodejs & TTAPI
	
		1. Go to http://nodejs.org/download/ and install the Nodejs platform on the computer
		you plan on running the bot on.
		2. If you are on a PC, open up command prompt. If you are on a Unix
		machine, open up your terminal. Run the following command:
		
			npm install ttapi
			
	b. Bot Configuration
		
		1. Create a new account on TT.fm for your bot.
		1. Go to this link (http://goo.gl/X029l) and save the green button as a bookmark.
		2. Log into TT as your bot account and join your room.
		3. Click on the bookmark and a white box should appear with the information.
		4. Copy the information into the respected variables in config.js.

	c. Running the Bot
	
		1. Again, open up your command prompt/terminal and change the directory to
		the simplebot directory.
		2. Execute the bot script using the following command:
		
			node bot.js
			
		3. Easy as that!
		
II. FAQ



III. Notes

	- I prefer using node-dev, a module you can download from the nodejs
	repository. But a quicker way to do that is through your terminal:
	
		npm install -g node-dev
		
	Why use node-dev? It will restart the script if you have modified the
	source code at all. It's convienent, to say the least. And it's not 
	only the bot.js it will watch for; if you edit config.js or any other
	associated file, it will restart the bot for you.
