/**
 * Welcome to a lazy personal project!
 * 
 * These already exist, so I'm not about to push mine over anyone else's,
 * I just want to say that I made my own, and maybe I can use it at some
 * point for myself too.
 */
const notActions = [
  'enable_num',
  'enable_random',
  'max_combo'
]
const globalconfig = require('./config.json')
const keyconf = require(`./configs/${globalconfig.use_config}.json`)
const debug = require('./debug')
const robot = require('robotjs')
const tmi = require('tmi.js')
const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: [globalconfig.twitch_channel]
})

console.log(`Using config: ${globalconfig.use_config}`)

client.connect()

client.on('message', (channel, tags, message) => {
  debug.log(`${tags.username}: ${message}`)

  // Check for a combo of multiple actions
  if(message.includes('+')) {
    // If the keyconf doesn't have a max combo, play it safe and set it to one
    if(!keyconf.max_combo) keyconf.max_combo = 1
    const commands = message.toLowerCase().split('+').slice(0, keyconf.max_combo)
    asyncForEach(commands, async c => {
      let opt = c.split(' ')[1]
      if (opt) {
        doAction(c.split(' ')[0], opt)
      } else {
        doAction(c)
      }
    })
  } else {
    let opt = message.toLowerCase().split(' ')[1]

    if(opt) {
      doAction(message.toLowerCase().split(' ')[0], opt)
    } else {
      doAction(message.toLowerCase())
    }
  }
})

function doAction(m, opt = null) {
  // Get corresponding key
  if(keyconf.keys[m] || parseInt(m)) {
    // Get each key in sequence
    const keys = parseInt(m) && keyconf.enable_num ? [parseInt(m)]:keyconf.keys[m].split('+')
    // Press keys sequencially
    asyncForEach(keys, async (k, i) => {
      const mods = k.split('-')
      await robot.keyTap(mods.splice(mods.length-1, 1), mods)
      debug.log(`Pressed ${k} (${i+1}/${keys.length})`)
    })
  } else if(keyconf.keyHolds[m]) {
    let length = keyconf.keyHolds[m].split(':')[1]
    let time

    if (opt) {
      let lim = parseTime(length.split('any')[1])
      let proposed = parseTime(opt)

      if (proposed > lim) return
      else time = proposed
    } else time = parseTime(length)

    if (!time && length.includes('any')) time = parseTime(length.replace('any', ''))/2

    // Parse time into ms
    const keys = keyconf.keyHolds[m].split(':')[0].split('+')

    // Hold down keys
    asyncForEach(keys, async (k, i) => {
      const mods = k.split('-')
      // Pause for amount of time (or no time)
      if(parseInt(time)) {
        const key = mods.splice(mods.length-1, 1)
        await robot.keyToggle(key, 'down', mods)
        debug.log(`Holding down ${k} (${i+1}/${keys.length})`)
        await waitFor(time)
        await robot.keyToggle(key, 'up', mods)
        debug.log(`Let go of ${k} (${i+1}/${keys.length})`)
      } else {
        const key = mods.splice(mods.length-1, 1)
        await robot.keyToggle(key, time === 'on' ? 'down':'up', mods)
        debug.log(`Turning ${k} ${time} (${i+1}/${keys.length})`)
      }
    })
  } else if(keyconf.mouse[m]) {
    const movements = keyconf.mouse[m].split(':')[0].split('+')

    asyncForEach(movements, async (p, i) => {
      // Get x/y offsets
      const pos = parseMouse(movements[i])
      // Current position to use for position calculation
      const curPos = robot.getMousePos()
      debug.log(`Moving mouse to ${curPos.x+pos.x}, ${curPos.y+pos.y} (${i+1}/${movements.length})`)
      await robot.moveMouseSmooth(curPos.x+pos.x, curPos.y-pos.y)
      // Allow slight buffer between movements (if there is more than one)
      await waitFor(50)
      debug.log(`Done moving mouse!`)
    })
  } else if(keyconf.click[m]) {
    const clicks = keyconf.click[m].split('+')

    asyncForEach(clicks, async (c, i) => {
      await robot.mouseClick(c)
      debug.log(`Clicked ${c} mouse button (${i+1}/${clicks.length})`)
    })
  } else if(keyconf.clickHolds[m]) {
    const time = parseTime(keyconf.clickHolds[m].split(':')[1])
    const clicks = keyconf.clickHolds[m].split(':')[0].split('+')

    asyncForEach(clicks, async (c, i) => {
      if(parseInt(time)) {
        await robot.mouseToggle('down', c)
        debug.log(`Holding down ${c} mouse button (${i+1}/${clicks.length})`)
        await waitFor(time)
        await robot.mouseToggle('up', c)
        debug.log(`Let go of ${c} mouse button (${i+1}/${clicks.length})`)
      } else {
        debug.log(`Turning ${c} mouse button ${time} (${i+1}/${clicks.length})`)
        await robot.mouseToggle(time === 'on' ? 'down':'up', c)
      }
    })
  } else if (keyconf.enable_random && m === 'random') {
    // Get only action keys using a filter
    const keys = Object.keys(keyconf).filter(k => keyconf[k] != {} && !notActions.includes(k))
    // Do some nonsense and get the values of a random key
    const values = Object.keys(keyconf[keys[rand(0, keys.length)]])
    // Finally get a random action to do
    const value = values[rand(0, values.length)]

    doAction(value)
  }
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

function rand(min, max) {
  return Math.floor(Math.random() * (max-min) + min)
}

async function asyncForEach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    await callback(arr[i], i)
  }
}

function parseTime(t) {
  const isInfinite = t === 'on' || t === 'off'

  if(!isInfinite) {
    const num = parseInt(t.match(/^[-+]?\d+/g))
    const unit = t.split(num)[1]
  
    switch(unit) {
      default:
      case 's':
        return num * 1000
      case 'ms':
        return num
    }
  } else {
    return t
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