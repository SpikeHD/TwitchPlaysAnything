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
### debug
Having trouble with something? Enabling this will show each chat message, and what key is being pressed

# Feature Requests
Want to see something added? Put it in the issues section!
