const globalconfig = require('./config.json')

exports.log = (m) => {
  if (globalconfig.debug) console.log('[DEBUG MESSAGE] ', m)
}