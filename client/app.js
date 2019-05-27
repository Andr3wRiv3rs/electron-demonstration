const store = require('./store')

Vue.use({
    store,
    install (Vue, options) {
        Vue.prototype.$store = store
    }
})

require('./components/main')
require('./components/title-bar')