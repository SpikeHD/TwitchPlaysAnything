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
  const m = message.toLowerCase()
  if(config.keys[m]) {
    const keys = config.keys[m].split('+')
    asyncForEach(keys, async (k, i) => {
      await robot.keyTap(k)
      debug.log(`Pressed ${k} (${i+1}/${keys.length})`)
    })
  } else if(config.keyHolds[m]) {
    const time = parseTime(config.keyHolds[m].split(':')[1])
    const keys = config.keyHolds[m].split(':')[0].split('+')

    asyncForEach(keys, async (k, i) => {
      await robot.keyToggle(k, 'down')
      debug.log(`Holding down ${k} (${i+1}/${keys.length})`)
      await waitFor(time)
      await robot.keyToggle(k, 'up')
      debug.log(`Let go of ${k} (${i+1}/${keys.length})`)
    })
  }
})

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

async function asyncForEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    await callback(arr[i], i)
  }
}

function parseTime(t) {
  var num = parseInt(t.replace(/^\D+/g, ''))
  var unit = t.split(num)[1]

  switch(unit) {
    default:
    case 's':
      return num * 1000
    case 'ms':
      return num
  }
}