const config = require('./config.json')

exports.log = (m) => {
  if (config.debug) console.log('[DEBUG MESSAGE] ', m)
}