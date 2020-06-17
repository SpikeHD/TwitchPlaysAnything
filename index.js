/**
 * Welcome to a lazy personal project!
 * 
 * These already exist, so I'm not about to push mine over anyone else's,
 * I just want to say that I made my own, and maybe I can use it at some
 * point for myself too.
 */
const config = require('./config.json')
const debug = require('./debug')
const robot = require('robotjs')
const tmi = require('tmi.js')
const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: [config.twitch_channel]
})

client.connect()

client.on('message', (channel, tags, message) => {
  debug.log(`${tags.username}: ${message}`)
  if(config.keys[message.toLowerCase()]) {
    const m = message.toLowerCase()
    const keys = config.keys[m].split('+')
    asyncForEach(keys, async (k, i) => {
      await robot.keyTap(k)
      debug.log(`Pressed ${k} (${i+1}/${keys.length})`)
    })
  }
})

async function asyncForEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    await callback(arr[i], i)
  }
}