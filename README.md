# TwitchPlaysAnything
A twitch-plays style program with extended functionality allowing for usage in almost anything

# Setup
1. Install [node.js](https://nodejs.org/en/)
2. Download this as a zip file and extract it wherever
3. Run the "install.bat" file
3. That's it!

# Usage
To start up the program, just run "start.bat". If you make any configuration changes, you have to restart the program.

## Warning!
There is no "kill switch"! Due to technical limitations, this program does not watch for keyboard input, which makes it pretty hard to implement a kill bind or something. I'm sure you can set AHK or something similar to kill it if you are worried. You shouldn't be worried as long as you don't give the twitch chat unnecessary power (alt-tab, alt-f4, etc.). The most that could happen is you may have to fight the mouse a little bit if you have it set to be used and the chat is trying to move it.

# Configuration
All of the base configuration is located in "config.json". In the `configs` folder you will find some basic key configuration files you can use (or edit using the reference below) by changing the `use_config` field to the name of the config file.

Feel free to create your own key configurations! If you made one that you think could be useful, feel free to make a pull request with it.

### channel
Set this as the name of the Twitch channel to watch the chat of.

### keys
You can probably tell by the examples, but these are formatted in `key:value` pairs.
The `key` will be the word that will trigger the key, and the `value` will be what key is pressed.
You can also string multiple keys together with `+`, to press them in rapidly and in order.

Examples:
```js
"attack":"a"
// Will press "a" when someone sends "attack"
```
```js
"doublejump":"space+space"
// Will press "space" twice when someone sends "doublejump"
```
```js
"tabout":"alt-tab"
// Will alt-tab when someone sends "tabout"
```

### keyHolds
Works the exact same as `keys`, except you can apply a time for the key to be held (or for it to be toggled on/off).

Examples:
```js
"forward":"up:2s"
// Will hold the up arrow for two seconds when someone sends "forward"
```
```js
"alldirections":"w+a+s+d:50ms"
// Will press each key for 50ms when someone sends "alldirections"
```
```js
"enableforward":"w:on"
// Holds w when someone sends "enableforward"
```
```js
"disableforward":"w:off"
// Lets go of w when someone sends "disableforward"
```
```js
"pasteabunch":"ctrl-v:5s"
// Will paste for 5 seconds when someone sends "pasteabunch"
```
### mouse
Allows for the movement of the mouse. Uses x/y coordinate *offsets*, which means you aren't inputting a position, but where it should move from it's current position. You can also string movements together with `+`

Examples:
```js
"aimup":"0px,200px"
// Moves the mouse 200px up from it's current position when someone sends "aimup"
```
```js
"leftright":"-100px,0px+100px,0px"
// Moves the mouse left 100px then right 100px when someone sends "leftright"
```

### click
Clicks the mouse buttons (either left or right). Can be strung together with `+` as well

Examples:
```js
"shoot":"left"
// Clicks the left mouse button once when someone sends "shoot"
```
```js
"double":"left+left"
// Double clicks when someone sends "double"
```
### clickHolds
Basically the exact same as key holds. Allows for holding down a mouse button for an amount of time (or a toggle)

Examples:
```js
"magdump":"left:5s"
// Will hold down left mouse button for 5 seconds when someone sends "magdump"
```
```js
"enablelmb":"left:on"
// Toggles left mouse button when someone sends "enablelmb"
```
```js
"disablelmb":"left:off"
// Disables left mouse button when someone sends "disablelmb"
```
### debug
Having trouble with something? Enabling this will show each chat message, and what key is being pressed

# Feature Requests
Want to see something added? Put it in the issues section!

# TODO
1. Even more features
2. Electron UI maybe?
