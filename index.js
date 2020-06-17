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
  // Get corresponding key
  if(config.keys[m]) {
    // Get each key in sequence
    const keys = config.keys[m].split('+')
    // Press keys sequencially
    asyncForEach(keys, async (k, i) => {
      await robot.keyTap(k)
      debug.log(`Pressed ${k} (${i+1}/${keys.length})`)
    })
  } else if(config.keyHolds[m]) {
    // Parse time into ms
    const time = parseTime(config.keyHolds[m].split(':')[1])
    const keys = config.keyHolds[m].split(':')[0].split('+')

    // Hold down keys
    asyncForEach(keys, async (k, i) => {
      await robot.keyToggle(k, 'down')
      debug.log(`Holding down ${k} (${i+1}/${keys.length})`)
      // Pause for amount of time
      await waitFor(time)
      await robot.keyToggle(k, 'up')
      debug.log(`Let go of ${k} (${i+1}/${keys.length})`)
    })
  } else if(config.mouse[m]) {
    const movements = config.mouse[m].split(':')[0].split('+')

    asyncForEach(movements, async (p, i) => {
      const pos = parseMouse(movements[i])
      const curPos = robot.getMousePos()
      debug.log(`Moving mouse to ${curPos.x+pos.x}, ${curPos.y+pos.y} (${i+1}/${movements.length})`)
      await robot.moveMouse(curPos.x+pos.x, curPos.y-pos.y)
      await waitFor(50)
      debug.log(`Done moving mouse!`)
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
  const num = parseInt(t.match(/^[-+]?\d+$/g))
  const unit = t.split(num)[1]

  switch(unit) {
    default:
    case 's':
      return num * 1000
    case 'ms':
      return num
  }
}

function parseMouse(m) {
  const x = parseInt(m.split(',')[0].match(/^[-+]?\d+/g))
  const y = parseInt(m.split(',')[1].match(/^[-+]?\d+/g))

  return {
    x:x,
    y:y
  }
}