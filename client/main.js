const fs = require('fs')

if (!fs.existsSync('./data'))
    fs.mkdirSync('./data')

require('./components/main')
require('./components/title-bar')