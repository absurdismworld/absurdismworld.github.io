Demontower Standalone is a mod aiming to strip down NITW to only the Demontower minigame, but was abandoned due to technical limitations.
The modified game was never released but the patcher should still work on the latest GOG version(steam wasn't tested) and can be found:[here](https://anonfiles.com/LbJ852S4n7/Demontower_Patcher_exe)
The patcher is just a self-extracting 7z archive that can be opened and examined if you wish to do so.



Original README:

DemonTower Standalone is a very hacky and spaghetti code version of NITW modified to contain only DemonTower (in theory). The goal is to reduce the overall size and make the DT 
easier to play.
Expect things to be broken. I'm far from a programmer. But hey, it sorta works.


Things to do: 
- More play-testing.
- Make the Title/Menu less ugly and more functional (this could be very difficult,rework in unity needed?)
- Reduce the size of the game further by : finding a way to remove only the unnecessary stuff from sharedassets files, repack only the necessary 
sound files >to .fsb >then to .bank file (impossible?, all available repackers don't support the new .fsb files)
- Current game size: 2.2gb | Goal: 500mb or less.

Things done:
- Game saves independently.
- Fixed multiple softlocks.
- Unnecessary extras tab removed.
- All levels function properly.
- Reduced game size. (Still needs more work.)


# Changelog DemonTower Standalone:

[0.1.0] - 2019-10-12
-----------------------------------
#General Info
- Clearing save game data now works, hurrah. You should still backup your saves.

#Fixes
- Clearing save game data now works properly, no longer deletes NITW saves.


[0.0.9] - 2019-10-11
-----------------------------------
#General Info
- Saving now works, hurrah.

#Fixes
- Game now independently saves and loads and should be safe for your saves. BEWARE, clearing save game data still deletes NITW saves.


[0.0.8] - 2019-10-11
-----------------------------------
#General Info
- And chapter 10

#Fixes
- Completing the game now works properly.


[0.0.7] - 2019-10-10
-----------------------------------
#General Info
- F##k chapter 9

#Bugs
- After completing the game you are redirected to a unused level, and are softlocked.

#Fixes
- Game no longer crashes or softlocks after level 3.


[0.0.6] - 2019-10-09
-----------------------------------
#General Info
- More code stuff.

#Bugs
- Levels after 3 seem to be broken and softlock.

#Fixes
- Holding ESC to save now works.


#Other
-Removed unnecessary files to reduce the file size {3gb > 2.2gb} 
-Removed Extras tab in the menu. 


[0.0.5] - 2019-10-09
-----------------------------------
#General Info
- Now with code modifications, surely this won't brake more things.

#Fixes
- Saving now works.
- Continue now works.
- Options now work.
- Extras won't softlock anymore, but trying to select any of them will.

#Bugs
-Holding ESC to save crashes the game and doesn't save.

#Other
-Removed unnecessary files to reduce the file size {4.2gb > 3.0gb} (this will break extras)


[0.0.4] - 2019-10-08
-----------------------------------
##General Info
- Bug Fixes

###Fixes
- Dashing works consistently.


[0.0.3] - 2019-10-08
-----------------------------------
#General Info
- With more tinkering things should work better.

#Fixes
- Extras menu no longer softlocks the game.

#Other
-Removed unnecessary files to reduce the file size {5.5gb > 4.2gb}


[0.0.2] - 2019-10-07
-----------------------------------
#General Info
- Bug Fixes

#Fixes
- Attacks no longer softlock.


[0.0.1] - 2019-10-06
-----------------------------------
#General Info
- omgitworks.wav
- Basic level swapping used.
- Needs size reduction
- Disable/Fix Saving

#Bugs
- MANY
- Options and Extras menu softlocks the game.
- Saving does not work.
- Trying to continue after quiting crashes or loads at the laptop, then crashes.
