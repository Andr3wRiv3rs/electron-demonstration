const {
    remote: {
        getCurrentWindow
    }
} = require('electron')

const currentWindow = getCurrentWindow()

module.exports = new Vue({
    el: '#main',
    
    components: {
        three: require('./three'),
        networking: require('./networking'),
        saving: require('./saving'),
    },

    data () {
        return {
            formActive: false,
            formText: 'Hello World!',
            bounds: currentWindow.getBounds(),
        }
    },

    methods: {
        popup (text) {
            alert(text)
        }
    },

    mounted () {
        currentWindow.on('move', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
            this.$forceUpdate()
        })

        currentWindow.on('resize', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
        })
    }
})