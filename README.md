# TwitchPlaysAnything
A twitch-plays style program with extended functionality allowing for usage in almost anything

# Setup
1. Install [node.js](https://nodejs.org/en/)
2. Download this as a zip file and extract it wherever
3. Run the "install.bat" file
3. That's it!

# Usage
To start up the program, just run "start.bat". If you make any configuration changes, you have to restart the program.

# Configuration
All of the configuration is located in "config.json", this will be the only thing you need to modify.

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

### keyHolds
Works the exact same as `keys`, except you can apply a time for the key to be held.

Examples:
```js
"forward":"up:2s"
// Will hold the up arrow for two seconds when someone sends "forward"
```
```js
"alldirections":"w+a+s+d:50ms"
// Will press each key for 50ms when someone sends "alldirections"
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

### debug
Having trouble with something? Enabling this will show each chat message, and what key is being pressed

# Feature Requests
Want to see something added? Put it in the issues section!
