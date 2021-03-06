const {
    remote: {
        getCurrentWindow
    }
} = require('electron')

const currentWindow = getCurrentWindow()

module.exports = new Vue({
    computed: require('./default').computed,

    el: '#main',
    
    components: {
        three: require('./three'),
        networking: require('./networking'),
        saving: require('./saving'),
        usermedia: require('./usermedia'),
        graph: require('./graph'),
        customization: require('./customization'),
    },

    data () {
        return {
            formActive: false,
            formText: 'Hello World!',
            bounds: currentWindow.getBounds(),
            page: 'protocol',
            currentWindow
        }
    },

    methods: {
        popup (text) {
            alert(text)
        },

        setPage (page) {
            Vue.set(this, 'page', page)
        },
    },

    mounted () {
        currentWindow.on('move', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
            this.$forceUpdate()
        })

        currentWindow.on('resize', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
        })

        window.store = this.$store
    }
})