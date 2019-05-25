const {
    remote,
    remote: {
        getCurrentWindow
    }
} = require('electron')

const fs = require('fs')

const currentWindow = getCurrentWindow()

new Vue({
    el: '#title-bar',

    data () {
        return {
            bounds: currentWindow.getBounds(),
            remote, currentWindow
        }
    },

    mounted () {
        window.addEventListener('keydown', event => {
            switch (event.code.toLowerCase()) {
                case 'f5': 
                    currentWindow.reload()
                    break
            }
        })

        currentWindow.on('move', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
            this.$forceUpdate()
        })

        currentWindow.on('resize', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
        })
    }
})

new Vue({
    el: '#main',
    
    data () {
        return {
            formActive: false,
            formText: 'Hello World!'
        }
    },

    methods: {
        popup (text) {
            alert(text)
        }
    }
})