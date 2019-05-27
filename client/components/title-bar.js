const {
    remote: {
        getCurrentWindow
    }
} = require('electron')

const currentWindow = getCurrentWindow()

module.exports = new Vue({
    computed: require('./default').computed,
    
    el: '#title-bar',

    data () {
        return {
            currentWindow
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
    }
})